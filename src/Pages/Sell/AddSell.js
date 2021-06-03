import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Container,TextField,Paper,TableRow, TableCell,Table,TableContainer,TableBody} from "@material-ui/core"
import Tags from '../../Components/SelectPicker/SelectPicker';
import QuantityTable from "../../Components/Table/QuantityTable"
import {useDispatch,useSelector} from "react-redux"
import { FetchData } from '../../Store/Store/Actions/Actions';
import Steps from "../../Components/Steps/Steps"
import { postData } from '../../Store/Store/Actions/PostAction';
const date = new Date()
const createData = (title,price,purchase)=>{
    return{
        title:title,
        price:price,
        purchase:purchase
    }
}

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
function AddSell(props) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const state = useSelector(state=>state.FetchReducer)
    const [Data, setData] = useState([]);
    const [Review, setReview] = useState({});
    const [CustomerName, setCustomerName] = useState("No name");
    const [CurrentDate, setCurrentDate] = useState((date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+date.getDate()).toString());
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    const selecthandle = (val)=>{
        setData(val)
    }
    useEffect(()=>{
        dispatch(FetchData("Products.db"))
    },[])

    const Items = [];

    state.data.map((row)=>{
        Items.push(createData(row.ItemName,row.SellPrice,row.PurchasePrice))
    })

    const getSteps =() =>{
        return ['Select Products', 'Quantity', 'Review','Data sent'];
      }

      const dataTable = (val)=>{
        setReview(val)
        console.log(val)
      }

      console.log(CurrentDate)
    const getStepContent=(stepIndex)=> {
        switch (stepIndex) {
          case 0:
            return (
            <>
            <Paper style={{padding:10}}>
                <Tags selecthandle={selecthandle} data={Items}/>
            </Paper>
            </>
            );
          case 1:
            return (
                <QuantityTable data={Data} dataTable={dataTable}/> 
            );
          case 2:
            return (
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table" size="small">
                  <TableBody>
                  {Object.keys(Review).map((val)=>(
                <>
                    {
                    val!=="default"?
                    <>
                    <TableRow>
                        <TableCell item>
                            {val}
                        </TableCell>
                        <TableCell item>
                        {Review[val].value}
                        </TableCell>
                        <TableCell item>
                        {Review[val].price}
                        </TableCell>
                    </TableRow>
                    </>:<></>
                    }
                </>
                ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
            case 3:
              return (
                dispatch(postData({...Review,name:CustomerName,defaultDate:CurrentDate,month:month[new Date(CurrentDate).getMonth()]+"-"+new Date(CurrentDate).getFullYear()},"Sells.db"))
               );
          default:
            return 'Unknown stepIndex';
        }
      }
      
      return (
        state.loading?<p>Loading...</p>:
        <Container>
            <Grid container spacing={3} style={{height:200}}>
                <Grid item xs>
                    <TextField required id="Name" type="text" label="Customer Name" onChange={(val)=>{setCustomerName(val.target.value)}}/>
                </Grid>
                <Grid item xs style={{textAlign:"right"}}>
                    <TextField
                    id="outlined-number"
                    label="Invoice Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    />
                    <br></br>
                    <TextField
                    id="outlined-number"
                    label="Invoice Date"
                    defaultValue={CurrentDate}
                    type="Date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    style={{marginTop:10}}
                    onChange={(val)=>{
                      setCurrentDate(val.target.value)
                    }}
                    />                      
                </Grid>
            </Grid>

            <Steps getSteps={getSteps} getStepContent={getStepContent}/>

        </Container>
    );
}

export default AddSell;