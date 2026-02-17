"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthContextValue = {
  accessToken: string | null;
  apiKey: string | null;
  authMessage: string | null;
  authError: string | null;
  isLoggedIn: boolean;
  isAuthenticating: boolean;
  isGenerating: boolean;
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  generateApiKey: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE_URL = "http://localhost:8000/sdk";
const apiKey_ENDPOINT = `${API_BASE_URL}/generate-api-key`;
const logout_ENDPOINT = `${API_BASE_URL}/logout`;

function getAccessToken(data: unknown) {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const typed = data as Record<string, unknown>;
  const nested = typed.data as Record<string, unknown> | undefined;
  const token = nested?.accessToken ?? typed.accessToken;

  return typeof token === "string" ? token : null;
}

function getApiKey(data: unknown) {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const typed = data as Record<string, unknown>;
  const nested = typed.data as Record<string, unknown> | undefined;
  const key = nested?.apiKey ?? typed.apiKey;

  return typeof key === "string" ? key : null;
}

async function parseJsonResponse(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const clearAuthState = useCallback(() => {
    setAccessToken(null);
    setApiKey(null);
    setAuthMessage(null);
    setAuthError(null);
  }, []);

  const handleAuthResponse = useCallback((token: string, message: string) => {
    setAccessToken(token);
    setAuthMessage(message);
    setAuthError(null);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: payload.email, password: payload.password }),
      });

      const data = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          (data as { error?: string; message?: string } | null)?.error ??
            (data as { message?: string } | null)?.message ??
            "Login failed"
        );
      }

      const token = getAccessToken(data);
      if (!token) {
        throw new Error("Login response missing access token.");
      }

      handleAuthResponse(token, `Logged in as ${payload.email}`);
      return true;
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Login failed");
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [handleAuthResponse]);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          confirmPassword: payload.confirmPassword,
        }),
      });

      const data = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          (data as { message?: string } | null)?.message ?? "Registration failed"
        );
      }

      const token = getAccessToken(data);
      if (!token) {
        throw new Error("Register response missing access token.");
      }

  handleAuthResponse(token, "Account created successfully.");
      return true;
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Registration failed");
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [handleAuthResponse]);

  const generateApiKey = useCallback(async () => {
    if (!accessToken) {
      setAuthError("Login or register to generate an API key.");
      return;
    }

    setIsGenerating(true);
    setAuthError(null);

    try {
      const response = await fetch(apiKey_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          (data as { message?: string } | null)?.message ??
            "Failed to generate API key"
        );
      }

      const key = getApiKey(data);
      if (!key) {
        throw new Error("API key response missing apiKey.");
      }

      setApiKey(key);
      setAuthMessage("API key generated. This will be shown only once, so make sure to copy it now!");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Failed to generate API key");
    } finally {
      setIsGenerating(false);
    }
  }, [accessToken]);

  const logout = useCallback(async () => {
    if (!accessToken) {
      clearAuthState();
      return;
    }

    try {
      await fetch(logout_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } finally {
      clearAuthState();
    }
  }, [accessToken, clearAuthState]);

  const value = useMemo(
    () => ({
      accessToken,
      apiKey,
      authMessage,
      authError,
      isLoggedIn: Boolean(accessToken),
      isAuthenticating,
      isGenerating,
      login,
      register,
      generateApiKey,
      logout,
    }),
    [
      accessToken,
      apiKey,
      authMessage,
      authError,
      isAuthenticating,
      isGenerating,
      login,
      register,
      generateApiKey,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
