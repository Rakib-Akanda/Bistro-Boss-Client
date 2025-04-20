import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-sigma-ashy.vercel.app",
});
// url = https://bistro-boss-server-sigma-ashy.vercel.app
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      // console.log("request stopped by interceptor before adding token", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const status = err.response.request.status;
      // for 401 or 403 logout the user and move the user to the login page
      if (status === 401 || status === 403) {
        await logout();
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
