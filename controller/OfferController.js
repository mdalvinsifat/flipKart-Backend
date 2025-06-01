

// Get Offer 

const  OfferModel  = require("../models/OfferModels")

exports.GetOfferProduct= async(req, res) =>{
    try {
        const offerProduct = await OfferModel.find()
        res.status(201).json({
            success:true, 
            message:"product find Successfully", 
            offerProduct:offerProduct
        })
    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}

// Post Offer 

exports.CreateOfferProduct = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // debug log

        const { name, descriptions } = req.body;

        if (!name || !descriptions) {
            return res.status(400).json({
                success: false,
                message: "name and descriptions are required"
            });
        }

        const offerProduct = await OfferModel.create({ name, descriptions });
        res.status(201).json({
            success: true,
            message: "Offer Created Successfully",
            offerProduct
        });
    } catch (error) {
        console.log("Error in CreateOfferProduct:", error.message);
        res.status(501).send({
            success: false,
            message: "Catch error showing"
        });
    }
};

// Update offer 
exports.UpdateOfferProduct= async(req, res)  =>{
    try {
        const {name , descriptions } = req.body 
        
        const offerProduct = await OfferModel.findByIdAndUpdate(
            req.params.id, {name, descriptions} ,{new:true}
        )

        if(!offerProduct){
            res.status(401).json({
                success:false, 
                message:"user Not Found Please try again"
            })
        }

        res.status(201).json({
            success:true, 
            message:"user Update Successfully", 
            offerProduct
        })


    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}


// read offer 

exports.GetByIdOfferProduct= async(req, res)  =>{
    try {

        const offerProduct = await OfferModel.findById(req.params.id);
        res.status(201).json({
            success:true,
            message:"user Find successfully",
            offerProduct
        })
        
    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}



// Delete Offer

exports.DeleteOfferProduct=async (req, res)  =>{
    try {

        const offerProduct = await OfferModel.findByIdAndDelete(req.params.id)
        

        res.status(201).json({
            success:true, 
            message:"user Delete Successfully", 
            offerProduct
        })
        
    } catch (error) {
        res.status(501).send({
            success:false, 
            message:"Catch error showing"
        })
    }
}









