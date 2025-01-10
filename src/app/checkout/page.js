'use client'
import { ProductsContext } from "@/components/ProductContext";
import Layout from "@/components/layout";
import { useContext, useEffect, useState } from "react";
export default function Checkout() {
    const [ productInfos, setProductsInfos ] = useState([]);

    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ address, setAddress ] = useState('');    
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ pincode, setPincode ] = useState('');
    const [ phoneNo, setPhoneNo ] = useState('');  
  
    
    useEffect( () => {
        const fetchData = async() => {
            try {
                let uniIds = [...new Set(selectedProducts)];                
                if(uniIds?.length) { 
                    const res = await fetch(`/api/checkout?ids=${ uniIds.join(',') }`,{
                        method:"GET",
                    })
                    const data = await res.json();
                    setProductsInfos(data);   
                } 
                else {
                    setProductsInfos([]);
                }
            } catch(e) {
                console.log(e);
            }        
        }
        fetchData();
    }, [selectedProducts]);       

    const moreOfThisProduct = (id) => {
        setSelectedProducts( (pre) => [ ...pre,id ] );
    }
    const lessOfThisProduct = (id) => {
        const pos = selectedProducts.indexOf(id);
        if(pos !== -1) {
            setSelectedProducts( (pre) => {
                return pre.filter((value,index) => index !== pos);
            });
        }
    }

    let delivery = 0;
    let SubTotal = 0; 
    if( selectedProducts?.length ) {
        for(let id of selectedProducts) {
            const product  = ( productInfos.find(p => p._id === id) );
            if (product && product.price) {
                SubTotal += Number(product.price); 
            }            
        }
    }
    let total = SubTotal + delivery;

    const handleSubmit = async() => {
        const formData = {
            name,
            email,
            address,
            city,
            state,
            pincode,
            phoneNo,
            value:1,
            delivery: delivery,
            products: selectedProducts,
        }
        try {
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                })
        } catch(e) {
            console.log(e)
        }
    }

    return(
        <Layout>
            {!productInfos.length && (
                <div className = "h-screen flex justify-center items-center "> No Product in your shopping cart. </div>
            )}
            {productInfos.length && (
                <div className="w-full bg-gray-200 mb-3 p-3 flex justify-between">
                    <h1>shopping</h1>
                    <h2 className="font-medium">Items: {selectedProducts.length}</h2>            
                </div>
            )}
            {productInfos.length > 0 && productInfos.map( productInfo => (
                <div className = "flex mb-5" key = {productInfo._id}>
                    <div className = "bg-gray-100 p-3 rounded-xl w-28 shrink-0">
                        <img src = {productInfo.picture} alt = {productInfo.name} className="h-full object-contain" />
                    </div>
                    <div className = "pl-4">
                        <h1 className = "font-bold text-lg"> {productInfo.name} </h1>
                        <p className = "text-sm"> {productInfo.specs} </p>
                        <div className = "flex">
                            <span className = "grow font-medium">Rs. {productInfo.price} </span>
                            <div>
                                <button onClick={() => lessOfThisProduct( productInfo._id)} className = "bg-emerald-500 px-2 text-white rounded-lg w-7 h-6">-</button>
                                <span> {selectedProducts.filter( id => id === productInfo._id).length} </span>
                                <button onClick={() => moreOfThisProduct(productInfo._id)} className = "bg-emerald-500 px-2 text-white rounded-lg w-7 h-6">+</button>
                            </div>
                        </div>
                    </div>                        
                </div>
            )
            )}
            {productInfos.length > 0 && (
            <div>            
                <div className = "w-full p-2 bg-slate-300 rounded-lg mb-4">
                    <h1 className = "font-bold">Fill Details</h1>
                </div>
                <form onSubmit = {handleSubmit} action = "/api/payment" method = "POST">
                <div>                
                    <input name = "name" value = {name} onChange = {(e) => setName(e.target.value)} className = "bg-gray-100 rounded-xl w-full py-2 px-4 my-1" type = "text" placeholder = "Name" required />
                    <input name = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} className = "bg-gray-100 rounded-xl w-full py-2 px-4 my-1" type = "email" placeholder = "Email" required />
                    <input name = "address" value={address} onChange = {(e) => setAddress(e.target.value)} className = "bg-gray-100 rounded-xl w-full py-2 px-4 my-1" type = "text" placeholder = "Door no, Address, Street" required />
                    <input name = "city" value={city} onChange = {(e) => setCity(e.target.value)} className = "bg-gray-100 rounded-xl w-full py-2 px-4 my-1" type = "text" placeholder = "City" required />
                    <input name = "state" value={state} onChange={(e) => setState(e.target.value)} className = "bg-gray-100 rounded-xl w-full py-2 px-4 my-1" type = "text" placeholder = "State" required />
                    <input name = "pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className = "bg-gray-100 rounded-xl w-full py-2 px-4 my-1" type = "number" placeholder = "Pincode No" required />
                    <input name = "phoneNo" value = {phoneNo} onChange = {(e) => setPhoneNo(e.target.value)} className = "bg-gray-100 rounded-xl w-full py-2 px-4 my-1" type = "number" placeholder = "Phone No" required />
                </div>
                <div>
                    <div className = "flex my-3">
                        <h3 className = "grow font-bold text-gray-500"> SubTotal: </h3>
                        <h3 className = "font-bold">Rs.{SubTotal.toLocaleString()}</h3>
                    </div>
                    <div className = "flex my-3">
                        <h3 className = "grow font-bold text-gray-500">Delivery:</h3>
                        <h3 className = "font-bold">Free</h3>
                    </div>
                    <div className = "flex my-3 border-t-2 border-emerald-500 py-3">
                        <h3 className = "grow font-bold text-gray-500">Total:</h3>
                        <h3 className = "font-bold">Rs.{total.toLocaleString()}</h3>
                    </div>
                </div>
                <div>
                    <input type = "hidden" name = "products" value = {selectedProducts.join(',')}/>
                    <button type = "submit" className = "bg-emerald-500 p-5 text-white px-5 py-2 rounded-lg w-full shadow-emerald-300 shadow-lg"> Pay Rs.{total.toLocaleString()} </button>
                </div>    
                </form>        
            </div> 
            )}
        </Layout>
    )
}