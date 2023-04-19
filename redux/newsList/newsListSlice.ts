import { createSlice } from "@reduxjs/toolkit";
import { newsList } from "./api";
import { NewResponse } from "./response";

type newsListState = {
  response: NewResponse;
  loading: boolean;
  error: any;
};

const initialState = {} as newsListState;

const newsListSlice = createSlice({
  name: "newsList",
  initialState,
  reducers: {
    clearNewsResponse: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(newsList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(newsList.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });

    builder.addCase(newsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearNewsResponse } =
  newsListSlice.actions;

export default newsListSlice.reducer;
