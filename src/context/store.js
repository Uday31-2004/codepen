// import { legacy_createStore as createStore } from "redux";
// import myReducer from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";
// import { UserAuthInput } from "../components";
import userSlice from "./slice/userSlice";
import  projectSlice  from "./slice/projectSlice";
import searchSlice from "./slice/searchSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        project: projectSlice,
        search: searchSlice
    }
})


// const Store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// export default Store;