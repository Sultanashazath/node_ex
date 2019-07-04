var http = require("http");
var fs = require("fs");
// initializing event emitter
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
 
// A litter more complex example of using event emitter
// create server and listen on port 3000
var server = http.createServer();
server.listen(3000);
console.log("Server on localhost:3000");
 
// the http has inherited the functions from EventEmitter
// listen on for the request event, when the request happens
// read a file and emit the error for errors and emit data if the read was successful.
// The error event will pass the response object and the err object
// The data event will pass the response object and the data object
server.on("request", function (req, res) {
    fs.readFile("./event_emitter.js", "utf-8", function (err, data) {
        if (err) {
            ee.emit("error", res, err);
        }
        else {
            ee.emit("data", res, data);
        }
    });
});
 
// listen on the error event, respond with the error when error happens
ee.on("error", function (res, err) {
    res.end(JSON.stringify(err));
});
 
// listen on the data event, respond with the data when the file was read successfully
ee.on("data", function (res, data) { 
    res.end(data); 
});