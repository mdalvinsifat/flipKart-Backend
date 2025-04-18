

const express = require("express")
const { GetOfferProduct, CreateOfferProduct, GetByIdOfferProduct, UpdateOfferProduct, DeleteOfferProduct } = require("../controller/OfferController")


const router = express.Router()


router.get("/", GetOfferProduct)
router.post("/",CreateOfferProduct)
router.get("/:id", GetByIdOfferProduct)
router.put("/:id", UpdateOfferProduct)
router.delete("/:id", DeleteOfferProduct)


module.exports = router