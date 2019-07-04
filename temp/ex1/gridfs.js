
const express_fileupload=require('express-fileupload');
const express = require('express');
const router = express();

var mongoose = require('mongoose');
var streamifier = require('streamifier');
var fs = require('fs');
const uri = 'mongodb://localhost:27017/gb1';
router.use(express_fileupload())
mongoose.connect(uri,{useNewUrlParser:true},function(err,res){
		if(res){
			console.log("connected")
	}});
router.post('/upload', (req, res) => {
    let filename = req.files.myfile.name;
    console.log()

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });

    streamifier.createReadStream(req.files.myfile.data).
        pipe(gridfsbucket.openUploadStream(filename)).
        on('error', function (error) {
            assert.ifError(error);
        }).
        on('finish', function () {
            console.log('done!');
            res.status(200).json({
                success: true,
                msg: 'File Uploaded successfully..'
            });
            // res.end()
        });
        // res.end()
})

router.get('/download/:_filename',(req,res)=>{
   
    const filename=req.params._filename;
    console.log("filename");
    console.log(filename)
    var gridfsbucket=new mongoose.mongo.GridFSBucket(mongoose.connection.db,{chunkSizeBytes:1024,bucketName:'filesBucket'})
    gridfsbucket.openDownloadStreamByName(filename).
    pipe(fs.createWriteStream('./gridfsBucketDatas/'+filename)).
        on('error', function (error) {
            console.log("error" + error);
            res.status(404).json({
                msg: error.message
            });
        }).
        on('finish', function () {
            console.log('done!');
            res.send('Downloaded successfully!')
        });

})
router.post('/test',function(req,res){
    console.log("datataat")
    console.log(req.files)
    
    res.send("test");
    res.end();
})

// router.post('/upload',(req, res)=>{
//     var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
//         chunkSizeBytes:1024,
//         bucketName:'filesBucket'
//     });

//     fs.createReadStream('./tem.js')
//         .pipe(gridfsbucket.openUploadStream('tem.js'))
//         .on('error', ()=>{
//             console.log("Some error occured:"+error);
//             res.send(error);
//         })
//         .on('finish', ()=>{
//             console.log("done uploading");
//             //process.exit(0);
//             res.send('Done Uploading');
//         });
// })

router.get('/api',function(req,res){
    res.send("welcome");
    res.end();
})

router.listen(3000);

