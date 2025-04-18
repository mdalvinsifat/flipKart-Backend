

// Get Category 

const  CategoryModel  = require("../models/CategoryModel")

exports.GetCategoryProduct= async(req, res) =>{
    try {
        const CategoryProduct = await CategoryModel.find()
        res.status(201).json({
            success:true, 
            message:"product find Successfully", 
            CategoryProduct:CategoryProduct
        })
    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}

// Post Category 

exports.CreateCategoryProduct= async(req, res)  =>{
    try {
        const {name , descriptions} = req.body 
        const CategoryProduct = await CategoryModel({name , descriptions})
        await CategoryProduct.save()
        res.status(201).json({
            success:true , 
            messsage:"user Create Successfully", 
            CategoryProduct
        })
    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}

// Update Category 
exports.UpdateCategoryProduct= async(req, res)  =>{
    try {
        const {name , descriptions } = req.body 
        
        const CategoryProduct = await CategoryModel.findByIdAndUpdate(
            req.params.id, {name, descriptions} ,{new:true}
        )

        if(!CategoryProduct){
            res.status(401).json({
                success:false, 
                message:"user Not Found Please try again"
            })
        }

        res.status(201).json({
            success:true, 
            message:"user Update Successfully", 
            CategoryProduct
        })


    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}


// read Category 

exports.GetByIdCategoryProduct= async(req, res)  =>{
    try {

        const CategoryProduct = await CategoryModel.findById(req.params.id);
        res.status(201).json({
            success:true,
            message:"user Find successfully",
            CategoryProduct
        })
        
    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}



// Delete Category

exports.DeleteCategoryProduct=async (req, res)  =>{
    try {

        const CategoryProduct = await CategoryModel.findByIdAndDelete(req.params.id)
        

        res.status(201).json({
            success:true, 
            message:"user Delete Successfully", 
            CategoryProduct
        })
        
    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}









