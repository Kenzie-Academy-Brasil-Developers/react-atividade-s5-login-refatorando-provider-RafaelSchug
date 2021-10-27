import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../providers/Auth";

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

  const { signIn } = useAuth();

  const onSubmit = (data: dataSchema) => {
    signIn(data);
  };

  console.log(errors);

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
