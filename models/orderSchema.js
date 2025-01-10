const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
    products: Object,
    name: String,
    email: String,
    
    address: String,
    city: String,
    state: String,
    pincode: Number,
    phoneNo: Number,
    paid: { type: Number, defaultValue: 0 },
}, { timestamps: true } );

const Order = models?.Order || model("Order", OrderSchema);

export default Order;

