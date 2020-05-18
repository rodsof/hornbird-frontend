import React, { useContext } from "react";
import AuthContext from "../../context/autenticacion/authContext";
import alarmContext from "../../context/alarms/alarmContext";
import {   Col} from "react-bootstrap";
import AlarmsTable from "./AlarmsTable";
import clienteAxios from "../../config/axios";



function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      var hours = date.getHours();
    var minutes = date.getMinutes();
    var secs = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = [date.getFullYear(), mnth, day].join("-") + ' ' +hours + ':' + minutes + ' ' + secs + ' ' + ampm;
    return strTime;
  }
  
function calculateAlarms(dataset,a) {
    // Create random array of objects
    let alarms = [];
    var today = new Date();
    //today.setDate(today.getDate() - 4);
    let maxDate;

    if (a.length>0){
        for (var j = 0 ; j < a.length ; j++){
            if (!maxDate || a[j].start > maxDate){
                maxDate = a[j].start;
            }
        }
    }
    else{
        maxDate = today;
    }
    //console.log(maxDate);
    for (var i=0 ; i < dataset.length ; i++){
        if (convert(dataset[i].date) > convert(maxDate)){
           // console.log("FFF");
        if ( dataset[i].saductstpressure <= 90 &&  dataset[i].safanfrequency < 60 ){
             alarms.push({
                message: "SA Fan Unable to Reach Maximum Frequency",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
        }
        if ( dataset[i].spacet >= 24 &&  dataset[i ].safanfrequency === 60 &&  dataset[i ].chwvalveposition < 100){
            alarms.push({
                message: "CHW Valve Not Fully Open",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
        }
        if ( dataset[i].spacet <= 22 &&  dataset[i ].safanfrequency === 40 &&  dataset[i ].chwvalveposition > 0){
            alarms.push({
                message: "CHW Valve Not Fully Closed",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
        }
        if ( dataset[i].saductstpressure >= 110 &&  dataset[i ].safanfrequency > 40 ){
            alarms.push({
                message: "SA Fan Unable to Reach Minimum Frequency",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
        }
        if ( dataset[i].saductstpressure <= 90 &&  dataset[i ].safr < 1000){
            alarms.push({
                message: "SA Fan Flow Rate Unable to Reach Maximum",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
        }
        if ( dataset[i].saductstpressure >= 110 &&  dataset[i ].safr > 600){
            alarms.push({
                message:  "SA Fan Flow Rate Unable to Reach Minimum",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
        }

        if ( dataset[i].space <= 400 &&  dataset[i ].oadamperopen > 0){
            alarms.push({
                message:   "OA Damper Unable to Reach Minimum Position",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
        }
        if ( dataset[i].space >= 2400 &&  dataset[i ].oadamperopen < 30){
            alarms.push({
                message:   "OA Damper Unable to Reach Maximum Position",
                status: "Open",
                start: dataset[i].date,
                assignTo: null,
            })
    }
    }
}
      return alarms;
    }
const AlarmsList = (props) => {
 
    // const { createAlarm } = useContext(alarmContext);
    const  alarms = props.alarms;
    const dataset = props.dataset;

    let newAlarms = calculateAlarms(dataset, alarms);

    const createAlarm= async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/alarms/addAlarms',datos);
        } catch (error) {
            console.log(error);
        }        
    }
    if (newAlarms.length > 0){
        for (var i = 0 ; i < newAlarms.length ; i++){
            let alarm = {
                     message: newAlarms[i].message,
                    status: newAlarms[i].status,
                    start: new Date(newAlarms[i].start),
                    assignTo: newAlarms[i].assignTo,
            }
            createAlarm(alarm);
        }
        newAlarms = [];
}

   
    // run the function on page init 
    setTimeout(() => {
        if (alarms.length > 0 ){    
            calculateAlarms(dataset);
        }    // execute it one time to not render every time the component
    }, 3600000);
  
    
    return (
        <Col>
            <AlarmsTable 
            alarms={alarms}
            />
        </Col>
    );
  };
  
  export default AlarmsList;
  