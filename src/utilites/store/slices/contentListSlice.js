import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchContentList = createAsyncThunk(
  'manageContent/fetchContentList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/get_all_cms_data`);
     
      if (response.status) {
         console.log("content api response;-", response);
        return response.data;
        
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
const contentListSlice = createSlice({
  name: "contentList",
  initialState: {
    list: [
    ],
    status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentList.pending, (state) => {
        state.status = "loading";
        console.log("Loading");
        
      })
      .addCase(fetchContentList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        console.log("succeeded");
        
      })
      .addCase(fetchContentList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
        console.log("Failed");
        
      });
  },
});

export default contentListSlice.reducer;
