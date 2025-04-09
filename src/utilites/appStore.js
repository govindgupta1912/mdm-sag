
import { configureStore } from "@reduxjs/toolkit";

import serialReducer from './serialSlice'

const appStore = configureStore(
    {
        reducer:{
           serial:serialReducer,
        }
    }
)

export default appStore;