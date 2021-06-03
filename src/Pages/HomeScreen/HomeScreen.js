import React from 'react';
import EmptyCard from "../../Components/Cards/EmptyCard"
import DoubleLineChart from "../../Components/Charts/DoubleLineChart"
import {Button} from "@material-ui/core"
import {Link} from "react-router-dom"
//ICONS
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

//THEME COLORS
import { ButtonColor } from '../../Theme/Theme';
import DeliveryLineChart from '../../Components/Charts/DeliveryChart';


function HomeScreen(props) {

    return (
        <div>
          <Link to="/Add Sell" style={{textDecoration:"none"}}>
            <Button variant="outlined" color={ButtonColor} style={{marginBottom:20,marginRight:10}}>
              <AddTwoToneIcon/> Add Sell
            </Button>
          </Link>
          <Link to="/Add Product" style={{textDecoration:"none"}}>
            <Button variant="outlined" color={ButtonColor} style={{marginBottom:20,marginRight:10}}>
              <AddTwoToneIcon/> Add Product
            </Button>
          </Link>
          <Link to="/Add Delivery" style={{textDecoration:"none"}}>
            <Button variant="outlined" color={ButtonColor} style={{marginBottom:20}}>
              <AddTwoToneIcon/> Add Delivery
            </Button>
          </Link>
          
            <EmptyCard>
                <DoubleLineChart/>
            </EmptyCard>

            <EmptyCard>
                <DeliveryLineChart/>
            </EmptyCard>
        </div>
    );
}

export default HomeScreen;