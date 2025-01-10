'use client'
import { useEffect, useState } from "react";
import Products from "@/components/Products";
import Layout from "@/components/layout";

export default function Home() {

    const [productsInfo,setProductsInfo] = useState([]);
    const [search,setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const url = '/api';

    useEffect( () => {    
      const fetchData = async() => {     
        try { 
          const res = await fetch(url);        
          const data = await res.json(); 
          setProductsInfo( data );
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }, []);
  
    const categoriesNames = [ ...new Set(productsInfo.map(p => p.category)) ]       

    let product = '';
    if(search) {
      product = productsInfo.filter( p => p.name.toLowerCase().includes(search) )
    } else {
      product = productsInfo;
    }

    return (
        <Layout>
          {loading && (
              <div className = "h-screen flex justify-center items-center font-bold">
                <p>Loading Products...</p>
              </div>
          )}
          {!loading && (
          <div>
            <div className = "border-b-4 border-emerald-500 mb-2 xs:flex-col lg:flex-row flex justify-between items-center pt-2 pb-4">
              <h2 className="font-semibold text-3xl xs:mb-3 lg:mb-0">QuickCart</h2>
              <input value={search} onChange={e => setSearch(e.target.value)} type="" placeholder="Search for Products..." className="bg-gray-100 py-2 px-2 rounded-xl w-4/5"/>
            </div>
            <div>              
              {!product.length && (
                <div className="flex justify-center items-center h-screen">
                  <h2 className="-mt-32">No Product's</h2>
                </div>
              )}
              {categoriesNames.map((categoriesName,index) => (
                <div key={index} className="">
                  {product.find(p => p.category == categoriesName) && (
                    <div>
                      <h2 className="text-2xl capitalize mb-3 sm:text-left text-center">{categoriesName}</h2>
                      <div className="md:flex -mx-5 md:justify-between md:flex-row flex flex-wrap justify-center sm:justify-between sm:flex-row ">
                        {product
                          .filter((product) => product.category === categoriesName)
                          .map((productInfo) => (
                            <div key={productInfo._id} className="px-5 snap-start">
                              <Products  {...productInfo} />
                            </div>
                        ))}                   
                      </div>                      
                    </div>
                  )}
                </div>
              ))}        
            </div>   
          </div>
          )}
        </Layout>   
    );
  }

