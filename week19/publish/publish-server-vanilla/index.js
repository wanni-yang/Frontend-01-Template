
const http = require('http')
const unzip = require('unzipper')

//Create an HTTP server
const server = http.createServer((req, res) => {
  let writeStream = unzip.Extract({ path: '/server/public' })
  console.log(writeStream)
  req.pipe(writeStream)

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('okay')
  })
})

server.listen(8081)