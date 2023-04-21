import axios from "axios";
import { BASEURL, FIREBASE_API_KEY } from "../util/constant";

// Axios instance 
const instance = (baseUrl?: string) => {
  let count = 1;
  let activeToken = "1";

  // Checking if base url was set
  let mainBaseUrl = baseUrl ?? BASEURL;


  // Checks to see if baseUrl is set 
  // if Base url is set then url Authorization else ignore
  let header = baseUrl ? {
    'Content-Type': 'application/json',
    Authorization: `key=${FIREBASE_API_KEY}`
  } : undefined;

  console.log("hhhhhhhhhhhhhhhhhhhhh");

  console.log(header);

  // Axios install
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
