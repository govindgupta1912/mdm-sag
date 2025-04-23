import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace with your actual API endpoint
export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/applications"); // e.g., http://localhost:9001/api/apps
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    data: [],
    status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default applicationsSlice.reducer;
