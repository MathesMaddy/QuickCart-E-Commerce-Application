import Product from "../../../../models/productSchema";
import Order from "../../../../models/orderSchema"
import initMongoose from "../../../../models/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {

    await initMongoose(); 

    if(request.method !== "POST") {
        return new Response('should a post but its not!');
    }
    
    const bodyText = await request.text(); 
    const body = new URLSearchParams(bodyText);
    
    const origin = request.headers.get('origin');
    const product = body.get('products');
    const email = body.get('email');

    const productsIds = product.split(',');
    const uniIds = [ ...new Set(productsIds) ];
    const products = await Product.find( {_id : { $in: uniIds }} ).exec();

    let line_items = [];
    for(let productId of uniIds) {

        let quantity = productsIds.filter(id => id === productId).length;
        let product = products.find(p => p._id.toString() === productId);
        line_items.push({
            quantity,
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.name,
                },
                unit_amount: (product.price * 100),
            },
        })
    }


    const order = await Order.create({
        products: line_items,
        name: body.get('name'),
        email: body.get('email'),
        address: body.get('address'),
        city: body.get('city'),
        state: body.get('state'),
        pincode: body.get('pincode'),
        phoneNo: body.get('phoneNo'),
        paid: 0,
    })

    const session =  await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
        success_url: `${origin}/?success=true`,
        cancel_url: `${origin}/?canceled=true`,
        metadata : { orderId: order._id.toString() }
    });
    return Response.redirect(session.url, 303);
}