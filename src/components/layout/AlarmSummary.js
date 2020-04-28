import React,{useContext, useEffect} from "react";
import Dashboard from "../layout/Dashboard";
import Bar from "../layout/Bar";
import ChartsList from "../charts/ChartsList";
import AlarmsList from "../alarms/AlarmsList";
import AuthContext from "../../context/autenticacion/authContext";
import itemContext from "../../context/items/itemContext";
import DashboardContext from "../../context/dashboard/dashboardContext";
import EnergyDashboard from "./EnergyDashboard";
import chartContext from "../../context/charts/chartContext";
import BarChart from "../charts/BarChart"


const AlarmSummary = (props) => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, getUsers, usuarios } = authContext; 
  const itemsContext = useContext(itemContext);
  const { item } = itemsContext;
 let name="";
       const dashboardContext = useContext(DashboardContext);
       const { dashboard } = dashboardContext;

       const chartsContext = useContext(chartContext);
       const { getDataset, dataset } = chartsContext;
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
  return (
    <div className="row">
    <div className="col-md-12 nopadding">
    <Bar 
    />
    </div>
    { true ? 
        <div className="col-md-3 nopadding">
      <Dashboard 
      /> 
      </div> 
      : 
      null }
      <div className="col-md-9 nopadding">
        <main>
        { !item ?
       <AlarmsList 
       usuarios={usuarios}
       dataset={dataset}
       />
        : name ==="FDD Alarms"?
        <AlarmsList 
        usuarios={usuarios}
        dataset={dataset}
        /> :  null
        }
        </main>

         <div className="ct-chart">

              <BarChart
                // data={[{ label: "jan", value: 1 }, { label: "feb", value:2 },{ label: "mar", value: 2 }, { label: "apr", value: 4 }]}
                data={dataset}
                
                title="Energy"
                color="#2F4B8A"
                max={6}
                min={0}
                unit="kWh"
              />
            </div>
      </div>
      </div>
  );
};

export default AlarmSummary;