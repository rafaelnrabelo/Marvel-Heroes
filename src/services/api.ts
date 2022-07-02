import axios from "axios";

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

api.interceptors.request.use(async (request) => {
  request.params = {
    ...request.params,
    apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
  }

  return request;
});

export { api };