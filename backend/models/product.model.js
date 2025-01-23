import mongoose from "mongoose";

const productSchema =new  mongoose.Schema({
    name : {
        type : String,
        required : [true , "Product Name is Required"]
    },
    description : {
        type : String,
        required : [true , "Product Description is Required"]
    },
    price : {
        type : Number,
        min : 0 ,
        require : [true , "Product price is required"]
    },
    image : {
        type : String,
        required : [true , "Product Image is required"]
    },
    category : {
        type : String ,
        required : true
    },
    isFeatured  : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

const Product = mongoose.model("Product" , productSchema)

export default Product