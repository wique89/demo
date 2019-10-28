import axios from "axios";
// import mock from "./mock";
import { store } from "@/plugins/vuex-store";
import storage from "@/lib/utils/storage.js";

let api = axios.create({ timeout: 20000 });

api.defaults.baseURL = GLOBAL_API_URL;

if (process.env.NODE_ENV === "development") {
  // mock(api);
} else {

}

api.defaults.isRetryRequest = false;
api.defaults.headers.common["Authorization"] = storage.getItem("token");

api.interceptors.request.use(
  config => {
    if (config.method == "get") {
      
    }
    if (config.method == "post") {
       
    }

    //console.log(config);

    if (storage.getItem("token")) {
      config.headers.Authorization = storage.getItem("token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const refreshToken = () => {
  return api.post("/auth/refreshToken");
};

api.interceptors.response.use(
  function (response) {
    let data = response.data;

    if (response.status == 401 || response.data.code == "403") {
      window.location = "/#/login";

      //TODO refresh token and retry

    } else {
      console.log("data",data);
      if (data.errId != undefined && data.errId != 0) {
        return Promise.reject(data);
      }
      return data;
    }
  },
  function (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default api;
