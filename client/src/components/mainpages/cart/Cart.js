import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { GlobalState } from '../../../GlobalState'
import PaypalButton from './PaypalButton'
function Cart() {
    const state = useContext(GlobalState)
    const [cart,setCart] = state.UserApi.cart
    const [total,setTotal] = useState(0)
    const [callback,setCallback] = state.UserApi.callback
    const [token] = state.token

    const addToCart = async(cart)=>{
        await axios.patch('/user/addcart',{cart:cart},{
            headers:{Authorization:token}
        }
            
        )
    }
    const increment = async(id) =>{
        cart.forEach(item => {
            if(item._id === id)
                item.quantity += 1
        });
        setCart([...cart])
        addToCart(cart)
    }
    const decrement = async(id) =>{
        cart.forEach(item => {
            if(item._id === id){
                if(item.quantity>0)
                item.quantity -= 1
            }
        });
        setCart([...cart])
        addToCart(cart)
    }
    const removeProduct= (id)=>{
        if(window.confirm("Do you realy want to remove this product from your cart?")){
            cart.forEach((item,index)=>{
                if(item._id===id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
        }
        addToCart(cart)
    }
    const transSuccess = async(payment)=>{
        //console.log(payment)
        const {paymentID,address }= payment
        await axios.post('/api/payment',{cart,paymentID,address},{
            headers:{Authorization: token}
        }) 
        setCart([])
        addToCart([])
        alert("You have successfuly placed an order. ")
        setCallback(!callback)
    }
    useEffect(()=>{
        
        const getTotal = ()=>{
            const total = cart.reduce((prev,item)=>{
                return prev+(item.price * item.quantity)
            },0)
            //console.log(total)
            setTotal(total)
        }
        getTotal()
       
    },[cart])
    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    return (
        <div >
            {
                cart.map(product => (

                    <div className="detail cart" key={product._id}>
                        
                        <img src={product.images.url} alt="" className="img_container" />
                        <div className="box-detail">
                            <h2>{product.title}</h2>
                            <h3>${product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <div className="amount">
                                <button onClick={()=>decrement(product._id)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={()=>increment(product._id)}>+</button>

                            </div>
                            
                          </div>
                          <div className="delete" onClick={()=>removeProduct(product._id)}>x</div>
                    </div>

                ))
            }
            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton total={total} transSuccess = {transSuccess}/>
            </div>

        </div>
    )
}

export default Cart
