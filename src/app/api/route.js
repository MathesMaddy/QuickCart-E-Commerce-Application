export const dynamic = 'force-dynamic' // defaults to auto
import initMongoose from "../../../models/mongoose";
import Product from "../../../models/productSchema";

export async function GET() {
    await initMongoose();      
    
    return new Response(JSON.stringify(await Product.find()));    
}

