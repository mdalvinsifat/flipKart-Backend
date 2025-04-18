const Order = require("../models/OrderModel")


//get Order 
exports.GetAllOrder = async(req, res ) =>{
    try {

        const Orders = await Order.find()
        res.status(201).json({
            success:true , 
            message:"user get Successfully", 
            Orders
        })
        
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success:false , 
            message:"catch error"
        })
    }
}


//post

exports.PostOrder = async(req, res ) =>{

    try {
        const {address, city , state, phoneNo, country , pincode} = req.body
        const Orders = await Order.create({
            address, 
            city, 
            state, 
            phoneNo, 
            country,
            pincode
        })

        await Orders.save()

        res.status(201).json({
            success:true , 
            messsage:"user create Successfully",
            Orders
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success:false , 
            message:"catch error"
        })
    }
}




exports.UpdateOrder = async(req, res ) =>{
    try {
        const {address, city, state, phoneNo, country , pincode} = req.body

        const Orders = await Order.findByIdAndUpdate(req.params.id , {address, city , state, phoneNo, country, pincode}, {new:true})
        
        res.status(201).json({
            success:true , 
            message:"user Update Successfully", 
            Orders
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success:false , 
            message:"catch error"
        })
    }
}







exports.GetById = async(req, res ) =>{
    try {
        
        const Orders = await Order.findById(req.params.id)
        res.status(201).json({
            success:true, 
            message:"user find Successfully ", 
            Orders
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success:false , 
            message:"catch error"
        })
    }
}




exports.DeleteOrder = async(req, res ) =>{
    try {

        const Orders = await Order.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success:true , 
            messagae:"delete finally successully", 
            Orders
        })
        
    } catch (error) {
        console.log(error)
        res.status(501).send({
            success:false , 
            message:"catch error"
        })
    }
}

