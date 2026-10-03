const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000';

const CSRF_COOKIE = 'csrf_token';

function readCookie(name) {
  const match = document.cookie.match(
    new RegExp('(^| )' + name + '=([^;]+)')
  );

  return match ? decodeURIComponent(match[2]) : null;
}

let csrfToken = null;

async function ensureCsrf() {
  if (csrfToken) return;

  const res = await fetch(`${API_BASE_URL}/api/csrf`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to initialize CSRF protection.');
  }

  const data = await res.json();

  csrfToken = data.csrfToken || null;

  if (!csrfToken) {
    throw new Error('CSRF token was not returned by the server.');
  }
}
async function request(
  path,
  { method = 'GET', body, isFormData = false } = {}
) {
  await ensureCsrf();

  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const safe = ['GET', 'HEAD'];

  if (!safe.includes(method)) {
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }
}
  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    method,
    headers,
    credentials: 'include',
    body: isFormData
      ? body
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  let data = null;

  const text = await res.text();

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const message =
      (data && data.error) || `Request failed (${res.status}).`;

    const error = new Error(message);
    error.status = res.status;

    throw error;
  }

  return data;
}

export const api = {
  get: (path) => request(path),

  post: (path, body) =>
    request(path, {
      method: 'POST',
      body,
    }),

  put: (path, body) =>
    request(path, {
      method: 'PUT',
      body,
    }),

  patch: (path, body) =>
    request(path, {
      method: 'PATCH',
      body,
    }),

  delete: (path) =>
    request(path, {
      method: 'DELETE',
    }),

  upload: (path, formData, method = 'POST') =>
    request(path, {
      method,
      body: formData,
      isFormData: true,
    }),
};

export function uploadUrl(relativePath) {
  if (!relativePath) return null;

  return `${API_BASE_URL}/uploads/${relativePath}`;
}