import axios from "axios";
import {
  IsDevMode,
  VITE_BASE_DEV_URL,
  VITE_BASE_PROD_URL,
} from "../config/environment";

axios.defaults.withCredentials = true;

const BaseApiURL = axios.create({
  baseURL: IsDevMode ? VITE_BASE_DEV_URL : VITE_BASE_PROD_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});


export default BaseApiURL;