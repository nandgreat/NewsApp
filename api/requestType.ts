import Axios from "./instance";
export const post = async <T>(endpoint: string, payload: any): Promise<T> => {
  const { data, status } = await Axios.post<T>(endpoint, { ...payload });

  return data;
};
