
import { configureStore } from "@reduxjs/toolkit";

import serialReducer from './serialSlice'
import policyReducer from './policySlice'
import applicationsReducer from './applicationsSlice'
const appStore = configureStore(
    {
        reducer:{
           serial:serialReducer,
           policy: policyReducer,
           applications: applicationsReducer,
        },
        
    }
)

export default appStore;