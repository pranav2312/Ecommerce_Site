import React,{ useContext,useEffect,useState } from "react";
import {GlobalState} from '../../../GlobalState'
import ProductItem from "../utils/ProductItem/ProductItem";
import Loading from '../utils/loading/Loading'
import axios from "axios";
import Filters from "./Filter"
import LoadMore from "./LoadMore";
function Recommand(params) {
    const state = useContext(GlobalState)
    
    const [isAdmin] = state.UserApi.isAdmin
    const [token] = state.token
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category] = state.ProductsApi.category
    const [sort] = state.ProductsApi.sort
    const [search] = state.ProductsApi.search
    const [page] = state.ProductsApi.page
    const [result,setResult] = useState(0)
    
    useEffect(() =>{
        const getProducts = async () => {
            console.log("category")
            const res = await axios.get(`/api/recommand?limit=${page*9}&${category}&${sort}&title[regex]=${search}` ,{
                headers: {Authorization: token}
            }
            )
            //console.log(res)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()
    },[callback, category, sort, search, page,token])
    


    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const addcountService = async(id) =>{
        
    }
    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        {/* <Filters />
         */}
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} addcountService={addcountService} />
                })
            } 
        </div>
        <LoadMore/>
        { products.length === 0 && <Loading/>}    
        </>
    )
}
export default Recommand;