const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProfile = (userId) =>
  fetch(`${BASE_URL}/api/auth/profile`, {
    headers: { "x-user-id": userId }
  }).then(r => r.json());

export const fetchDashboard = (userId) =>
  fetch(`${BASE_URL}/api/auth/dashboard`, {
    headers: { "x-user-id": userId }
  }).then(r => r.json());

export const fetchStats = (userId) =>
  fetch(`${BASE_URL}/api/call-sessions/stats`, {
    headers: { "x-user-id": userId }
  }).then(r => r.json());

export const fetchCallHistory = (userId, limit = 10) =>
  fetch(`${BASE_URL}/api/call-sessions?limit=${limit}`, {
    headers: { "x-user-id": userId }
  }).then(r => r.json());