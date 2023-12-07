const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    const authToken=req.headers.authorization?.split(" ")[1];
    try {
        if(authToken){
            jwt.verify(authToken,"authToken",(err,decode)=>{
                if(decode){
                    req.body.username=decode.username;
                    req.body.userID=decode.userID;
                    next();
                }
                else{
                    res.status(400).send({"msg":"user is not authorized"})
                }
            })
        }
        else{
            res.status(400).send({"msg":"login again"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports={
    auth
}