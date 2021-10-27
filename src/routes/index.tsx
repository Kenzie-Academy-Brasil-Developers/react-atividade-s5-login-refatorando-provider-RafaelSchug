import { Switch, Route, useHistory } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
const Routes = () => {
  const history = useHistory();
  return (
    <Switch>
      <Route path="/" exact>
        <Login></Login>
      </Route>
      <Route path="/dashboard">
        <Dashboard></Dashboard>
      </Route>
      {/* <Route>{() => history.push("/")}</Route> */}
    </Switch>
  );
};

export default Routes;
