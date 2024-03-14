import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    try{
        let token=req.header("Authoriztion")
        if(!token){
            return res.status(403).send("Acess denied")
        }
        if(token.startsWith("Bearer ")){
            token=token.slic(7,token.length).trimLeft()
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET)

        req.user=verified
        next()

    }catch(err){
        res.status(500).json({error:err.message})
    }
}