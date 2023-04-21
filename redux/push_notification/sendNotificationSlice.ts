import { createSlice } from "@reduxjs/toolkit";
import { sendNotification } from "./api";
import { User } from "@react-native-google-signin/google-signin";

type loginState = {
  response: User;
  loading: boolean;
  error: any;
};

const initialState = {} as loginState;

const sendNotificationSlice = createSlice({
  name: "send_notification",
  initialState,

  reducers: {
    clearSendNotificationResponse: () => initialState,

    saveUserData: (state, action) => {
      state.response = action.payload;
    },
    updateConfigureSecurity: (state, action) => {
      state!.response! = action.payload;
    },
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

export const { clearSendNotificationResponse, saveUserData, updateConfigureSecurity } = sendNotificationSlice.actions;

export default sendNotificationSlice.reducer;
