// import mongoose
const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    profile:{
        type:String
    }   

})

const users=mongoose.model("users",regSchema)

module.exports=users