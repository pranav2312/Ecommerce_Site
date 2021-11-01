import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import { GlobalState } from '../../../GlobalState'
import PaypalButton from './PaypalButton'
//import 'bootstrap/dist/css/bootstrap.min.css';
function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.UserApi.cart
    // const [total, setTotal] = useState(0)
    const [callback, setCallback] = state.UserApi.callback
    const [token] = state.token

    const [description,setDescription ] = useState("xyz")
    
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart: cart }, {
            headers: { Authorization: token }
        }

        )
    }
    // const increment = async (id) => {
    //     cart.forEach(item => {
    //         if (item._id === id)
    //             item.quantity += 1
    //     });
    //     setCart([...cart])
    //     addToCart(cart)
    // }
    const handleChangeInput = e =>{
        console.log(description)
        const value = e.target.value
        setDescription(value)
    }

    const removeServices = (id) => {
        if (window.confirm("Do you realy want to remove this Services from your cart?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
        }
        addToCart(cart)
    }
    const RequestSuccess = async (service) => {

        const {ID,sold} = service
        await axios.post('/api/payment', {description,ID,sold}, {
            headers: { Authorization: token }
        })
        console.log(cart)
        cart.forEach((item, index) => {
            if (item._id === ID) {
                cart.splice(index, 1)
            }
        })
        setCart(cart)
        addToCart(cart)
        alert("You have successfuly placed an order. ")
        setCallback(!callback)
    }
    
    // useEffect(() => {

    //     const getTotal = () => {
    //         const total = cart.reduce((prev, item) => {
    //             return prev + (item.price * item.quantity)
    //         }, 0)
    //         //console.log(total)
    //         // setTotal(total)
    //     }
    //     getTotal()

    // }, [cart])
    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    return (

        <div >
            {
                cart.map(Services => (
                    <>

                        <div className="detail cart" key={Services._id}>

                            <img src={Services.images.url} alt="" className="img_container" />
                            <div className="box-detail">
                                <h2>{Services.title}</h2>

                                {/* <h3>${Services.price * Services.quantity}</h3> */}
                                <p>{Services.description}</p>
                                <p>{Services.content}</p>
                                {/* <div className="amount">
                                <button onClick={()=>decrement(Services._id)}>-</button>
                                <span>{Services.quantity}</span>
                                <button onClick={()=>increment(Services._id)}>+</button>

                            </div> */}

                                <p>Email: {Services.email}</p>
                                <p>MobileNo: {Services.mobileno}</p>
                                <form onSubmit={()=>RequestSuccess({ID:Services._id,sold:Services.sold})} >
                                    <textarea className="form_text" name="description"  value={description} rows="5" onChange={(event)=>handleChangeInput(event)}/><br/>
                                    <input className="btn btn-primary" type="Submit" value="request" name="submit"></input>
                                </form>
                            </div>

                            <div className="delete" onClick={() => removeServices(Services._id)}>x</div>

                        </div>

                    </>

                ))
            }
            {/* <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton total={total} transSuccess = {transSuccess}/>
            </div> */}

        </div>
    )
}

export default Cart
