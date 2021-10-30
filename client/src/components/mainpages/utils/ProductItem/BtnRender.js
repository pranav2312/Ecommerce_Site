import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
function BtnRender({product,deleteProduct,addcountService}) {
    const state = useContext (GlobalState)
   
    const [isAdmin] = state.UserApi.isAdmin
    const addCart = state.UserApi.addCart
    return (
        <div className="row_btn"> 
        {
            isAdmin?<>
            <Link id="btn_buy" to="#!" onClick={()=>deleteProduct(product._id,product.images.public_id)}>
            Delete    </Link>
            <Link id="btn_view" to={`/edit_product/${product._id}`}>Edit</Link></>:<>
            <Link id="btn_buy" to="#!" onClick={()=>addCart(product)}>
               Request    </Link>
            <Link id="btn_view" to={`/details/${product._id}`} onClick={()=>addcountService(product._id)}>View</Link></>
        }     
            
        </div>
       
    )
}

export default BtnRender
