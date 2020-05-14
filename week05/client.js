//http client
const net = require('net')

//net.socket
class Request{
    //method,url = host + port + path
    //body: k/v
    //headers
    constructor(options){
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/" ;
        this.body = options.body ||{};
        this.headers = options.header || {};
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        if(this.headers["Content-Type"] === "application/json")
            this.bodyText = JSON.stringify(this.body);
        else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded")
            this.bodyText = Object.keys(this.body).map(key =>`${key}=${encodeURIComponent(this.body[key])}`).join('&');
        this.headers["Content-Length"] = this.bodyText.length;
    }
    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: $(this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }
    // open(method, url){

    // }
    // send(connect){
    //     return new Promise((resolve, reject) => {
    //         if(connetion){
    //             connection.write(this.toString());
    //         }else{
    //             connection = net.createConnection({
    //                 host: this.host,
    //                 port: this.port
    //             },() =>{
    //                 connection.write(this.toString())
    //             })
    //         }
    //         client.on('data',(data) => {
    //             console.log(data.toString());
    //             connetion.end();
    //         });
    //         client.on('error',(err) => {
                
    //             reject(err);
    //             connetion.end();
    //         });
    //     }

    //     )}

}
// class Response{

// }

// class ResponseParse{
//     constructor(){
//         this.WAITING_STATUS_LINE = 0;
//         this.WAITING_STATUS_LINE_END = 1;
//         this.WAITING_HEADER_NAME = 2;
//         this.WAITING_HRADER_SPACE = 3;
//         this.WAITING_HRADER_VALUE = 4;
//         this.WAITING_HEADER_LINE_END = 5;
//         this.WAITING_HEADER_BLOCK_END = 6;
//         this.WAITING_BODY = 7;
        
//         this.current = this.WAITING_STATUS_LINE;
//         this.statusLine = "";
//         this.headers = {};
//         this.headerName = "";
//         this.headerValue = "";
//         this.bodyparse = "";
//     }
//     recieve(string){
//         // for(var ){

//         // }
//     }
//     recieveChar(string){
//         if(this.current === this.WAITING_STATUS_LINE){
//             if(char === '\r'){
//                 this.current = this.WAITING_STATUS_LINE_END;
//             }
//         }else if(his.current === this.WAITING_STATUS_LINE_END){
//             if(char === "\n"){
//                 this.current = this.WAITING_HEADER_NAME;
//             }
//         }else if(his.current === this.WAITING_HEADER_NAME){
//             if(char === ":"){
//                 this.current = this.WAITING_HRADER_SPACE;
//             }else if(char === "\r"){
//                 this.current = this.WAITING_BODY;
//                 if(this.headers["Transfer"]){
//                     this.bodyparse = new TrunkedBodyParse();
//                 }
//             }else{
//                 this.headerName += char;
//             }
//         }else if(his.current === this.WAITING_HRADER_SPACE){
//             if(char === " "){
//                 this.current = this.WAITING_HRADER_VALUE;
//             }
//         }else if(his.current === this.WAITING_HRADER_VALUE){
//             if(char === "\r"){
//                 this.current = this.WAITING_HEADER_LINE_END;
//                 // this.
//             }
//         }else if(his.current === this.WAITING_HEADER_LINE_END){
//             if(char === "\r"){
//                 this.current = this.WAITING_HEADER_NAME;
//                 // this.
//             }
//         }else if(his.current === this.WAITING_HEADER_BLOCK_END){
//             if(char === "\r"){
//                 this.current = this.WAITING_HEADER_NAME;
//                 // this.
//             }
//         }else if(his.current === this.WAITING_BODY){
//             this.bodyparse = this.recieveChar(char);
//         }
            
        
//         }
//     }

// class TrunkedBodyParse{
//     constructor(){
//         this.WAITING_LENGTH = 0;
//         this.WAITING_LENGTH_LINE_END = 1;
//         this.READING_TRUNK = 2;
//         this.length = 0;
//         //字符串做加法运算性能差 
//         this.content = [];
        
//         this.current = this.WAITING_LENGTH;

//     }
//     recieve(string){
//         if(this.current === this.WAITING_LENGTH){
//             if(char === '\r'){
//                 this.current = this.WAITING_STATUS_LINE_END;
//             }else{
//                 this.length = 10;
//                 this.length += char.charCodeAt() - '0'.charCodeAt(0);

//             }
//             if(this.current === this.WAITING_STATUS_LINE_END){
//                 if(char === '\n'){
//                     this.current = this.READING_TRUNK;
//                 }
//             }
//             if(this.current === this.READING_TRUNK){
                
//             }
//         }
//     }
// }

// void async function(){
//     let request = new Request();
//     request
// }



//直接连接
net.connect({
    address:"localhost",
    port: 8088,
    onread: {
        // Reuses a 4KiB Buffer for every read from the socket.
        buffer: Buffer.alloc(4 * 1024),
        callback: function(nread, buf) {
        // Received data is available in `buf` from 0 to `nread`.
        console.log(buf.toString('utf8', 0, nread));
        }
    }
});
const client = net.createConnection({
    host: "127.0.0.1",
    port:8088
    },() =>{
        console.log("connected to server!");
        let request = new Request({
            method:"POST",
            host:"127.0.0.1",
            port:"8088",
            path:"/",
            body:{
                name:'mie'
            },
            headers:{
                ["X-foo2"]:"bar"
            }
        })
        console.log(request.toString())
//         client.write(`
// POST / HTTP/1.1\r
// Content-Type:application/x-www-form-urlencoded\r
// Content-Length:11\r
// \r
// name=winter`);
 });
client.on('data',(data) => {
    console.log(data.toString());
    client.end();
})
client.on('end',() => {
    console.log("disconnected server");
})
client.on('error',(err) => {
    console.log(err);
    client.end();
})