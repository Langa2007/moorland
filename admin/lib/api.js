const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000/api";

async function parseResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || payload.error || `Request failed with ${response.status}`);
  }
  return payload.data;
}

export function createApi(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    async login(credentials) {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });
      return parseResponse(response);
    },
    async get(path) {
      const response = await fetch(`${API_BASE}${path}`, { headers, cache: "no-store" });
      return parseResponse(response);
    },
    async send(path, method, body) {
      const response = await fetch(`${API_BASE}${path}`, {
        method,
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      return parseResponse(response);
    },
    async upload(file) {
      const body = new FormData();
      body.append("image", file);
      const response = await fetch(`${API_BASE}/admin/uploads/image`, {
        method: "POST",
        headers,
        body
      });
      return parseResponse(response);
    },
    async remove(path) {
      const response = await fetch(`${API_BASE}${path}`, { method: "DELETE", headers });
      return parseResponse(response);
    }
  };
}
