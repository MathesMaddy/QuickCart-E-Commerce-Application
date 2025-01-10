const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
    name:{ type:String, required:true},
    specs:{ type:String, required:true},
    price:{ type:String, required:true},
    category:{ type:String, required:true},
    picture:{ type:String, required:true}
})

const Product = models?.Products || model('Products',ProductSchema);

export default Product;