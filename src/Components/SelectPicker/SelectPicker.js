/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
        textAlign: "center",
        marginTop: 10
    },
}));

export default function Tags(props) {
    const { label,selecthandle,data } = props
    const classes = useStyles();
    const setOptions=(values)=>{
        selecthandle(values)
    }
    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                size="small"
                id="tags-standard"
                options={data}
                style={{border:"none"}}
                onChange={ (event, values) =>{ setOptions(values)} }
                getOptionLabel={(option) => option.title}
                //defaultValue={[top100Films[0]]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label={label}
                        placeholder="Select Product"
                    />
                )}
            />
        </div>
    );
}


