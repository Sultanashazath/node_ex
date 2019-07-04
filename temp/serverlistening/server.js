const express=require('express')
const app=express()
app.get('/',function(err,res){
    console.log("connected")
    res.send("connected")
})
app.listen(3000);