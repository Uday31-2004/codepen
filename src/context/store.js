// import { legacy_createStore as createStore } from "redux";
// import myReducer from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";
// import { UserAuthInput } from "../components";
import userAuthReducer from "./reducers/userAuthReducer";
import userSlice from "./slice/userSlice";

export default configureStore({
    reducer: {
        user: userSlice
    }
})


// const Store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// export default Store;