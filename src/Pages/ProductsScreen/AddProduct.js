import React,{useState} from 'react';
import {Container,Grid,TextField,Button,TextareaAutosize} from "@material-ui/core"
import {ButtonColor} from "../../Theme/Theme"
import swal from "sweetalert"
import {useDispatch,useSelector} from "react-redux"
import { postData } from '../../Store/Store/Actions/PostAction';
function AddProduct(props) {
    const [Date, setDate] = useState("");
    const [ItemName, setItemName] = useState("");
    const [PurchasePrice, setPurchasePrice] = useState("");
    const [SellPrice, setSellPrice] = useState("");
    const [Profit, setProfit] = useState("");
    const [Note, setNote] = useState("");

    const dispatch = useDispatch()
    const state = useSelector(state=>state.PostReducer)
    const validate = ()=>{
        if(Date&&ItemName&&PurchasePrice&&SellPrice){
            let profit = SellPrice - PurchasePrice 
            setProfit(profit)
            if(PurchasePrice>SellPrice)
                swal("Alert!","Your purchase price is greater than sell price","warning")
            else{
                dispatch(postData({
                    Date,
                    ItemName,
                    PurchasePrice,
                    SellPrice,
                    profit,
                    Note
                },"Products.db"))                
            }
        }else{
            swal("Alert!","Please fill all the fields","warning")
        }
    }

 
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField required id="Date" type="date" style={{ width: "100%",marginTop:15 }}  onChange={(val)=>{setDate(val.target.value)}}/>
                </Grid>

                <Grid item xs>
                    <TextField required id="Item Name" style={{ width: "100%" }} label="Item Name" onChange={(val)=>{setItemName(val.target.value)}}/>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField required id="Purchase Price" type="number" style={{ width: "100%" }} label="Purchase Price" onChange={(val)=>{setPurchasePrice(val.target.value)}}/>
                </Grid>

                <Grid item xs>
                    <TextField required id="Sell Price" type="number" style={{ width: "100%" }} label="Sell Price" onChange={(val)=>{setSellPrice(val.target.value)}}/>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField required id="Profit" disabled={true} value={Profit} style={{ width: "100%" }} label="Profit"/>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextareaAutosize aria-label="minimum height" rowsMin={4} placeholder="Note" style={{ width: "100%" }} onChange={(val)=>{setNote(val.target.value)}}/>
                </Grid>
            </Grid>
            <div>
                <Button variant="contained" disabled={!state.loading} color={ButtonColor} style={{marginTop:20}} onClick={validate}>Save</Button>
            </div>
        </Container>
    );
}

export default AddProduct;