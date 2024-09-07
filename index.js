//CS55.13 week 2 - Nick Fitzpatrick

// Load the core node http module
const http = require("http");

// use promieses instead of callbacks
const fs = require("fs").promises;

const requestListener = function(request, response) {
    console.log(request.url);
    
    if (request.url === "/") {
        fs.readFile( __dirname + "/page.html")
            .then(
                contents => {
                    response.setHeader("Content-Type", "text/html");
                    response.writeHead(200);
                    response.end(contents);
                }
            )
    } else {
        fs.readFile( __dirname + "/data.json")
            .then(contents => {
                response.setHeader("Content-Type", "application/json; charset=UTF-8");
                response.writeHead(200);
                response.end(contents);
            });
    }
};

const server = http.createServer(requestListener);

// define TCP port and IP address
const host = "127.0.0.1"; // localhost
const port = "3000"; // typical for node.js

server.listen(
    port,
    host,
    () => {
        console.log('Server is running');
    }
)