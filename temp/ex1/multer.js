const mongoose=require('mongoose');
const express=require('express')
const app=express()
const fs=require('fs');
const multer=require('multer');
const bodyparser=require('body-parser')
const  path=require('path');

const paths=__dirname+"/uploads/"

const storage=multer.diskStorage({destination:function(req,file,cbe){ //stroing file in to folder
	cbe(null,"./uploads/"); 
	},onError : function(err, next) {
		console.log('error', err);
		next(err);
	  },
	filename:function(req,file,cbe){
		cbe(null,new Date().toISOString() + file.originalname)
	}
})
var upload;
// try{
 upload=multer({storage:storage , fileFilter: function (req, file, cb) {
	var ext = path.extname(file.originalname);
	console.log("ext****");
	console.log(file.mimetype );
	if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && ext !=='.mp4' && file.mimetype!=='application/pdf'){// || ext !== '.jpg' || ext !== '.pdf',ext !=='.mp4'){// && ext == '.gif' && ext == '.jpeg') {
		cb(null, false);return cb(new Error('Only images are allowed'))
	}else{
	return 	cb(null, true)
	
	}
	// else{
	// 	cb(null, false) 
	// 	return cb(new Error('Only images are allowed'))
	// }

  } })
// ,limit:{fileSize:1024*1024*5}
// )
// }catch(e){console.log("exception");console.log(e)}
mongoose.connect("mongodb://localhost:27017/dataFiles",{useNewUrlParser:true},function(err,res){
		if(res){
			console.log("connected")
	}});
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.get('/api',function(req,res){
	res.write("api connected");
	res.end();
})

app.post("/test",function(req,res){
	console.log(req.body);
	console.log("test")
	res.end();
})

app.post('/upload/',upload.single('sultana'),function(request,response,next){
	console.log("image uploads");
	// console.log(request.body)
	response.end();
	// response.json("file sended to server");
})


app.post('/uploadmultiple/',upload.array('file',5),function(req,res){
	res.send("succes")
	res.end();
	
})

app.delete("/delete/",function(req,res){ // delete all
console.log("delete")
	fs.readdir('./Exfiles',function(err,data){
		console.log(data)
			data.forEach(element => {
				fs.unlinkSync("./Exfiles/"+element)
			});
	
	})
	res.end()
})

app.get("/download/:filename",function(req,res){

	var file = req.params.filename;
	var path_file = __dirname+'/Exfiles/' + file;
	console.log(path_file)
	fs.exists(path_file, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(path_file))
        } else {
            return res.status(200).send({
                message: "The image doesn't exist."
            })
        }
    })

})
app.get("/docs/:filename",function(req,res){

	var file = req.params.filename;
	var path_file = __dirname+'/Exfiles/' + file;
	console.log(path_file)
	fs.exists(path_file, (exists) => {
        if (exists) {
            return res.download(path.resolve(path_file))
        } else {
            return res.status(200).send({
                message: "The image doesn't exist."
            })
        }
    })

})
app.get('/index/',function(err,res){
	res.sendFile(__dirname+'/index.html')
})
app.listen(3000);
//,function(err,res){
	// console.log(err);console.log(res)
// });