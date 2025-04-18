


const express = require("express")
const { GetAllOrder, PostOrder, UpdateOrder, GetById, DeleteOrder } = require("../controller/OrderController")

const router = express.Router()


router.get("/", GetAllOrder)
router.post("/", PostOrder)
router.put("/:id", UpdateOrder)
router.get("/:id", GetById)
router.delete("/:id", DeleteOrder)


module.exports = router 