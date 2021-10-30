import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserApi(token) {
    const [isLogged,setIsLogged]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)
    const [cart ,setCart] = useState([])
    const [history,setHistory] = useState([])
    const [callback,setCallback] = useState(false)
    useEffect(()=>{
        if(token){
            const getUser = async()=>{
                try{    
                    const res = await axios.get('/user/infor',{
                        headers:{Authorization:token}
                    })
                    setIsLogged(true)
                    //console.log(res)
                    res.data.role === 1? setIsAdmin(true):setIsAdmin(false)
                    //console.log(res)
                    setCart(res.data.cart)
                }
                catch(err){
                    alert({msg:err.message})
                }
            }
            getUser()
        }
    },[token])

      const addCart = async(service)=>{
        if(!isLogged) return alert("Please login  to continue buying")
        const check = cart.every(item=>{
            return item._id !== service._id
        })
        if(check){
            setCart([...cart,{...service,quantity:1}])
            await axios.patch('/user/addcart',{cart: [...cart,{...service,quantity:1}]},{
                headers:{Authorization:token}
            })
            alert("This service add to cart. ")
        }
        else {
            alert("This service has been added to cart. ")
        }

    }
    return {
        isLogged:[isLogged,setIsLogged],
        isAdmin:[isAdmin,setIsAdmin],
        cart:[cart,setCart],
        history:[history,setHistory], 
        addCart: addCart,
        callback:[callback,setCallback]
    }
}

export default UserApi
