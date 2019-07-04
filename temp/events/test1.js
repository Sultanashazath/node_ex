const fs=require('fs');
debugger
const sum=10+10;
console.log(sum)
fs.readFile('event.js', 'utf8', function (err, data) {
    
    //debugger;

    if (err) throw err;
    
    console.log(data);
});