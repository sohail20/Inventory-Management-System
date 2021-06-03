const Datastore = require("nedb")
const path = require("path")
const FETCH_REQUEST = ()=>{
    return{
        type:"FETCH_REQUEST"
    }
}

const FETCH_REQUEST_SUCCESS = (val)=>{
    return {
        type:"FETCH_REQUEST_SUCCESS",
        payload:val
    }
}

const FETCH_REQUEST_FAIL = (err)=>{
    return{
        type:"FETCH_REQUEST_FAIL",
        error:err
    }
}

export const FetchData = (table)=>{
    
    return (dispatch)=>{
        
        dispatch(FETCH_REQUEST)
        
        const database = new Datastore({
            filename:path.join(__dirname, `./db/${table}`),
            autoload:true,
            onload:(err)=>{
                if(err){
                 dispatch(FETCH_REQUEST_FAIL(err.message)) 
                }
                database.find({},(err,result)=>{
                    dispatch(FETCH_REQUEST_SUCCESS(result))
                })
            },
            timestampData:true,
        })
        database.loadDatabase()
        setTimeout(()=>{            
        },1000)
    }
}