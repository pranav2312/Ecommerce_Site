import axios from 'axios'
import React,{createContext,useEffect,useState} from 'react'
import ProductsApi from './api/ProductsApi'
import UserApi from './api/UserApi'
import CategoryApi from './api/CategoryApi'
export const GlobalState = createContext()

export const DataProvider = ({children})=>{
    const [token,setToken] = useState(false)
   
    useEffect(()=>{
        const firstlogin = localStorage.getItem('firstlogin')
        if(firstlogin){
        const refreshToken = async()=>{
            const res = await axios.get('/user/refresh_token')
            //console.log(token)
            //console.log(res)
            setToken(res.data.accesstoken)
            setTimeout(()=>{
                refreshToken()
            },10*60*1000)
        }
        refreshToken()
    }
    },[])
    const state= {
        token : [token,setToken],
        ProductsApi : ProductsApi(),
        UserApi : UserApi(token),
        CategoriesApi: CategoryApi(),
    }
    ProductsApi()
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}