import React, {useEffect,useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {Grid,Typography,Paper} from "@material-ui/core"
const path = require("path")
var Datastore = require('nedb'), db = new Datastore({
  filename:path.join(__dirname, `./db/Deliveries.db`),
  autoload:true,
  timestampData:true,
});

const createData = (month,amount)=>{
  return {
    name: month, Deliveries:amount, amt: 0,
  }
}

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}


const date  = new Date()
export default function DeliveryLineChart() {
    const [ChartLoading, setChartLoading] = useState(true);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const [dataset, setdataset] = useState([]);
    const [Annual, setAnnual] = useState([]);
    let amount = []
    let data2 = []
    useEffect(()=>{
      month.map((value)=>{
          db.find({month: value+"-"+date.getFullYear()}, function (err,docs){ 
            if(err){
              alert(err.message)
              return;
            }
            const sumation = [];

            docs.map((data)=>{
                Object.keys(data).map((value)=>{
                  if(value !== "DateDelivery" && value !== "ItemName" && value !== "Quanity" && value !== "Price"&& value !== "Note"&& value !== "month"&& value !== "_id"&& value !== "createdAt"&& value !== "updatedAt"){
                    sumation.push(data[value])
                  }
                })
            })
            amount.push(sumation.reduce((a, b) => a + b, 0))
          });
      })
      setTimeout(()=>{
        amount.map((value,index)=>{
          data2.push(createData(month[index],value) )
        })
      },300)
      setTimeout(()=>{
        setAnnual(amount)
        setdataset(data2)
        setChartLoading(false)
      },500)
    },[])

    return (
      <>
      {
        ChartLoading?<p>Loading...</p>:
        <>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Paper style={{padding:10}}>
              Annual Deliveries
              <Typography variant="h4" component="h4" gutterBottom style={{textAlign:"center"}}>
                Rs. {ccyFormat(Annual.reduce((a,b)=>a+b,0))}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>

            <LineChart
            width={1150}
            height={300}
            data={dataset}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Deliveries" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </>
      }
      </>
    );
  
}
