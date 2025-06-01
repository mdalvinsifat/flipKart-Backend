    const mongoose = require("mongoose")


    const AuthSchema = mongoose.Schema({
        fullName : {
            type :String , 
            required:true
        }, 
        email : {
            type:String , 
            required:true
        }, 
        password : {
            type:String , 
            required:true
        }, 
        confirm_password : {
            type :String , 
            required:true
        }, 
        image :{
            type :String 
        }, 
        gender:{
            type:String, 
        }, 
        isAdmin: { type: Boolean, default: false },
    })


    const Auth = mongoose.model("userSchame", AuthSchema)

    module.exports = Auth

