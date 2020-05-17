import React, { useContext, useEffect } from "react";
import Dashboard from "../layout/Dashboard";
import Bar from "../layout/Bar";
import ChartsList from "../charts/ChartsList";
import AlarmsList from "../alarms/AlarmsList";
import AuthContext from "../../context/autenticacion/authContext";
import itemContext from "../../context/items/itemContext";
import EnergyDashboard from "./EnergyDashboard";
import chartContext from "../../context/charts/chartContext";
import DashboardContext from "../../context/dashboard/dashboardContext";
import alarmsContext from "../../context/alarms/alarmContext";
import EnergyOptimization from "./EnergyOptimization";
import FaultPrediction from "./FaultPrediction";

const DashboardSummary = (props) => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, getUsers, usuarios, usuario } = authContext;
  const itemsContext = useContext(itemContext);
  const { item } = itemsContext;
  let name = "";

  const chartsContext = useContext(chartContext);
  const { getDataset, dataset } = chartsContext;
  const dashboardContext = useContext(DashboardContext);
  const { dashboard } = dashboardContext;
  const alarmContext = useContext(alarmsContext);
  const { alarms, getAlarms } = alarmContext;
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  // item changes
  useEffect(() => {
    getUsers();
    getDataset();
    getAlarms();
    // eslint-disable-next-line
  }, [item]);

  if (item) {
    name = item[0].name;
  }
  let admin;
  if (usuario) {
    admin = usuario.admin;
  }
  if (!localStorage.getItem("token")) {
    props.history.push("/");
  }
  return (
    <div className="row">
      <div className="col-md-12 nopadding">
        <Bar usuario={usuario} tipo={admin} />
      </div>
      {dashboard ? (
        <div className="col-md-2 nopadding">
          <Dashboard />
        </div>
      ) : null}

      <div className="col-md-10 nopadding">
        <main>
          {!item ? (
            <EnergyDashboard />
          ) : name === "FDD Alarms" ? (
            <AlarmsList usuarios={usuarios} dataset={dataset} alarms={alarms} />
          ) : name === "Energy" ? (
            <EnergyDashboard />
          ) : name === "Energy Optimization" ? (
            <EnergyOptimization />
          ) : name === "Fault Prediction" ? (
            <FaultPrediction />
          ) : name === "Artificial Intelligence" ? (
            <FaultPrediction />
          ) : (
            <ChartsList />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardSummary;
