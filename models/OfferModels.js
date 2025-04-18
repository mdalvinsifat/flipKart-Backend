const mongoose = require("mongoose")


const OfferModelSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    }, 
    descriptions:{
        type:String 
    }
},{timestamps:true})



const OfferModel = mongoose.model("offer", OfferModelSchema);

module.exports = OfferModel