const Product = require("../models/ProductModel")


exports.GetAllProduct =  async(req, res) =>{
    try {
        Product.find()
        .populate('Category') // Populate the Category reference
        .populate('OfferModel') // Populate the OfferModel reference
        .exec()
        res.status(201).json({
            success:true , 
            message:"user Get Successfully", 
            Product
        })
        
    } catch (error) {
        console.log(error)
        res.status(501).json({
            success:false, 
            message:"user catech Error Product", 
            error
        })
    }
}



exports.CreateAllProduct = async (req, res) => {
    try {
      const {
        name,
        title,
        descriptions,
        SubDescriptions,
        Specifications,
        Reating,
        review,
        Category,
        OfferModel,
      } = req.body;
  
      const image = req.files["image"]?.[0]?.filename || "";
      const SubImageOne = req.files["SubImageOne"]?.[0]?.filename || "";
      const SubImageTwo = req.files["SubImageTwo"]?.[0]?.filename || "";
      const SubImageThree = req.files["SubImageThree"]?.[0]?.filename || "";
      const SubImageFour = req.files["SubImageFour"]?.[0]?.filename || "";
  
      const product = new Product({
        name,
        title,
        image,
        descriptions,
        SubDescriptions,
        Specifications,
        Reating,
        review,
        Category,
        OfferModel,
        SubImageOne,
        SubImageTwo,
        SubImageThree,
        SubImageFour,
      });
  
      await product.save();
      res.status(201).json({ success: true, product });
    } catch (error) {
      console.error("CreateAllProduct Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  



