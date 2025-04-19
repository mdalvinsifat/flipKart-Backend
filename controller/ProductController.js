const Product = require("../models/ProductModel")
const path = require("path")
const fs = require("fs")

exports.GetAllProduct =  async(req, res) =>{
    try {
       const Products = await Product.find()
        .populate('Category') // Populate the Category reference
        .populate('OfferModel') // Populate the OfferModel reference
        .exec()
        res.status(201).json({
            success:true , 
            message:"user Get Successfully", 
            Products
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
  



  exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
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
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      if (req.files) {
        if (req.files["image"]) {
          product.image = req.files["image"][0].filename;
        }
        if (req.files["SubImageOne"]) {
          product.SubImageOne = req.files["SubImageOne"][0].filename;
        }
        if (req.files["SubImageTwo"]) {
          product.SubImageTwo = req.files["SubImageTwo"][0].filename;
        }
        if (req.files["SubImageThree"]) {
          product.SubImageThree = req.files["SubImageThree"][0].filename;
        }
        if (req.files["SubImageFour"]) {
          product.SubImageFour = req.files["SubImageFour"][0].filename;
        }
      }
  
      // Update fields
      product.name = name || product.name;
      product.title = title || product.title;
      product.descriptions = descriptions || product.descriptions;
      product.SubDescriptions = SubDescriptions || product.SubDescriptions;
      product.Specifications = Specifications || product.Specifications;
      product.Reating = Reating || product.Reating;
      product.review = review || product.review;
      product.Category = Category || product.Category;
      product.OfferModel = OfferModel || product.OfferModel;
  
      // Save updated product
      await product.save();
  
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error("updateProduct Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };



  exports.GetSingleProduct = async(req, res ) =>{
    try {
      const Products = await Product.findById(req.params.id)
      
      res.status(200).json({ success: true, Products });

    } catch (error) {
      console.error("updateProduct Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }


  exports.DeleteSingleProduct = async(req , res ) =>{
    try {


      const subProduct = await Product.findById(req.params.id)

      const imageToDelete = [
        subProduct.image,
        subProduct.SubImageFour,
        subProduct.SubImageOne,
        subProduct.SubImageTwo,
        subProduct.SubImageThree
      ]

      for(const image of imageToDelete) { 
        const imagePath = path.join(__dirname, "../uploads", image); 
      try {
        if(imagePath){

          await fs.promises.unlink(imagePath)
          console.log("Product image Deleted")
        }
        
      } catch (error) {
        console.log(`delete image is error on ${error}`)

      }
      }

      const Products = await Product.findByIdAndDelete(req.params.id)
      res.status(200).json({ success: true, Products });

    } catch (error) {
      console.error("updateProduct Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }


