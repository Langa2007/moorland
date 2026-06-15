import axios from "axios";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://moorland.onrender.com/api").replace(/\/+$/, "");

function unwrap(response) {
  return response.data?.data;
}

function normalizeError(error) {
  return new Error(error.response?.data?.message || error.response?.data?.error || error.message || "Request failed");
}

export function createApi(onUnauthorized) {
  const client = axios.create({
    baseURL: API_BASE,
    timeout: 20000,
    withCredentials: true
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (onUnauthorized) {
          onUnauthorized();
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    async login(credentials) {
      try {
        return unwrap(await client.post("/auth/login", credentials));
      } catch (error) {
        throw normalizeError(error);
      }
    },
    async get(path) {
      try {
        return unwrap(await client.get(path));
      } catch (error) {
        throw normalizeError(error);
      }
    },
    async send(path, method, body) {
      try {
        return unwrap(await client.request({ url: path, method, data: body }));
      } catch (error) {
        throw normalizeError(error);
      }
    },
    async upload(file) {
      const body = new FormData();
      body.append("image", file);
      try {
        return unwrap(await client.post("/admin/uploads/image", body));
      } catch (error) {
        throw normalizeError(error);
      }
    },
    async remove(path) {
      try {
        return unwrap(await client.delete(path));
      } catch (error) {
        throw normalizeError(error);
      }
    }
  };
}
