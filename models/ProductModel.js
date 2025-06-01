        const mongoose = require("mongoose")

        const ProductSchema = new mongoose.Schema({
            name:{
                type :String,
                required:true 
            }, 
            title :{
                type :String , 
                required:true 
            }, 
            image :{
                type :String , 
                required :true 
            }, 

            descriptions :{
                type :String
            },
            SubDescriptions:{
                type:String 
            }, 
            Specifications:{
                type:String 
            },

            Reating :{
                type:String 
            }, 
            review :{
                type:String
            }, 
            Category :{
                type : mongoose.Schema.ObjectId, 
                ref:"Category", 
                required:true
            }, 
            OfferModel :{
                type:mongoose.Schema.ObjectId, 
                ref:"offer", 
                required:true
            }, 
            SubImageOne :{
                type:String
            }, 
            SubImageTwo :{
                type:String
            }, 
            SubImageThree :{
                type:String
            }, 
            price :{
                type:String
            }, 
            oldPrice :{
                type:String
            },

            SubImageFour :{
                type:String
            }

        })



        const Product = mongoose.model("ProductSchema", ProductSchema)

        module.exports = Product

