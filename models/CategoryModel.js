const mongoose = require("mongoose")


const CategoryModelSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    }, 
    descriptions:{
        type:String 
    }
},{timestamps:true})



const CategoryModel = mongoose.model("Category", CategoryModelSchema);

module.exports = CategoryModel