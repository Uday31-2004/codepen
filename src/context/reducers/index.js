import userAuthReducer from "./userAuthReducer";
import { combineReducers } from "redux";

const myReducer = combineReducers({
   reducer:{ user: userAuthReducer}
})


export default myReducer