
import { configureStore } from "@reduxjs/toolkit";

import serialReducer from './slices/serialSlice'
import policyReducer from './slices/policySlice'
import applicationsReducer from './slices/applicationsSlice'
import devicesReducer from './slices/devicesListSlice'
import contentListReducer from './slices/contentListSlice'
const appStore = configureStore(
    {
        reducer:{
           serial:serialReducer,
           policy: policyReducer,
           applications: applicationsReducer,
           devicesList: devicesReducer,
           contentList: contentListReducer,
        },
        
    }
)

export default appStore;