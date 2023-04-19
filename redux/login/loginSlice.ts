import { createSlice } from "@reduxjs/toolkit";
import { login } from "./api";
import { User } from "@react-native-google-signin/google-signin";

type loginState = {
  response: User;
  loading: boolean;
  error: any;
};

const initialState = {} as loginState;

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    clearLoginResponse: () => initialState,

    saveUserData: (state, action) => {
      state.response = action.payload;
    },
    updateConfigureSecurity: (state, action) => {
      state!.response! = action.payload;
    },
    logout() {
      
     },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.response! = action.payload;
      state.loading = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      
      console.log(action.payload);
      
      state.error = action.payload;
    });
  },
});

export const { clearLoginResponse, saveUserData, logout, updateConfigureSecurity } = loginSlice.actions;

export default loginSlice.reducer;
