import swal from "sweetalert"
const Datastore = require("nedb")
const path = require("path")
const POST_REQUEST = ()=>{
    return{
        type:"POST_REQUEST"
    }
}

const POST_REQUEST_SUCCESS = (val)=>{
    return {
        type:"POST_REQUEST_SUCCESS",
        payload:val
    }
}

const POST_REQUEST_FAIL = (err)=>{
    return{
        type:"POST_REQUEST_FAIL",
        error:err
    }
}

export const postData = (obj,table)=>{
    
    return (dispatch)=>{
        
        dispatch(POST_REQUEST)
        
        const database = new Datastore({
            filename:path.join(__dirname, `./db/${table}`),
            autoload:true,
            timestampData:true,
        })
        database.loadDatabase()
        database.insert(obj,(err,result)=>{
            if(err){
                swal("Alert!",err.message,"warning")
                dispatch(POST_REQUEST_FAIL(err.message))
            }
            swal("Success","Data added successfully","success")
            dispatch(POST_REQUEST_SUCCESS(result))
        })
    }
}