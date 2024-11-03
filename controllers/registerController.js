const users=require('../model/registerModel')
const jwt=require('jsonwebtoken')

// user register
exports.userRegisterController=async(req,res)=>{
    const{username,email,password}=req.body

    try {
        const existingUser=await users.findOne({email})

        if(existingUser){
            res.status(406).json('Account already exist')
        }else{
            const newUser=new users({
                username,
                email,
                password,
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login
exports.loginController=async(req,res)=>{
    const{email,password}=req.body

    try {
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},"bosskey")
            res.status(200).json({existingUser,token})
        }else{
            res.status(406).json('Account doesnot exist')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}
// get details
exports.getUserController=async(req,res)=>{
    const Id=req.payload
    try {
        
        const user=await users.findOne({_id:Id})
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json(error)
    }
}

// update profile

exports.updateProfileController=async(req,res)=>{

    const userId=req.payload
    const{username,email,password,profile}=req.body

    const profileImg=req.file?req.file.filename:profile

    try {
        const existingUser=await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            profile:profileImg
        },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)
    }
}