import { createSlice } from "@reduxjs/toolkit";
import { sendNotification } from "./api";
import { User } from "@react-native-google-signin/google-signin";

type sendNotificationState = {
  response: User;
  loading: boolean;
  error: any;
};

const initialState = {} as sendNotificationState;

const sendNotificationSlice = createSlice({
  name: "send_notification",
  initialState,

  reducers: {
    clearSendNotificationResponse: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(sendNotification.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(sendNotification.fulfilled, (state, action) => {
      state.response! = action.payload;
      state.loading = false;
    });

    builder.addCase(sendNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSendNotificationResponse } = sendNotificationSlice.actions;

export default sendNotificationSlice.reducer;
