import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DashboardContext from "../../context/dashboard/dashboardContext";
import AuthContext from "../../context/autenticacion/authContext";
import itemContext from "../../context/items/itemContext";

const Bar = (props) => {
  const dashboardContext = useContext(DashboardContext);
  const { dashboard, showDashboard, hideDashboard } = dashboardContext;
  const authContext = useContext(AuthContext);
  const { cerrarSesion } = authContext;
  let tipo = props.tipo;
  let autenticado = false;
  const itemsContext = useContext(itemContext);
  const { deleteItem} = itemsContext;

  if(localStorage.getItem("token")){
    autenticado= true;
  }
  const onClickDashboard = () => {
    if (!dashboard) {
      showDashboard();
    } else {
      hideDashboard();
    }
  };

  const onClickAdmin = () => {
    deleteItem();
  }
  return (
    <div className="app-header">
      {autenticado ? (
        <div className="col-1 nopadding">
          <button className="btn btn-faBars" onClick={onClickDashboard}>
            <FontAwesomeIcon icon={faBars} size="3x" color="white" />
          </button>
        </div>
      ) : null}
      {autenticado ? (
        <div className="col-4 nopadding">
          <Link to={"/dashboard"}>
            <img src="HBTLogo.png" alt="logo" className="logo" />
          </Link>
        </div>
      ) : (
        <div className="col-5 nopadding">
          <img src="HBTLogo.png" alt="logo" className="logo" />
        </div>
      )}
      {autenticado ? (
        <div className="col-4 nopadding quatro">
            <p>System FDD, Prediction & Energy Optimization</p>
        </div>
      ) : (
        <div className="col-5 nopadding"></div>
      )}

      {autenticado ? null : (
        <div className="col-1 nopadding">
          <button className="btn btn-link btn-block">
            <Link to={"/sign-in"} className="link">
              SIGN IN
            </Link>
          </button>
        </div>
      )}
      {autenticado ? null : (
        <div className="col-1 nopadding">
          <button
            className="btn btn-faBars"
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="3x" color="white" />
          </button>
        </div>
      )}

      {!autenticado ? null : tipo ? (
        <div className="col-1 nopadding">
          <button className="btn btn-link btn-block" onClick={onClickAdmin}>
            <Link to={"/admin"} className="link">
              Administration
            </Link>
          </button>
        </div>
      ) : null}
      {autenticado ? (
        <div className="col-1 nopadding">
          <button
            className="btn btn-link btn-block"
            onClick={() => cerrarSesion()}
          >
            <Link to={""} className="link">
              SIGN OUT
            </Link>
          </button>
        </div>
      ) : null}
      {autenticado ? (
        <div className="col-1 nopadding">
          <button
            className="btn btn-faBars"
            // ver implementar onclick
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="3x" color="white" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Bar;
