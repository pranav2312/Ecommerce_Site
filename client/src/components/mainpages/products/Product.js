import React,{ useContext,useEffect,useState } from "react";
import {GlobalState} from '../../../GlobalState'
import ProductItem from "../utils/ProductItem/ProductItem";
function Products(params) {
    const state = useContext(GlobalState)
    const [products]= state.ProductsApi.products
    console.log(state)
    return(
        <div className="products">
            {
                products.map(product=>{
                    return <ProductItem key={product._id} product={product}/>
                })
            }    
        </div>
    )
}
export default Products;