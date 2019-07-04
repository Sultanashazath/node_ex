const mongoose=require('mongoose')
const Schema=mongoose.Schema

const excel= new Schema({
    booktitle:String,
    bookid:String,
    bookauthor:String
})

module.exports=mongoose.model('excel',excel);