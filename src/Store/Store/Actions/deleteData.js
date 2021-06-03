import swal from "sweetalert"
const Datastore = require("nedb")
const path = require("path")
const DELETE_REQUEST = ()=>{
    return{
        type:"DELETE_REQUEST"
    }
}

const DELETE_REQUEST_SUCCESS = (val)=>{
    return {
        type:"DELETE_REQUEST_SUCCESS",
        payload:val
    }
}

const DELETE_REQUEST_FAIL = (err)=>{
    return{
        type:"DELETE_REQUEST_FAIL",
        error:err
    }
}

export const deleteData = (data,table,isInvoice = false)=>{
    
    return (dispatch)=>{
        
        dispatch(DELETE_REQUEST)
        
        const database = new Datastore({
            filename:path.join(__dirname, `./db/${table}`),
            autoload:true,
            timestampData:true,
        })
        if(data){

            if(isInvoice){

                data.map((val)=>{
                    return database.remove({_id:val},{},function(err,numRemoved){
                        if(err){
                            swal("Alert!",err.message,"warning")
                            DELETE_REQUEST_FAIL(err.message)
                        }
                        else{
                            swal("Removed","successfully","success")
                            DELETE_REQUEST_SUCCESS(numRemoved)
                        }    
                            
                    })
                })

            }else{

                data.map((val)=>{
                   return database.remove({ItemName:val},{},function(err,numRemoved){
                        if(err)
                            swal("Alert!",err.message,"warning")
                        else    
                            swal("Removed","successfully","success")
                    })
                })

            }
   
        }else{
            database.remove({}, { multi: true }, function (err, numRemoved) {
                swal("Poof! Your data has been deleted!", {
                    icon: "success",
                  });
            });
        }
     
    }
}