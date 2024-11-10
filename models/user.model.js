const mongoose=require("mongoose")
var encrypt = require('mongoose-encryption');

const usersSchema=new mongoose.Schema({
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

var enckey = process.env.ENC_KEY;
usersSchema.plugin(encrypt, { secret: enckey,
    encryptedFields:["password"],
 });

module.exports=mongoose.model("user",usersSchema)