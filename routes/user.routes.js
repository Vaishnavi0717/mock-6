const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {userModel} =require("../model/user.model");


const userRouter=express.Router();

userRouter.post("/register", (req,res)=>{
    const {username, email, avatar,password}= req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).send({"msg":"error"})
            }
            else{
                const user=new userModel({
                    username,
                    email,
                    avatar,
                    password:hash,
                })
                await user.save();
                res.status(200).send({"msg":"New user has been registered","new_user":user})
            }
        })
    } catch (error) {
        res.status(400).send("error")
    }
});



userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password,(err,result)=>{
                if(result){
                    const authToken=jwt.sign({username:user.username, userID:user._id}, "authToken");
                    res.status(200).send({"msg":"user has been login successfully", "authToken":authToken})
                }
            })
        }
        else{
            res.status(400).send({"msg":"error"})
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports={
    userRouter
}