import React, {  useContext } from "react";
import ItemsList from '../items/ItemsList';
 

const Dashboard = () => {
  return (
<aside>
      <div id="sidebar" className="nav-collapse ">
        <ul className="sidebar-menu">
          <li className="active">
            <a className="btn btn-primario btn-block" href="#">
                          <i className="icon_house_alt"></i>
                          <span>Dashboard</span>
                      </a>
          </li>
         <ItemsList />

        </ul>
      </div>
    </aside>
  );
};

export default Dashboard;
/* 
  
  return (
    <div className="wrapper">
      <nav id="sidebar">
            <div className="sidebar-header">
            <h3>Dashboard</h3>
            </div>
        <ItemsList />
      </nav>
      </div>
  );
  */