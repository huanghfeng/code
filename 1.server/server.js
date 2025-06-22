import http from 'node:http';
import fs from 'node:fs';
const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "text/plain"});
    const html = fs.readFileSync("index.html", "utf-8");
    res.end("HELLO WORLD");
})

server.listen(3000, () => {
    console.log("server is running at localhost: 3000");
})