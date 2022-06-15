import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";

const initialState = {
  images: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Images
export const getImages = createAsyncThunk(
  "trades/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await imageService.getTrades(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(thunkAPI.rejectWithValue(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = imageSlice.actions;
export default imageSlice.reducer;
