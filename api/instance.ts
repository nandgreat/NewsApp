import axios from "axios";
import { BASEURL, FIREBASE_API_KEY } from "../util/constant";

const instance = (baseUrl?: string) => {
  let count = 1;
  let activeToken = "1";

  let mainBaseUrl = baseUrl ?? BASEURL;

  // Checks to see if baseUrl is set 
  // if Base url is set then url Authorization else ignore
  let header = baseUrl ? {
    Authorization: `key=${FIREBASE_API_KEY}`
  } : undefined;

  const axiosConfig = axios.create({
    baseURL: `${__DEV__
      ? mainBaseUrl
      : mainBaseUrl
      }`,
    headers: header,
    timeout: 60000,
  });

  return axiosConfig;
};

export default instance;
