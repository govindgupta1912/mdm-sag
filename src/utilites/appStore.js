
import { configureStore } from "@reduxjs/toolkit";

import serialReducer from './serialSlice'
import policyReducer from './policySlice'
const appStore = configureStore(
    {
        reducer:{
           serial:serialReducer,
           policy: policyReducer,
        },
        
    }
)

export default appStore;