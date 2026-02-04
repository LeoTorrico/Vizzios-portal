import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { LoginResponse, User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("ADMIN_ACCESS_TOKEN");
    const storedUser = localStorage.getItem("ADMIN_USER_DATA");
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (data: LoginResponse) => {
    localStorage.setItem("ADMIN_ACCESS_TOKEN", data.access_token);
    localStorage.setItem("ADMIN_USER_DATA", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("ADMIN_ACCESS_TOKEN");
    localStorage.removeItem("ADMIN_USER_DATA");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
