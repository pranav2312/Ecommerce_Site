import axios from 'axios'
import React from 'react'
//import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'
function ProductItem({product, isAdmin,deleteProduct, handleCheck,addcountService}) {
  
    return (
        <div className="product_card">
            {
                isAdmin && <input type = "checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                
                <p>{product.description}</p>
                <div className="row_btn">
                <BtnRender product={product} deleteProduct={deleteProduct} addcountService={addcountService} />
                </div>
            </div>
        </div>
    )
}

export default ProductItem
