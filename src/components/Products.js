import Image from "next/image"
import { useContext } from "react"
import { ProductsContext } from "./ProductContext"

const Products = ({ name, specs, price, picture, _id })=>  {
  const { setSelectedProducts } = useContext(ProductsContext)

  function addProduct() {
    setSelectedProducts( pre => [...pre,_id] );
  }

  return (
    <div className = "w-64 pb-6">
            <div className = "bg-blue-100 p-5 rounded-xl">
              <Image src = {picture} width = {200} height = {200} alt = {name} />
            </div>
            <div className = "mt-1">
              <h3 className = "font-bold text-lg"> {name} </h3>
            </div>
            <p className = "text-sm mt-1 leading-5 text-justify"> {specs} </p>
            <div className = "flex mt-1">
              <p className = "text-2xl font-bold grow">Rs. {price} </p>
              <button onClick = {addProduct} className = "bg-emerald-400 text-white py-1 px-3 rounded-xl">Add to Cart</button>
            </div>
    </div>
  )
}

export default Products