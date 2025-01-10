import initMongoose from "../../../../models/mongoose";
import Product from "../../../../models/productSchema";


export async function GET(request) {
    await initMongoose();      

    const url = new URL(request.url); 
    const ids = url.searchParams.get('ids');  
    try{
        if(url.search) {               
            const id = ids.split(',');
            return new Response(JSON.stringify(
                await Product.find({ '_id': { $in: id } }).exec()
            ));
        }       
    } catch(e) {
        console.log(e)
        return new Response("Error in Server" + e);
    }        
}