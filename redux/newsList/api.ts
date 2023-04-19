import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Axios from "../../api/instance";
import { NewResponse } from "./response";
import { API_KEY } from "../../util/constant";

export const newsList = createAsyncThunk<
  NewResponse,
  {},
  { rejectValue: any }
>(
  "news_list",
  async (
    { },
    { rejectWithValue }
  ) => {

    try {

      const { data, status } = await Axios().get<NewResponse>(`top-headlines?country=us&category=business&apiKey=${API_KEY}`);

      return data;
    } catch (error) {

      console.log("<<<<<<<<<<<<<<<<<< ERror >>>>>>>>>>>>>>>>>>>>>>>>>>>");

      console.log(error);
      const err = error as AxiosError<any>;
      return rejectWithValue(err);
    }
  }
);
