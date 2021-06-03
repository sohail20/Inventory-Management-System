import {combineReducers} from "redux"
import FetchReducer from "./FetchReducer"
import PostReducer from "./PostReducer"
import DeleteReducer from "./DeleteReducer"
const AllReducers = combineReducers({
    FetchReducer,
    PostReducer,
    DeleteReducer
})

export default AllReducers