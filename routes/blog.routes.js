const express=require("express");
const {blogModel} = require("../model/blog.model");
const {auth} =require("../middleware/auth.middleware");

const blogRouter=express.Router();
blogRouter.use(auth);
blogRouter.use(express.json())

//get
blogRouter.get("/", async(req,res)=>{
    try {
        const blog=await blogModel.find({username:req.body.username});
        res.status(200).send(blog);
    } catch (error) {
        res.status(400).send(error)
    }
})


//create
blogRouter.post("/create", async(req, res)=>{
    try {
        const blog= new blogModel(req.body)
        await blog.save()
        res.status(200).send({"msg":"new blog has been created"})
    } catch (error) {
        res.status(400).send(error)
    }
})


//updated
blogRouter.patch("/update/:blogID", async(req,res)=>{
    const {blogID}=req.params;
    const blog=await blogModel.findOne({_id:blogID})
    try {
        if(req.body.userID==blog.userID){
            await blogModel.findByIdAndUpdate({_id:blogID},req.body);
            res.status(200).send({"msg":`the blog with id ${blogID} has been updated`})
        }
        else{
            res.status(400).send({"msg":"you are not authorized"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


//delete
blogRouter.delete("/delete/:blogID", async(req,res)=>{
    const {blogID}=req.params;
    const blog=await blogModel.findOne({_id:blogID})
    try {
        if(req.body.userID==blog.userID){
            await blogModel.findByIdAndDelete({_id:blogID});
            res.status(200).send({"msg":`the blog with id ${blogID} has been deleted`})
        }
        else{
            res.status(400).send({"msg":"you are not authorized"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports={
    blogRouter
}