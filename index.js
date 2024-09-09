//CS55.13 week 2 - Nick Fitzpatrick

// Load the core node http module
const http = require("http");

// use promieses instead of callbacks
const myFileSystem = require("fs").promises;

const requestListener = function(request, response) {
    console.log(request.url);
    
    if (request.url === "/") {
        myFileSystem.readFile( __dirname + "/homepage.html")
            .then(
                contents => {
                    response.setHeader("Content-Type", "text/html");
                    response.writeHead(200);
                    response.end(contents);
                }
            )
    } else {
        myFileSystem.readFile( __dirname + "/data.json")
            .then(contents => {
                response.setHeader("Content-Type", "application/json; charset=UTF-8");
                response.writeHead(200);
                response.end(contents);
            });
    }
};

const myFirstServer = http.createServer(requestListener);

// define TCP port and IP address
const host = "127.0.0.1"; // localhost
const port = "3000"; // typical for node.js

myFirstServer.listen(
    port,
    host,
    () => {
        console.log('Hooray, the server is running!');
    }
)