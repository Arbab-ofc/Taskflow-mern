const AUTH_TOKEN_KEY = "taskflow-token";
const AUTH_USER_KEY = "taskflow-user";
const AUTH_EVENT = "taskflow-auth-changed";

const readJSON = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
export const getStoredUser = () => readJSON(localStorage.getItem(AUTH_USER_KEY));

export const setStoredAuth = ({ token, user }) => {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const getAuthEventName = () => AUTH_EVENT;
