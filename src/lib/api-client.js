const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export class ApiError extends Error {
  /**
   * @param {number} status
   * @param {string} statusText
   * @param {*} body
   */
  constructor(status, statusText, body) {
    super(`API Error ${status}: ${statusText}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    let body;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    throw new ApiError(response.status, response.statusText, body);
  }
  if (response.status === 204) return null;
  return response.json();
}

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const jsonHeaders = () => ({ "Content-Type": "application/json", ...authHeaders() });

export const api = {
  async get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, { headers: jsonHeaders() });
    return handleResponse(res);
  },

  async post(endpoint, data) {
    const isFormData = data instanceof FormData;
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: isFormData ? authHeaders() : jsonHeaders(),
      body: isFormData ? data : JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async put(endpoint, data) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: jsonHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async delete(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, { headers: jsonHeaders() });
    return handleResponse(res);
  },
};
