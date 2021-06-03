import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField} from '@material-ui/core';


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

function createRow(desc, qty, unit,purchase) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price,purchase };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }


export default function InvoiceTable(props) {
    const {data,dataTable} = props
    const classes = useStyles();
    const [steps, setSteps] = useState({
      default:{
        value:1
      }
    });

    useEffect(()=>{
        dataTable(steps)
    },[steps])
  
    const rows = [];
    data.map((val)=>{
        rows.push(createRow(val.title,1,val.price,val.purchase))
    })    

//    const [setTotal] = useState(ccyFormat(subtotal(rows)) );

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table" size="small">
        <TableHead>
          <TableRow>
          </TableRow>
          <TableRow>
            <TableCell>Item</TableCell>            
            <TableCell >Price</TableCell>
            <TableCell>Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>       
                <TextField value={typeof steps === "number"?steps:steps[row.desc] && steps[row.desc].value} style={{width:20,borderBottom:"none"}} onChange={(val)=>{
                   setSteps({
                     ...steps,
                     [val.target.name]: {
                       value: val.target.value,
                       price: val.target.value*row.price,
                       profit: val.target.value*(row.price -  row.purchase)
                     }
                   });
                   let prices = []
                   rows.map((data)=>{
                     prices.push(val.target.value*data.price)
                   })
                  /*  setTotal(prices.reduce((a, b) => a + b, 0)) */
                }} name={row.desc}/>
              </TableCell>
              <TableCell align="right">{typeof steps === "number"?steps*row.price:steps[row.desc] && steps[row.desc].price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
