import { ReactNode, createContext, useEffect, useState } from "react";
import { UserApi } from "src/api/userApi/userApi";
import { AuthorizedUser } from "src/api/userApi/types";

type AuthContextType = {
  isAuthorized: boolean;
  currentUser: AuthorizedUser | null; // add type later

  signIn: () => void;
  processAuth: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<{ isAuthorized: boolean }>;
  handleGoogleLogin: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthorizedUser | null>(null);

  const signIn = () => {
    console.log("signing in...");
  };

  const processAuth = async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const user = await UserApi.getUser();
    if (user) {
      setCurrentUser(user);
      setIsAuthorized(true);
      return {
        isAuthorized: true,
      };
    }

    return {
      isAuthorized: false,
    };
  };

  const handleGoogleLogin = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    window.location.href = url;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      processAuth({ accessToken, refreshToken });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        currentUser,
        signIn,
        processAuth,
        handleGoogleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
