//http client
const net = require('net')

//net.socket
class Request {
    //method,url = host + port + path
    //body: k/v
    //headers
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        if (this.headers["Content-Type"] === "application/json")
            this.bodyText = JSON.stringify(this.body);
        else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded")
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        this.headers["Content-Length"] = this.bodyText.length;
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r\nHOST: ${this.host}\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}\r\n`
    }
    // open(method, url){

    // }

    //client.write(request.toString());
    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParse;
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data) => {
                /*
                 on事件的触发条件：1.客户端网卡接数据buffer满了、2.服务端收到了IP包，不一定分成多少个包只保证顺序不管分包状态
                 客户端同时又有buffer存在，这些buffer有可能比包大，有可能比包小，data是一个流，需要一部分一部分灌给ResponseParse，ResponseParse
                 收集满了request，吐出来一个Response
                 TCP连接数据是流式数据，这一步不能确定收到的data是不是完整的response，所以一定不可能new一个response
                 分几个包发过来，到data不好说，on这个事件到底触发多少次不是一个固定值，所以会设计一个ResponseParse会负责产生Response
                 new Response(data);
                */
                parser.recieve(data.toString());
                // console.log(parser.statusLine);
                // resolve(data.toString());
                if(parser.isFinished){
                   resolve(parser.response);
                }
                connection.end();
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });
        });
    }

}
// class Response{

// }

/*
    产生Response,根据Transfer-Encoding判断如何解析body。用状态机处理
    状态：
    0.status_line
    1./r/n
    headers
        2.header_name
        3.header_space
        4.header_value
        5.header_line_end  /r/n

    6.等待空行 header_block_end
    7.body

*/
class ResponseParse {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HRADER_SPACE = 3;
        this.WAITING_HRADER_VALUE = 4;
        // \r
        this.WAITING_HEADER_LINE_END = 5;
        // \n
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;
        // 第一个状态
        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        // 初始化bodyparser在header处理完后创建
        this.bodyParser = null;
    }
    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return{
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
    // 字符流处理
    recieve(string) {
        for (let i = 0; i < string.length; i++) {
            this.recieveChar(string.charAt(i));
        }
    }
    recieveChar(char) {
        // 每个char进来如果不是\r\n就会追加到当前的状态上，遇到\r\n状态就会变化
        if (this.current === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END;
            } else if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            } else {
                this.statusLine += char;
            }

        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === "\n") {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ":") {
                this.current = this.WAITING_HRADER_SPACE;
            } else if (char === "\r") {
                // header的第一个字符时\r切到\n状态
                this.current = this.WAITING_HEADER_BLOCK_END;
                // 在此创建bodyparse这时才知道body里面用的是什么Encoding,写死为chunked
                if (this.headers["Transfer-Encoding"] === 'chunked') {
                    this.bodyParser = new TrunkedBodyParser();
                }
            } else {
                this.headerName += char;
            }
        } else if (this.current === this.WAITING_HRADER_SPACE) {
            if (char === " ") {
                this.current = this.WAITING_HRADER_VALUE;
            }
        } else if (this.current === this.WAITING_HRADER_VALUE) {
            if (char === "\r") {
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                // value结束的时候清空headers的name和value
                this.headerName = '';
                this.headerValue = '';
            } else {
                this.headerValue += char;
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === "\n") {
                // 开始循环
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === "\n") {
                this.current = this.WAITING_BODY;
            }
        } else if (this.current === this.WAITING_BODY) {
            // 转发给bodyparser,以0结束
            this.bodyParser.recieveChar(char);
        }



    }
}

class TrunkedBodyParser {
    constructor() {
        // 十进制length
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        // 知道trunk的大小，所以要有一个计数器
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;

        this.length = 0;
        //字符串做加法运算性能差 ，用数组处理
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;

    }
    recieveChar(char) {
        // console.log(JSON.stringify(char))
        
        if (this.current === this.WAITING_LENGTH) {
            // console.log(char);
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 16;//16进制
                this.length += parseInt(char, 16); //Number(char);

            }
        }else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        }else if (this.current === this.READING_TRUNK) {
            this.content.push(char);
            this.length--;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        }else if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        }else if(this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}


void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        body: {
            name: 'mie'
        },
        headers: {
            ["X-foo2"]: "client"
        }
    });
    let response = await request.send();
    console.log(response);
}();