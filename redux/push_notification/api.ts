import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Axios from "../../api/instance";
import { AxiosError } from "axios";
import { SendNotificationPayload } from "./request";



export const sendNotification = createAsyncThunk<
  any,
  {},
  { rejectValue: any }
>(
  "send_notification",
  async (
    payload: SendNotificationPayload,
    { rejectWithValue }
  ) => {

    try {

      const { data, status } = await Axios("https://fcm.googleapis.com").post<any>(`/fcm/send`, payload);

      return data;
    } catch (error) {

      console.log("<<<<<<<<<<<<<<<<<< ERror >>>>>>>>>>>>>>>>>>>>>>>>>>>");

      console.log(error);
      const err = error as AxiosError<any>;
      return rejectWithValue(err);
    }
  }
);
