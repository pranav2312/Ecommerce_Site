import React from 'react';
import { Switch,Route } from 'react-router-dom';
import Products from './products/Product';
import Cart from './cart/Cart';
import Login from './auth/Login';
import Register from './auth/Register';
import Notfound from './utils/NotFound/Notfound';
import DetailProduct from './detailProduct/DetailProduct';
 export default function Pages(){
    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/details/:id" exact component={DetailProduct}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="*" exact component={Notfound}/>
        </Switch>
        
    )
}