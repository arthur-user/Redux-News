// client/src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

export const get = (path) =>
  fetch(`${BASE_URL}${path}`).then(handleResponse);

export const post = (path, body) =>
  fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(handleResponse);

export const remove = (path) =>
  fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
  }).then(handleResponse);