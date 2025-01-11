import initMongoose from "../../../../models/mongoose";
import Order from "../../../../models/orderSchema";
import {buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
    await initMongoose(); 

    const SigningSecret = whsec_7goP1v41DoxEBaNlcMW5zA45LgmPVeET;
    const payload = await buffer(request.body);
    const signature = request.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(payload, signature, SigningSecret);

    if(event?.type === 'checkout.session.completed') {
        
        const metadata = event.data?.object?.metadata;
        const paymentStatus = event.data?.object?.payment_status;
        if(metadata?.OrderId && paymentStatus === 'paid') {
            await Order.findByIdAndUpdate(metadata.OrderId, {paid : 1})
        }
    }
}
