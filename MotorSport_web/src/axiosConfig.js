import axios from "axios";

const instance = axios.create({
  baseURL: "http://18.233.90.202:8080",
});

instance.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // DEBUG: ver qué sale en cada request
    console.log("[axios]", config.method?.toUpperCase(), config.url, {
      hasToken: Boolean(token),
      authHeader: config.headers.Authorization,
    });

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;