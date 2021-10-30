import React, { useContext,useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.UserApi.isLogged
    const [isAdmin] = state.UserApi.isAdmin
    const [cart] = state.UserApi.cart 
    const [menu,setMenu] = useState(false)
    //console.log(state)
    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">create Service</Link></li>
                <li><Link to="/category" >Categories</Link></li>
            </>
        )
    }
    const logoutuser = async()=>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstlogin')
        window.location.href="/";
    }
    //const toggleMenu = ()=>setMenu(!menu)
    const styleMenu = {
        left:menu ? 0: "-100%"
    }
    
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutuser}>LogOut</Link></li>
            </>
        )
    }
    return (
        <header>
            <div className="menu" onClick={()=>setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />

            </div>
            <div className="logo">
                <h1><Link to="/">{isAdmin ? 'Admin' : 'EaSTZone service'}</Link></h1>
            </div>
            <ul style={styleMenu} >
                <li><Link to="/">{isAdmin ? 'Services' : 'Services'}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login / Register</Link></li>

                }
                <li onClick={()=>setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />

                </li>

            </ul>
            {
                isAdmin ? '' 
                :   <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="30" />
                        </Link>
                    </div>
            }

        </header>
    )
}
