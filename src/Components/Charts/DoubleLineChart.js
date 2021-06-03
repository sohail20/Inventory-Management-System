import React, {useEffect,useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {Paper, Typography,Grid} from "@material-ui/core"
const path = require("path")
var Datastore = require('nedb'), db = new Datastore({
  filename:path.join(__dirname, `./db/Sells.db`),
  autoload:true,
  timestampData:true,
});

const createData = (month,amount,profit)=>{
  return {
    name: month, Sell:amount,Profit:profit, amt: 0,
  }
}

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}
const date  = new Date()
export default function DoubleLineChart() {
    const [ChartLoading, setChartLoading] = useState(true);
    const [Annual, setAnnual] = useState([]);
    const [AnnualProfit, setAnnualProfit] = useState([]);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const [dataset, setdataset] = useState([]);

    let amount = []
    let profit = []
    let data2 = []
    useEffect(()=>{


      month.map((value)=>{
          db.find({month: value+"-"+date.getFullYear()}, function (err,docs){ 
            if(err){
              alert(err.message)
              return;
            }
            const sumation = [];
            const profitSumation = []
            docs.map((data)=>{
                Object.keys(data).map((value)=>{
                  if(value !== "default" && value !== "_id" && value !== "createdAt" && value !== "updatedAt"&& value !== "name"&&value !== "defaultDate" && value !== "month"){
                    sumation.push(data[value].price)
                    profitSumation.push(data[value].profit)
                  }
                })
            })
            profit.push(profitSumation.reduce((a, b) => a + b, 0))
            amount.push(sumation.reduce((a, b) => a + b, 0))
          });
      })
      setTimeout(()=>{
        amount.map((value,index)=>{
          data2.push(createData(month[index],value,profit[index]) )
        })
      },300)
      setTimeout(()=>{
        setAnnual(amount)
        setAnnualProfit(profit)
        setdataset(data2)
        setChartLoading(false)
      },400)
    },[])

    return (
      <>
      {
        ChartLoading?<p>Loading...</p>:
        <>
        <Grid container spacing={3}>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <Paper style={{padding:10}}>
              Annual Sell
              <Typography variant="h4" component="h4" gutterBottom style={{textAlign:"center"}}>
                Rs. {ccyFormat(Annual.reduce((a,b)=>a+b,0))}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            
            <Paper style={{padding:10}}>
              Annual Profit
              <Typography variant="h4" component="h4" gutterBottom style={{textAlign:"center"}}>
                Rs. {ccyFormat(AnnualProfit.reduce((a,b)=>a+b,0)) }
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}></Grid>
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
        <Line type="monotone" dataKey="Sell" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Profit" stroke="#82ca9d" activeDot={{ r: 8 }} />

      </LineChart>
      </>
      }
      </>
    );
  
}
