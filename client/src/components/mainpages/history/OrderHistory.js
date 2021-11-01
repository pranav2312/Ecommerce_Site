import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import 'hammerjs'
// import {
//     Chart,
//     ChartTitle,
//     ChartLegend,
//     ChartSeries,
//     ChartSeriesItem,
//     ChartSeriesLabels,
//   } from "@progress/kendo-react-charts";
import { Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.UserApi.history
    const [isAdmin] = state.UserApi.isAdmin
    const [token] = state.token
    const [categories] = state.CategoriesApi.categories
    const [products]= state.ProductsApi.products
    const [sold,setSold] = useState([])
    const [val,setVal] = useState(0);
    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    // const findSold=()=>{
    //     setVal(0);
    //     categories.forEach(item => {
    //         setVal(0);
    //          products.forEach(element=>{
    //             if(element.category === item._id){
    //                 setVal(val+1);
    //             }
    //          })
    //          setSold(sold=>[...sold,val])   
    //     });
    //     console.log(sold)
    // }


    
    return (
        <div className="history-page">
           
            <h2>History</h2>

            <h4>You have {history.length} ordered</h4>

            <table>
                <thead>
                    <tr>
                        <th>Service ID</th>
                        <th>Date of Requested</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.ID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                {/* <td><Link to={`/history/${items._id}`}>View</Link></td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
     </div>
    )
}

export default OrderHistory
