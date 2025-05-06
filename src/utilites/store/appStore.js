
import { configureStore } from "@reduxjs/toolkit";

import serialReducer from './slices/serialSlice'
import policyReducer from './slices/policySlice'
import applicationsReducer from './slices/applicationsSlice'
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