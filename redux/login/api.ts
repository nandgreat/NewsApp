import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleSignin } from "@react-native-google-signin/google-signin";


export const login = createAsyncThunk<
  any,
  {},
  { rejectValue: any }
>("account_login", async ({ }, thunkAPI) => {

  try {
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }

});
