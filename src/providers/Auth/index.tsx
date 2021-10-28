import { createContext, useContext, useState, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface userDataSchema {
  email: string;
  password: string;
}

interface ContextData {
  authToken: string;
  signIn: ({}: userDataSchema) => void;
  logout: () => void;
  requestLog: string;
}

const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  const [requestLog, setRequestLog] = useState<string>("");

  const [authToken, setAuthToken] = useState<string>(
    () => localStorage.getItem("token") || ""
  );

  const signIn = (userData: userDataSchema) => {
    setRequestLog("Conectando...");
    axios
      .post("https://kenziehub.herokuapp.com/sessions", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        localStorage.setItem("@userName", response.data.user.name);
        history.push("/dashboard");
        console.log(response);
        setRequestLog("");
      })
      .catch((err) => {
        console.log(err);
        setRequestLog("Credenciais inválidas");
      });
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken("");
    setRequestLog("");
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, logout, signIn, requestLog }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
