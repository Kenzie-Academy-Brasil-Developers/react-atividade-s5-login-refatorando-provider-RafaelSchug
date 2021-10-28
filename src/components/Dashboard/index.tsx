import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../providers/Auth";
import "./style.css";

const Dashboard = () => {
  const history = useHistory();
  const { logout, authToken } = useAuth();
  const userName = localStorage.getItem("@userName") || "";

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [authToken]);

  return (
    <div className="profile__container">
      <div className="info_content">
        <div className="letter_content">
          <p>{userName && userName[0].toUpperCase()}</p>
        </div>
        <div>
          <span>
            Bem vindo(a), <strong>{userName}</strong>
          </span>
        </div>
      </div>
      <button onClick={logout} className="logout">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
