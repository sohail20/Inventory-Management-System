const initialState = {
    loading:false,
    data:[],
    error:""
}

const DeleteReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "DELETE_REQUEST":
            return {
                ...state,
                loading:true,
            }

        case "DELETE_REQUEST_SUCCESS":
            return {
                ...state,
                loading:false,
                data:action.payload,
                error:""
            }

        case "DELETE_REQUEST_FAIL":
            return {
                ...state,
                loading:false,
                data:[],
                error:action.error
            }
    
        default:
            return state;
    }
}

export default DeleteReducer