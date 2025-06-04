import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = window._env_ .VITE_API_BASE_URL;
// Replace with your actual API endpoint
export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/get_application_list`); // e.g., http://localhost:9001/api/apps
      console.log("application api response;-",response);
      
      if (!Array.isArray(response.data.applications
      )) {
        return thunkAPI.rejectWithValue("Invalid data format from API");
      }


      return response.data.applications;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "Failed to fetch applications" );
    }
  }

  
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    data: [
     
    ],
    status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = "loading";
        console.log("Loading");
        
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log("succeeded");
        
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
        console.log("Failed");
        
      });
  },
});

export default applicationsSlice.reducer;
