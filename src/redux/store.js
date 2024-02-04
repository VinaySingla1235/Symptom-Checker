import { configureStore } from "@reduxjs/toolkit";
import userDetailsReucer from "./reducers/userDetailsSlice"
export const store=configureStore({
    reducer:{
        userDetails:userDetailsReucer
    }
})