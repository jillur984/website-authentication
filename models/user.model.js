const mongoose=require("mongoose")

const usersSchema=mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("user",usersSchema)