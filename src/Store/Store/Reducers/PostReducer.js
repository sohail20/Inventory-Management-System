const initialState = {
    loading:true,
    error:""
}

const PostReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "POST_REQUEST":
            return {
                ...state,
                loading:true,
            }

        case "POST_REQUEST_SUCCESS":
            return {
                ...state,
                loading:false,
                error:""
            }

        case "POST_REQUEST_FAIL":
            return {
                ...state,
                loading:false,
                error:action.error
            }
    
        default:
            return state;
    }
}

export default PostReducer