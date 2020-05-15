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
        this.headers = options.headers || {};
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
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }

    //client.write(request.toString());
    send(connection){
        return new Promise((resolve, reject) => {
            if(connection){
                connection.write(this.toString());
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                },() =>{
                    connection.write(this.toString());
                });
            }
            connection.on('data',(data) => {
                resolve(data.toString());
                connection.end();
            });
            connection.on('error',(err) => {
                reject(err);
                connection.end();
            });
        });
    }

}

void async function(){
    let request = new Request({
        method:"POST",
        host:"127.0.0.1",
        port:"8088",
        path:"/",
        body:{
            name:'mie'
        },
        headers:{
            ["X-foo2"]:"client"
        }
    });
    let response = await request.send();
    console.log(response);
}();