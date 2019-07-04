const login=require('../models/login')
exports.login=(req,res)=>{

    console.log("login")
    console.log(req.body.name);
    res.send()
    res.end();
}

exports.register=(req,res)=>{

    const user=new login({"name":req.body.name,"password":req.body.password,"email":req.body.email})

    user.save().then(result=>{
        res.json(result);
        console.log(result);
        res.end();        
    }).catch(err=>{
        console.log("err");
        res.send(err)
    })
}

exports.test=(req,res)=>{
    console.log("API connected");
    res.send("API connected");
}

