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
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }

}
//直接连接
net.connect({
    address: "localhost",
    port: 8088,
    onread: {
        // Reuses a 4KiB Buffer for every read from the socket.
        buffer: Buffer.alloc(4 * 1024),
        callback: function (nread, buf) {
            // Received data is available in `buf` from 0 to `nread`.
            console.log(buf.toString('utf8', 0, nread));
        }
    }
});
const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088
}, () => {
    console.log("connected to server!");
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
    console.log(request.toString());
    //send
    client.write(request.toString());
    client.on('data', (data) => {
        console.log(data.toString());
        client.end();
    })
    client.on('end', () => {
        console.log("disconnected server");
    })
    client.on('error', (err) => {
        console.log(err);
        client.end();
    });
});