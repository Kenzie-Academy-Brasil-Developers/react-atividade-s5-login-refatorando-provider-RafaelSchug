import { createContext, useContext, useState, ReactNode } from "react";
// import { useHistory } from "react-router-dom";
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
}

const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const history = useHistory();

  const [authToken, setAuthToken] = useState<string>(
    () => localStorage.getItem("token") || ""
  );

  const signIn = (userData: userDataSchema) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        // history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken("");
    // history.push("/login");
  };

  return (
    <AuthContext.Provider value={{ authToken, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
