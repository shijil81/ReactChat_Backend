const jwt=require('jsonwebtoken')


const jwtMiddleware=(req,res,next)=>{
    
    
    const token=req.headers["authorization"].split(' ')[1]

    
    try {
        const jwtResponse=jwt.verify(token,"bosskey")
        req.payload=jwtResponse.userId
        
        
        next()
    } catch (error) {
        res.status(401).json(`Authorization faild ${error}`)
    }
}

module.exports=jwtMiddleware