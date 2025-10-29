const mongoose = require("mongoose")

const productSchema =new mongoose.Schema(
    {
        id:{
            type:Number,
            require:true
        },
        title:{
            type:String
        },
        price:{
            type:String
        },
        quantity:{
            type:Number
        },
        category:{
            type:String
        },
        image:{
            type:String
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("Product",productSchema)
