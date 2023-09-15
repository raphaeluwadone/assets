import axios from "axios";
import { addTokenInterceptor, rejectErrorInterceptor } from "./interceptors";


 const http = axios.create({
     baseURL: process.env.REACT_APP_API_BASEURL_Test,
     timeout: 90000
 })

http.interceptors.request.use(addTokenInterceptor, rejectErrorInterceptor);

export default http;