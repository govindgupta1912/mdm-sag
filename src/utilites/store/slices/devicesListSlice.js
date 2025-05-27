import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchDeviceList = createAsyncThunk(
  'devices/fetchDeviceList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/enrolled_device_list`);
     
      if (response.status) {
         console.log("device api response;-", response.data.device_list);
        return response.data.device_list;
        
      } else {
        toast.error("Failed to Fetch Data");
        return rejectWithValue("Failed to fetch device list");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message || "Fetch failed");
    }
  }
);
const devicesListSlice = createSlice({
  name: "devicesList",
  initialState: {
    list: [
     
    ],
    status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceList.pending, (state) => {
        state.status = "loading";
        console.log("Loading");
        
      })
      .addCase(fetchDeviceList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        console.log("succeeded");
        
      })
      .addCase(fetchDeviceList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
        console.log("Failed");
        
      });
  },
});

export default devicesListSlice.reducer;
