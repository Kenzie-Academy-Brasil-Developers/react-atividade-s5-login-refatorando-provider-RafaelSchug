import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../providers/Auth";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

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

  const { signIn, authToken } = useAuth();

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email")} placeholder="Email" />
        <input type="text" {...register("password")} placeholder="Senha" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
