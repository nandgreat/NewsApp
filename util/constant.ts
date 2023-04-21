
export const SUCCESSFULL = "200";
export const SUCCESSFULL_202 = "202";
export const NOT_FOUND = "404";
export const UNAUTHORIZED = "115";

const LOCAL_BASEURL = "https://newsapi.org/v2/";

export const BASEURL = LOCAL_BASEURL

export const FIREBASE_API_KEY = "AAAACCuTujk:APA91bGPSN-J-1IY9qlDJBNgjImpLNH3BVAzusxuvewfXqlSmpPAs39dYUv0FCCq4qALneFuHdXFiZ5HXrWcTT50XwOcMWAWCAGLCUd8_Fso3KyIw486fkvwDiPo9XROtAk7vK1GbiKE";

export const API_KEY = "55546d831dcd49baaa828ab80d935082";

export const encrypt = (value: string) => {
  return value
}

export const decrypt = ({ encrypted_text = "" }: { encrypted_text?: string }) => {
  return encrypted_text;
}