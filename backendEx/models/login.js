const mongoose=require('mongoose')
const Schema=  mongoose.Schema
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const login_Schema = new Schema({
    "name":{type:String,required:true},
    "password":{type:String,required:true},
    "age":Number,
    "email":{ type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
}
})

module.exports=mongoose.model('login',login_Schema)
