const BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const url = `${BASE}${path}`;
  const opts = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  if (opts.body && typeof opts.body !== "string") {
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts);

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // ignore non-json body
  }

  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || "API error");
    err.status = res.status;
    err.payload = data;
    throw err;
  }

  return data;
}

export const api = {
  createLink: (payload) =>
    request("/api/links", { method: "POST", body: payload }),

  getAllLinks: () => request("/api/links"),

  getLink: (code) => request(`/api/links/${encodeURIComponent(code)}`),

  deleteLink: (code) =>
    request(`/api/links/${encodeURIComponent(code)}`, { method: "DELETE" }),
};
