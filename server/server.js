const express = require("express");
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3000 
const connectDB = require("./config/connectDB")

connectDB()

app.use(cors({
    origin: process.env.CLIENTSIDE_URL,

}))
app.use(express.json())

app.use('/api/products', require('./route/productRoute'))
app.use('/api/cart', require('./route/cartRoute'))


app.listen(port,()=>{
    console.log(`app is listing on port ${port}`)
})

