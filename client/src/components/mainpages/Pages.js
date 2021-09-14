import React, { useCallback, useContext } from 'react';
import { Switch,Route } from 'react-router-dom';
import Products from './products/Product';
import Cart from './cart/Cart';
import Login from './auth/Login';
import Register from './auth/Register';
import Notfound from './utils/NotFound/Notfound';
import DetailProduct from './detailProduct/DetailProduct';
import { GlobalState } from '../../GlobalState';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
export default function Pages(){
    const state = useContext(GlobalState)
    const [isLogged] = state.UserApi.isLogged
    const [isAdmin] = state.UserApi.isAdmin
    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/details/:id" exact component={DetailProduct}/>
            
            <Route path="/login" exact component={isLogged? Notfound :  Login}/>
            <Route path="/register" exact component={isLogged? Notfound :  Register }/>
            <Route path="/category" exact component={!isAdmin? Notfound :  Categories }/>
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : Notfound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : Notfound} />
            <Route path="/cart" exact component={Cart}/>
            <Route path="/history" exact component={!isLogged?Notfound: OrderHistory}/>
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : Notfound} />
            <Route path="*" exact component={Notfound}/>
        </Switch>
        
    )
}