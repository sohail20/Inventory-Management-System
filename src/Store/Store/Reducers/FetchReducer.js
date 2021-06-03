const initialState = {
    loading:true,
    data:[],
    error:""
}

const FetchReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                loading:true,
            }

        case "FETCH_REQUEST_SUCCESS":
            return {
                ...state,
                loading:false,
                data:action.payload,
                error:""
            }

        case "FETCH_REQUEST_FAIL":
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

export default FetchReducer