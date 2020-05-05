import React, {  useContext } from "react";
import ItemsList from '../items/ItemsList';
import DashboardContext from "../../context/dashboard/dashboardContext";

const Dashboard = () => {
  const dashboardContext = useContext(DashboardContext);
  const { dashboard } = dashboardContext;

  if (dashboard){
  return (
<aside>
      <div id="sidebar" className="nav-collapse ">
        <ul className="sidebar-menu">
          <li className="active">
            <a className="btn btn-primario btn-block" href="/">
                          <i className="icon_house_alt"></i>
                          <span>Dashboard</span>
                      </a>
          </li>
         <ItemsList />

        </ul>
      </div>
    </aside>
  );
}
else {
  return null;
}
}
export default Dashboard;
