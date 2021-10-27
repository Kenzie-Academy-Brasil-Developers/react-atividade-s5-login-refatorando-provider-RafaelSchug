import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../providers/Auth";

const Dashboard = () => {
  const history = useHistory();
  const { logout, authToken } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [authToken]);

  return <button onClick={logout}>Logout</button>;
};

export default Dashboard;
