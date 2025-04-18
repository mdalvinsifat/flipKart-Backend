

const express = require("express")
const { GetCategoryProduct, CreateCategoryProduct, GetByIdCategoryProduct, UpdateCategoryProduct, DeleteCategoryProduct } = require("../controller/CategoryController")


const router = express.Router()


router.get("/", GetCategoryProduct)
router.post("/",CreateCategoryProduct)
router.get("/:id", GetByIdCategoryProduct)
router.put("/:id", UpdateCategoryProduct)
router.delete("/:id", DeleteCategoryProduct)


module.exports = router