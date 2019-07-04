// initializing event emitter
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
 
 
// Simplest example of event emitter
// listen for dummyEvent and console the data when dummyEvent is emitted.
ee.on("dummyEvent", function (data) {
    console.log(data);
});
console.log("This will be printed before the dummyEvent");
ee.emit("dummyEvent", "Hey this is a dummy event.");
