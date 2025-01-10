import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import { ProductsContext } from "./ProductContext";

export default function Layout({ children }) {
    const { setSelectedProducts } = useContext(ProductsContext);

    const [ success, setSuccess ] = useState(false);
    const [ paymentFail, setPaymentFail ] = useState(false);

    useEffect( () => {
        if(window.location.href.includes('success')) {            
            setSelectedProducts([]);
            setSuccess(true);            
        }
        else if(window.location.href.includes('canceled')) {
            setPaymentFail(true);
        }
    })
    
    setTimeout( () => {        
        if(success) {
            setSuccess(false)
        }
        else if(paymentFail) {
            setPaymentFail(false)
        }
    }, 10000);

    return(
        <div>
            <div className = "max-w-5xl mx-auto p-4">
                {success && (
                    <div className = "bg-emerald-500 p-4 text-white mb-2 rounded-xl"> 
                        <h2 className = "text-lg">
                            Thanks for your order!
                        </h2>
                    </div>
                )}
                {paymentFail && (
                    <div className = "bg-red-500 p-4 text-white mb-2 rounded-xl"> 
                        <h2 className = "text-lg">
                            Your order has been Failed!
                        </h2>
                    </div>
                )}                
                { children }
            </div>
            <Footer />
        </div>
    )
}