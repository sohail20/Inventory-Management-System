import React,{useState} from 'react';
import {Container,Grid,TextField,Button,TextareaAutosize} from "@material-ui/core"
import {Autocomplete} from "@material-ui/lab"
import { ButtonColor } from '../../Theme/Theme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchData } from '../../Store/Store/Actions/Actions';
import swal from "sweetalert"
import { postData } from '../../Store/Store/Actions/PostAction';

const createData = (title,price)=>{
    return{
        title:title,
        price:price
    }
}

function AddDeliveryScreen(props) {
    const dispatch = useDispatch()
    const state = useSelector(state=>state.FetchReducer)
    const [DateDelivery, setDateDelivery] = useState("");
    const [ItemName, setItemName] = useState("");
    const [Quanity, setQuanity] = useState(0);
    const [Price, setPrice] = useState(0);
    const [Note, setNote] = useState("");
    const [TotalAmount, setTotalAmount] = useState(0);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(()=>{
        dispatch(FetchData("Products.db"))
    },[])
    
    
    useEffect(()=>{
        setTotalAmount(Quanity*Price)
    },[Quanity,Price])
    


    const Items = [];

    state.data.map((row)=>{
        Items.push(createData(row.ItemName,row.SellPrice))
    })

    const validation = ()=>{
        if(ItemName && Quanity && Price){
            dispatch(postData({
                DateDelivery,
                ItemName,
                Quanity,
                Price,
                Note,
                TotalAmount,
                month:month[new Date(DateDelivery).getMonth()]+"-"+new Date(DateDelivery).getFullYear()
            },"Deliveries.db"))
        }else{
            swal("Alert!","please fill all the fields")
        }
    }
    return (
        <Container>
            {
                state.loading?<p>Loading...</p>:
                <>
                <Grid container spacing={3}>
                <Grid item xs>
                    <TextField required id="Date" type="date" style={{ width: "100%",marginTop:15 }} onChange={(val)=>{
                        setDateDelivery(val.target.value)
                    }} />
                </Grid>

                <Grid item xs>
                <Autocomplete
                    id="combo-box-demo"
                    options={Items}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Select Item"/>}
                    onSelect={(val)=>{setItemName(val.target.value)}}
                    /> 
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField required id="Quantity" type="number" style={{ width: "100%" }} label="Quantity" onChange={(val)=>{setQuanity(val.target.value)}}/>
                </Grid>

                <Grid item xs>
                    <TextField required id="Price" type="number" style={{ width: "100%" }} label="Price per piece" onChange={(val)=>{setPrice(val.target.value)}} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextField required id="Price" value={TotalAmount} disabled={true} type="number" style={{ width: "100%" }} label="Total amount" onChange={(val)=>{setPrice(val.target.value)}} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextareaAutosize aria-label="minimum height" rowsMin={4} placeholder="Note" style={{ width: "100%" }} onChange={(val)=>{setNote(val.target.value) }}/>
                </Grid>
            </Grid>
            <div>
                <Button variant="contained" color={ButtonColor} style={{marginTop:20}} onClick={validation}>Save</Button>
            </div>
            </>
            }
        </Container>
    );
}

export default AddDeliveryScreen;