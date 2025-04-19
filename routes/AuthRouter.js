

const express = require("express")
const { registerController, LoginUser, UpdateUser, getProduct, DeleteUser } = require("../controller/AuthController")
const { authUpload } = require("../middlewares/multer")


const router = express.Router()



router.post("/register", authUpload.single("image"),registerController)
router.put("/update/:id", authUpload.single("image"),UpdateUser)
router.post("/login",LoginUser)
router.get("/user",getProduct)
router.delete("/delete/:id",DeleteUser)

module.exports =router