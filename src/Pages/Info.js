import React from 'react';
import {Paper,Grid, Typography} from "@material-ui/core"
function Info(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Paper style={{textAlign:"center",padding:10}}>
                    {console.log(__dirname+"myInventory.ico")}
                    <img src={__dirname+"myInventory.ico"} width="100"></img>
                    <Typography variant="h4" component="h4">
                        My Inventory
                    </Typography>
                    <Typography variant="caption">
                    My Inventory helps you to discover How to Automate Processes, Impress Customers, Empower Employees & Create Revenue. 
                    Fast Implementation And A Solution That Will Fit Your Business Now And In The Future. 
                    Request a Quote. View Capabilities. Explore TheCodeMe®. Unify Your Business. 
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    );
}

export default Info;