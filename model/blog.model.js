const mongoose=require("mongoose")

const blogSchema= mongoose.Schema({
    username:String,
    title:String, 
    content:String,
    category:String,
    date:Date,
    likes:String,
    comments:[{username:String, content:String}]
},{
    versionKey:false
})


const blogModel=mongoose.model("blog", blogSchema);

module.exports={blogModel}