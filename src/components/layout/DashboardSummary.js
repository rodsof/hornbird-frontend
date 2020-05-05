import React,{useContext, useEffect} from "react";
import Dashboard from "../layout/Dashboard";
import Bar from "../layout/Bar";
import ChartsList from "../charts/ChartsList";
import AlarmsList from "../alarms/AlarmsList";
import AuthContext from "../../context/autenticacion/authContext";
import itemContext from "../../context/items/itemContext";
import EnergyDashboard from "./EnergyDashboard";
import chartContext from "../../context/charts/chartContext";
import DashboardContext from "../../context/dashboard/dashboardContext";

const DashboardSummary = (props) => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, getUsers, usuarios, usuario } = authContext; 
  const itemsContext = useContext(itemContext);
  const { item } = itemsContext;
 let name="";

       const chartsContext = useContext(chartContext);
       const { getDataset, dataset } = chartsContext;
       const dashboardContext = useContext(DashboardContext);
  const { dashboard } = dashboardContext;
       useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])


   // item changes
   useEffect(() => {
    getUsers();
    getDataset();
    // eslint-disable-next-line
  }, [item]);
  
   if (item){
   name = item[0].name;
   }
   let admin;
   if (usuario){
    admin = usuario.admin;
   }
   if(!localStorage.getItem("token")){
    props.history.push("/");
  }
  return (
    <div className="row">
    <div className="col-md-12 nopadding">
    <Bar 
    usuario={usuario}
    tipo={admin}
    />
    </div>
    {dashboard ?
      <div className="col-md-3 nopadding">
        <Dashboard
        />
      </div>
      :
      null}
  
       <div className="col-md-9 nopadding">
        <main>
        { !item ?
       <EnergyDashboard />
        : name ==="FDD Alarms"?
        <AlarmsList 
        usuarios={usuarios}
        dataset={dataset}
        /> :  name ==="Energy" ? <EnergyDashboard /> : 
        <ChartsList /> 
        }
        </main>
      </div>
      </div>
  );
};

export default DashboardSummary;