import axios, { AxiosError } from "axios";
// import { anotherUrlThing, baseUrl, decrypt, encrypt } from "../util/constant";
import { BASEURL, UNAUTHORIZED } from "../util/constant";
import { consoleLog, retrieveItem, storeData } from "../util/utils";

const CancelToken = axios.CancelToken;

export const axiosAuth = () => {
  const axiosAuth = axios.create({
    baseURL: BASEURL,
    timeout: 60000
  });

  return axiosAuth;
};
