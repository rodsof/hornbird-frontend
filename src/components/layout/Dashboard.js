import React, {  useContext } from "react";
import ItemsList from '../items/ItemsList';
import { Link } from "react-router-dom";
 

const Dashboard = () => {
  return (
<aside>
      <div id="sidebar" className="nav-collapse ">
        <ul className="sidebar-menu">
          <li className="active">
            <Link to="/dashboard" className="btn btn-primario btn-block" >
                          <i className="icon_house_alt"></i>
                          <span>Dashboard</span>
                      </Link>
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