var express = require('express');
var formidable = require('formidable');
var mongoose = require('mongoose');
var grid = require('gridfs-stream');
var fs = require('fs');
var util = require('util');
var app = express();

app.post('/fileupload', function (req, res) {
    var form = new formidable.IncomingForm();
    // form.uploadDir = __dirname + "/data";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (!err) {
          console.log('File uploaded : ' + files.file.path);
          grid.mongo = mongoose.mongo;
          var conn = mongoose.createConnection('mongodb://localhost:27017/temp',{useNewUrlParser:true});
          conn.once('open', function () {
          var gfs = grid(conn.db);
          console.log(files.file.name)
          var writestream = gfs.createWriteStream({
              filename: files.file.name
          });
          fs.createReadStream(files.file.path).pipe(writestream);
       });
     }        
   });
   form.on('end', function() {        
       res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
   });

});

app.get('/', function(request, response){
    response.send(
        '<form method="post" action="/fileupload" enctype="multipart/form-data">'
        + '<input type="file" id="file" name="file">'
        + '<input type="submit" value="submit">'
        + '</form>'
        );    
});

app.listen(40000, function() {
    console.log('Express is listening on port 40000');
});