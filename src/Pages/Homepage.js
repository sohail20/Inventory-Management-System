import React,{useEffect} from 'react';
import {HashRouter as Router,Switch,Route} from "react-router-dom"
import HomeScreen from './HomeScreen/HomeScreen';
import SideNav from '../Components/Sidenav';
import ProductsScreen from "./ProductsScreen/ProductsScreen"
import InvoiceScreen from "./InvoiceScreen/InvoiceScreen"
import Sell from './Sell/Sell';
import AddSell from './Sell/AddSell';
import AddProduct from './ProductsScreen/AddProduct';
import AddDeliveryScreen from './DeliveryScreen/AddDeliveryScreen';
import DeliveryScreen from './DeliveryScreen/DeliveryScreen';

//REDUX STORE
import {useDispatch,useSelector} from "react-redux"
import { FetchData } from '../Store/Store/Actions/Actions';
import Info from './Info';
function Homepage(props) {
    const dispatch = useDispatch()
    const data = useSelector(state=>state.FetchReducer)
    
    useEffect(()=>{
        dispatch(FetchData())
    },[])

    console.log(data)
    return (
        data.loading?<p>Loading...</p>:
        <Router>
            <SideNav>
            <Switch>
                <Route exact path="/" component={HomeScreen}/>

                <Route path="/Products" component={ProductsScreen}/>
                <Route path="/Add Product" component={AddProduct}/>

                <Route path="/Delivery" component={DeliveryScreen}/>
                <Route path="/Add Delivery" component={AddDeliveryScreen}/>


                <Route path="/Invoices" component={InvoiceScreen}/>
                <Route path="/Info" component={Info}/>

                <Route path="/Sell" component={Sell}/>
                <Route path="/Add Sell" component={AddSell}/>
            </Switch>
            </SideNav>
        </Router>
    );
}

export default Homepage;