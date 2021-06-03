import React, { useEffect,useState } from 'react';
import {Box, Table, Typography, TableHead, TableRow,TableCell, TableBody} from "@material-ui/core"
const path = require("path")
var Datastore = require('nedb'), db = new Datastore({
    filename:path.join(__dirname, `./db/Sells.db`),
    autoload:true,
    timestampData:true,
  });

function InvoicePrint(props) {
    const {invoice} = props
    const [Data, setData] = useState([]);
    const obj = {}
    useEffect(()=>{
        db.find({_id:invoice[0]},function(err,val){
            if(err){
                alert(err.message);
                return;
            }
            setData(val)
        })  
    },[invoice])
    return (
        <div>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell >{historyRow.value}</TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
        </div>
    );
}

export default InvoicePrint;