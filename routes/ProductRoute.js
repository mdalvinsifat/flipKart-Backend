const express =require("express")
// const upload = require("../middlewares/multer")
const { GetAllProduct, CreateAllProduct, updateProduct, GetSingleProduct, DeleteSingleProduct } = require("../controller/ProductController")
const {upload} = require("../middlewares/multer")


const router = express.Router()


router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "SubImageOne", maxCount: 1 },
    { name: "SubImageTwo", maxCount: 1 },
    { name: "SubImageThree", maxCount: 1 },
    { name: "SubImageFour", maxCount: 1 },
  ]),
  CreateAllProduct
);



router.get("/", GetAllProduct)

router.put("/:id", upload.fields([
    {name : "image", maxCount :1 },
    {name : "SubImageOne", maxCount :1 },
    {name : "SubImageTwo", maxCount :1 },
    {name : "SubImageThree", maxCount :1 },
    {name : "SubImageFour", maxCount :1 },
]),updateProduct)


router.get("/:id", GetSingleProduct)
router.delete("/:id", DeleteSingleProduct)



module.exports = router 