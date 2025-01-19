import initMongoose from "../../../../models/mongoose";
import Order from "../../../../models/orderSchema";
import {buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
    
    await initMongoose(); 

    const SigningSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const payload = await request.text(); 
    const signature = await request.headers.get('stripe-signature');

    const event = await stripe.webhooks.constructEvent(payload, signature, SigningSecret);
    
    console.log(event);
    if(event?.type === 'checkout.session.completed') {        
        const metadata = await event.data?.object?.metadata;
        console.log(metadata);
        const paymentStatus = await event.data?.object?.payment_status;
        console.log(paymentStatus);
        if(metadata?.orderId && paymentStatus === 'paid') {
            await Order.findOneAndUpdate({ _id: metadata.orderId }, { $set : {paid : 1}}, {new : true})
            console.log('ok update');
        }        
    }
    return new Response('ok')
    
}

export const config = {
    api: {
        bodyParser: false,
    },
};
