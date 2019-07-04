const express = require('express');
const app=express()
const formidable = require('formidable');
const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const fs = require('fs');
const mongodb=require('mongodb')
const uri = 'mongodb://localhost:27017';
const dbName = 'b1';
const path = require('path');

app.post('/file',function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/data";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (!err) {
            mongodb.MongoClient.connect(uri,{ useNewUrlParser: true }, function(error, client) {
                const db = client.db(dbName);
                var bucket = new mongodb.GridFSBucket(db);
                console.log('File uploaded : ' + files.file.path);
       
    fs.createReadStream(files.file).
    pipe(bucket.openUploadStream(path.basename(files))).
    on('error', function(error) {
      //assert.ifError(error);
    }).
    on('finish', function() {
      console.log('done!');
      process.exit(0);
    });
        //   var writestream = bucket.createWriteStream({
        //       filename: files.file.name
        //   });
        //   fs.createReadStream(files.file.path).pipe(writestream);
  
    }); 
    }        
   });
   form.on('end', function() {        
       res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
   });

    
})

app.get('/api',function(req,res){
    res.send("apiconnected");
    res.end();
})

app.listen(3000,function(err,res){
        console.log("connected on 3000")
})


// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const mongodb=require('mongodb')
// mongoose.connect('mongodb://localhost:27017/a1', { useNewUrlParser: true });
// const conn = mongoose.connection;
// let opts = {
//     bucketName: 'Movies'
//   };
//   const bucket = new conn.GridFSBucket(opts);
// function saveFile(b, p) {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(p)
//       .pipe(b.openUploadStream(path.basename(p)))
//       .on('error', function (err) { reject(err); })
//       .on('finish', function (file) { resolve(file); });
//   });
// }

// async function run() {
//   await conn.dropDatabase();
//   let opts = {
//     bucketName: 'Movies'
//   };
//   const bucket = new mongoose.mongo.GridFSBucket(conn.db, opts);
//   let res = await saveFile(bucket, __dirname+'/tem.js');
//   console.log(res);
//   return conn.close();
// }

// run();