const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
})


const Order = mongoose.model("Order", OrderSchema)

module.exports = Order
