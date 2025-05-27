import { createSlice } from "@reduxjs/toolkit";

const serialSlice= createSlice({
    name:"serial",
    initialState:{
        serialNumber: null,
    },
    reducers:{
        setSerialNumber:(state,action)=>{
            state.serialNumber=action.payload;
        }
    }
});

export const{setSerialNumber}=serialSlice.actions;

export default serialSlice.reducer;