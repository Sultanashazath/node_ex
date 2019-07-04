const EventEmitter1 = require('events').EventEmitter;
const EventEmitter=new EventEmitter1()
const Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider('https:rinkeby.infura.io/v3/0a18690429ba470fa684b4eefd0d96b2'));
    ///'https://api.nodesmith.io/v1/aion/testnet/jsonrpc?apiKey=c63b8c2a5d824408b6ebafac8b5d1daf'));
//rinkeby.infura.io/v3/0a18690429ba470fa684b4eefd0d96b2

console.log(web3.eth.getBlockNumber())

// var emitter = require('events').EventEmitter;

// var em = new emitter();

// //Subscribe FirstEvent
// em.addListener('FirstEvent', function (data) {
//     console.log('First subscriber: ' + data);
// });

// //Subscribe SecondEvent
// em.on('SecondEvent', function (data) {
//     console.log('First subscriber: ' + data);
// });

// // Raising FirstEvent
// em.emit('FirstEvent', 'This is my first Node.js event emitter example.');

// // Raising SecondEvent
// em.emit('SecondEvent', 'This is my second Node.js event emitter example.');
