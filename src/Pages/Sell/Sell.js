import React, { useEffect,useRef,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SpeedDial from '../../Components/SpeedDial/SpeedDial';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { FetchData } from '../../Store/Store/Actions/Actions';
import AdvanceTable from '../../Components/Table/AdvanceTable';
import { Typography,IconButton } from '@material-ui/core';
import ReactToPrint from "react-to-print"
import { deleteData } from '../../Store/Store/Actions/deleteData';
import swal from "sweetalert"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const createdData2 = (name,value,price)=>{
  return {
    name,
    value,
    price
  }
}
function createData(date, id, name, sum, profit, obj) {
  const history = []
  Object.keys(obj).map((value)=>{

    if(value !== "default" && value !== "_id" && value !== "createdAt" && value !== "updatedAt"&& value !== "name" && value !== "defaultDate" && value!== "month"){
      history.push(createdData2(value,obj[value].value,obj[value].price))
    }
  })
  return {
    date,
    id,
    name,
    sum,
    profit,
    history: history,
  };
}


export default function Sell() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(state=>state.FetchReducer)
  const redirect = (val) => { history.push(val) }
  const [Refresh, setRefresh] = useState(false);
  const componentRef = useRef();

  useEffect(()=>{
    dispatch(FetchData("Sells.db"))
  },[Refresh])
const rows = []
  state && state.data &&
  state.data.map((val)=>{
     const sumation = [];
     const profit = [];

     Object.keys(val).map((value)=>{
        if(value !== "default" && value !== "_id" && value !== "createdAt" && value !== "updatedAt"&& value !== "name"&&value !== "defaultDate"&& value !== "month"){
          profit.push(val[value].profit)
          sumation.push(val[value].price)
        }
        return;
     })
     rows.push(createData(new Date(val["defaultDate"]).toDateString(),val["_id"],val["name"],sumation.reduce((a, b) => a + b, 0),profit.reduce((a, b) => a + b, 0),val) )
     return;
  })


const actions = [
  { icon: <FileCopyIcon />, name: 'Add More', link:"/Add Sell" },
  { icon: <IconButton onClick={()=>{
    
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteData(false,"Sells.db"))
        setRefresh(true)
      } else {
        swal("Your data is safe!");
      }
    });
    
  
  
  }}><DeleteIcon /></IconButton>, name: 'Delete' },
  { icon: <ReactToPrint
    trigger={() => <PrintIcon />}
    content={() => componentRef.current}
  />, name: 'Print' },
];

  return (
    <div className={classes.root}>
      <SpeedDial actions={actions} redirect={redirect}/>
      <Grid container spacing={3}>
        <Grid item xs>
          {/* <EnhancedTable headCells={headCells} rows={rows} title="Sells"/> */}
          {
            state.loading?<p>Loading...</p>:
            <>
            <Typography variant="caption">
              Total Number of Invoices: <b>{state.data.length}</b> 
            </Typography>
            <div ref={componentRef}>
              <AdvanceTable rows={rows} title="Invoice"/>
            </div>
            </>
          }         
        </Grid>
      </Grid>      
    </div>
  );
}
