import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";
import Administration from "./components/layout/Administration";
import DashboardSummary from "./components/layout/DashboardSummary";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import AlarmState from "./context/alarms/alarmState";
import ItemState from "./context/items/itemState";
import ChartState from "./context/charts/chartState";
import DashboardState from "./context/dashboard/dashboardState";
import RutaPrivada from "./components/rutas/RutaPrivada";
import tokenAuth from "./config/token";

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <DashboardState>
      <AlarmState>
        <ItemState>
          <ChartState>
            <AlertaState>
              <AuthState>
                <Router>
                  <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <RutaPrivada
                      exact
                      path="/dashboard"
                      component={DashboardSummary}
                    />
                    <Route exact path="/sign-in" component={SignIn} />
                    <Route exact path="/register" component={Register} />
                    <RutaPrivada
                      exact
                      path="/admin"
                      component={Administration}
                    />
                  </Switch>
                </Router>
              </AuthState>
            </AlertaState>
          </ChartState>
        </ItemState>
      </AlarmState>
    </DashboardState>
  );
}

export default App;
