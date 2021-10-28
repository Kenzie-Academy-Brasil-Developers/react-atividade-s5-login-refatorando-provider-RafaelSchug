import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../providers/Auth";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

interface dataSchema {
  email: string;
  password: string;
}

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { signIn, authToken, requestLog } = useAuth();

  const onSubmit = (data: dataSchema) => {
    signIn(data);
  };

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token") || authToken) {
      history.push("/dashboard");
    }
  }, [authToken]);

  return (
    <div className="login__container">
      <h4>Login</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">{errors.email?.message}</label>
        <input
          type="text"
          {...register("email")}
          placeholder="Email"
          autoFocus
        />
        <label htmlFor="">{errors.password?.message}</label>
        <input type="password" {...register("password")} placeholder="Senha" />
        <button type="submit" className="login">
          Login
        </button>
        <span>{requestLog}</span>
      </form>
    </div>
  );
};

export default Login;
