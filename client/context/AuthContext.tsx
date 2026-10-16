import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  api,
  setAuthToken,
  getAuthToken,
  getSavedUser,
  setSavedUser,
  clearAuthSession,
  UserProfile,
} from "../services/api";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  // Synchronously initialize auth state from storage to prevent cold-start reload dropouts
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [user, setUser] = useState<UserProfile | null>(() => getSavedUser());
  const [isLoading, setIsLoading] = useState<boolean>(() => !getAuthToken());

  useEffect(() => {
    let isMounted = true;

    // Background session verification and profile synchronization
    const validateSession = async () => {
      const activeToken = getAuthToken();
      if (!activeToken) {
        if (isMounted) {
          setToken(null);
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const profile = await api.auth.getMe();
        if (isMounted) {
          setUser(profile);
          setToken(activeToken);
        }
      } catch (err: any) {
        // Standard OAuth/JWT error discrimination:
        // Only terminate session if server explicitly returns HTTP 401 Unauthorized or 403 Forbidden
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          if (isMounted) {
            clearAuthSession();
            setToken(null);
            setUser(null);
          }
        } else {
          // If network error, offline mode, or server timeout:
          // Preserve cached session credentials so the user is not kicked out
          console.warn("Backend connectivity issue during session verification. Preserving cached credentials.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    validateSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await api.auth.login(email, password);
      setToken(data.access_token);
      const profile = await api.auth.getMe();
      setUser(profile);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string, role = "ELDER") => {
    setIsLoading(true);
    try {
      const data = await api.auth.register({
        email,
        password,
        full_name: fullName,
        role,
      });
      setToken(data.access_token);
      const profile = await api.auth.getMe();
      setUser(profile);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const data = await api.auth.googleAuth({
        email: "eleanor@careflow.com",
        full_name: "Eleanor Vance",
        role: "ELDER",
        google_id: "google-demo-eleanor",
      });
      setToken(data.access_token);
      const profile = await api.auth.getMe();
      setUser(profile);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthSession();
    setToken(null);
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
