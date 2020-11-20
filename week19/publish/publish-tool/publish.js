const http = require("http");
const fs = require('fs');
const archiver = require('archiver');

let packname = "./package";
const options = {
  host: "localhost",
  port: 8081,
  path: "/?filename=package.zip",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
  }
};
// request
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
 
archive.directory(packname, false);
archive.finalize()
archive.pipe(req)
archive.on('end', () =>{
  req.end()
})




/*fs.stat(filename, (error, stat) =>{
  const options = {
    host: "localhost",
    port: 8081,
    path: "/?filename=package.zip",
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": stat.size
    }
  };
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  let readStream = fs.createReadStream("./" + filename)
  readStream.pipe(req);
  readStream.on('end', () =>{
    req.end()
  })
})
*/