import React,{ useContext, useEffect } from 'react';
import Iframe from 'react-iframe';
import Bar from './Bar';
import AuthContext from "../../context/autenticacion/authContext";
import alarmContext from "../../context/alarms/alarmContext";
const LandingPage = (props) => {
    const authContext = useContext(AuthContext);
    const { autenticado} = authContext; 
    const AlarmContext = useContext(alarmContext);
    const { alarms, getAlarms } = useContext(alarmContext);
 
  if(!alarms){
      getAlarms();
  }
  if(localStorage.getItem("token")){
    props.history.push("/dashboard");
  }

    return ( 
        <div className="row">
        <div className="col-12">
        <Bar/>
        </div>
        <div className="col-12">
        <div className="seccion-principal">
        <Iframe url="https://www.ventusky.com/"
        id="ventusky"
        className="ventusky"
        display="block"
        position="relative"
        allow="geolocation"
        />
        </div>
        </div>
        </div>
     );
}

export default LandingPage;