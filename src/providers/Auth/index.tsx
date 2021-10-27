import { createContext, useContext, useState, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface ContextData {
  authToken: string;
  signIn: ({}: userDataSchema) => void;
  logout: () => void;
}

interface userDataSchema {
  email: string;
  password: string;
}

const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  // Dessa forma adicionamos ao state o token caso ele exista no localStorage
  const [authToken, setAuthToken] = useState<string>(
    () => localStorage.getItem("token") || ""
  );

  // Função para logar na aplicação, recebe os dados pegos do form de login
  const signIn = (userData: userDataSchema) => {
    console.log("Logando com", userData);
    // axios
    //   .post("https://kenziehub.herokuapp.com/sessions", userData)
    //   .then((response) => {
    //     // setamos no localStorage o token, caso tenhamos a resposta esperada
    //     localStorage.setItem("token", response.data.token);
    //     // setamos no state o token, caso tenhamos a resposta esperada
    //     setAuthToken(response.data.token);
    //     // redirecionamos para a página logado
    //     history.push("/dashboard");
    //   })
    //   .catch((err) => console.log(err));
  };

  // Função para deslogar da aplicação
  const logout = () => {
    // limpando o localStorage
    localStorage.clear();
    // limpando o state
    setAuthToken("");
    // redirecionando para login
    history.push("/login");
  };

  return (
    <AuthContext.Provider value={{ authToken, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
