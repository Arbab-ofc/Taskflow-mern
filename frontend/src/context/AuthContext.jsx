import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login as loginRequest, signup as signupRequest } from "../api/authApi";
import {
  clearStoredAuth,
  getAuthEventName,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
} from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(Boolean(getStoredToken()));

  const syncAuth = useCallback(() => {
    setToken(getStoredToken());
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    const handleAuthChange = () => syncAuth();
    window.addEventListener(getAuthEventName(), handleAuthChange);
    return () => window.removeEventListener(getAuthEventName(), handleAuthChange);
  }, [syncAuth]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        const nextUser = response.data?.user || null;
        setUser(nextUser);
        if (nextUser) {
          setStoredAuth({ token, user: nextUser });
        }
      } catch {
        clearStoredAuth();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const handleAuthResponse = useCallback((response) => {
    const auth = response.data;
    const nextUser = auth?.user || null;
    const nextToken = auth?.token || null;

    if (nextToken && nextUser) {
      setStoredAuth({ token: nextToken, user: nextUser });
      setToken(nextToken);
      setUser(nextUser);
    }

    return auth;
  }, []);

  const login = useCallback(
    async (payload) => {
      const response = await loginRequest(payload);
      return handleAuthResponse(response);
    },
    [handleAuthResponse]
  );

  const signup = useCallback(
    async (payload) => {
      const response = await signupRequest(payload);
      return handleAuthResponse(response);
    },
    [handleAuthResponse]
  );

  const logout = useCallback(() => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      signup,
      logout,
    }),
    [loading, login, logout, signup, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
