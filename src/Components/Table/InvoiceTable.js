import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Button} from '@material-ui/core';
import Tags from '../SelectPicker/SelectPicker';
import swal from "sweetalert"

const TAX_RATE = 0.07;
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }


export default function InvoiceTable(props) {
    const {data,Review} = props
    const classes = useStyles();
    const [Price, setPrice] = useState(1);
    const [steps, setSteps] = useState({
      default:{
        value:1
      }
    });


  
    const rows = [];
    console.log(Review)
    const [Total, setTotal] = useState(ccyFormat(subtotal(rows)) );
    var invoiceSubtotal = subtotal(rows);
  
    console.log(steps);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table" size="small">
        <TableHead>
          <TableRow>
          </TableRow>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">       
                <TextField value={typeof steps === "number"?steps:steps[row.desc] && steps[row.desc].value} style={{width:20,borderBottom:"none"}} onChange={(val)=>{
                   setPrice(val.target.value)
                   setSteps({
                     ...steps,
                     [val.target.name]: {
                       value: val.target.value,
                       price: val.target.value*row.price
                     }
                   });
                   let prices = []
                   rows.map((data)=>{
                     prices.push(val.target.value*data.price)
                   })
                   console.log(prices)
                   setTotal(prices.reduce((a, b) => a + b, 0))
                }} name={row.desc}/>
              </TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{typeof steps === "number"?steps*row.price:steps[row.desc] && steps[row.desc].price}</TableCell>
            </TableRow>
          ))}
          <TableRow style={{marginTop:20}}>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{Total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{Total }</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
