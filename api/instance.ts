import axios from "axios";
import { BASEURL } from "../util/constant";

const instance = (useAuth?: boolean) => {
  let count = 1;
  let activeToken = "1";
  console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
  console.log(BASEURL);
  
  const axiosConfig = axios.create({
    baseURL: `${__DEV__
      ? BASEURL
      : BASEURL
      }`,
    timeout: 60000,
  });

  return axiosConfig;
};

export default instance;
