const mongoose=require('mongoose'); 
const express=require('express');
const app= express();
const bodyParser=require('body-parser')
const schema=require('./models/login');
const router=require('./routers/router')

const uri = 'mongodb://localhost:27017/backendEx';

mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex: true,}).then(res=>{
    console.log("conneted");
}).catch(err=>{console.log("error")})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',router)



app.get('/api',(req,res)=>{
    console.log("connected");
    res.end();
})
app.listen(3000,function(err,res){
    console.log("conneted on 3000")
})

// var dob=/^(\d{1,2}-){2}(?:\d{2}|\d{4})$/

// app.post('/login',(req,res)=>{
//     console.log(req.body.email);
//     schema.find({email:req.body.email},function(err,res){
//         console.log(res)
//     })
//     res.end();    
// })

// app.post('/signup',(req,res)=>{
// console.log("post datas")
// const datas=new schema({"name":req.body.name,"password":req.body.password,"email":req.body.email})
// datas.save().then(res=>{
// console.log("resss"+res)
// res.send("success")
// }).catch(err=>{
//     res.send("error")
// })
//     console.log(req.body.name)
//     //res.end()
// })
