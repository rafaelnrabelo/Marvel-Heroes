import axios from "axios";
import { Md5 } from "ts-md5";

interface ServerApiProps {
  ts?: string;
  hash?: string;
}

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

api.interceptors.request.use(async (request) => {
  const newParams: ServerApiProps = {};

  if (typeof window === 'undefined') {
    const ts = new Date().getTime().toString();
    const hash = Md5.hashStr(ts + process.env.MARVEL_PRIVATE_KEY + process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY);

    newParams.ts = ts;
    newParams.hash = hash;
  }
  
  request.params = {
    ...request.params,
    ...newParams,
    apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
  }

  return request;
});

export { api };