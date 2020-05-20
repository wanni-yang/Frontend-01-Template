
/* <script src="https://cdn.bootcss.com/FileSaver.js/1.3.8/FileSaver.js"></script> */
const http = require("http")

const server = http.createServer((req, res) => {
    console.log("request recieved");
    console.log("header: ",req.headers);
    // var content = JSON.stringify(req);
    // var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    // saveAs(blob, "save.json");

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'server');//自定义header
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  });
server.listen('8088')