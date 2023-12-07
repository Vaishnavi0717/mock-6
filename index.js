const express=require("express");
require("dotenv").config();
const app=express();
const {blogRouter}= require("./routes/blog.routes")
const {userRouter}=require("./routes/user.routes")

const cors=require("cors");
const { connection } = require("./db");
app.use(cors());

app.use("/users",userRouter)
app.use("/blogs",blogRouter)


app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("server is running on port 8080")
        console.log("server is connected to DB")
    } catch (error) {
        console.log("error")
    }
})