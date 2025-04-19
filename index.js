const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const colors = require("colors")
const dotenv = require("dotenv")
const ConnectDB  = require("./config/ConnectDB")
const router = require("./routes/OfferRoutes")
const category = require("./routes/CategoryRoute")
const order = require("./routes/OrderRoutes")
const product = require("./routes/ProductRoute")
const Auth = require("./routes/AuthRouter")
const app = express()


app.use(express.json())
app.use(cors())
dotenv.config()
app.use(morgan("dev"))


app.use("/offer", router)
app.use("/category", category)
app.use("/order", order)
app.use("/product", product)
app.use("/auth", Auth)
const PORT = process.env.PORT || 8080 
ConnectDB()


app.listen(PORT ,  () => console.log(`http://localhost:${PORT}`.bgGreen))


