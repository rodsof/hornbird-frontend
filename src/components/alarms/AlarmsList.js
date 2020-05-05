import React, { useContext } from "react";
import AuthContext from "../../context/autenticacion/authContext";
import alarmContext from "../../context/alarms/alarmContext";
import {   Col} from "react-bootstrap";
import AlarmsTable from "./AlarmsTable";



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
    if (a.length>0){
    var last = a[a.length - 1].start;
    }
    else{
    var last = today;
    }
    for (var i=0 ; i < dataset.length ; i++){

        if (convert(dataset[i].date) > convert(last)){
        if ( dataset[i].saductstpressure <= 90 &&  dataset[i].safanfrequency < 60 ){
             alarms.push({
                message: "SA Fan Unable to Reach Maximum Frequency",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
        }
        if ( dataset[i].spacet >= 24 &&  dataset[i ].safanfrequency === 60 &&  dataset[i ].chwvalveposition < 100){
            alarms.push({
                message: "CHW Valve Not Fully Open",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
        }
        if ( dataset[i].spacet <= 22 &&  dataset[i ].safanfrequency === 40 &&  dataset[i ].chwvalveposition > 0){
            alarms.push({
                message: "CHW Valve Not Fully Closed",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
        }
        if ( dataset[i].saductstpressure >= 110 &&  dataset[i ].safanfrequency > 40 ){
            alarms.push({
                message: "SA Fan Unable to Reach Minimum Frequency",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
        }
        if ( dataset[i].saductstpressure <= 90 &&  dataset[i ].safr < 1000){
            alarms.push({
                message: "SA Fan Flow Rate Unable to Reach Maximum",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
        }
        if ( dataset[i].saductstpressure >= 110 &&  dataset[i ].safr > 600){
            alarms.push({
                message:  "SA Fan Flow Rate Unable to Reach Minimum",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
        }

        if ( dataset[i].space <= 400 &&  dataset[i ].oadamperopen > 0){
            alarms.push({
                message:   "OA Damper Unable to Reach Minimum Position",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
        }
        if ( dataset[i].space >= 2400 &&  dataset[i ].oadamperopen < 30){
            alarms.push({
                message:   "OA Damper Unable to Reach Maximum Position",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: null,
                assignDate: null
            })
    }
    }
}
      return alarms;
    }
const AlarmsList = (props) => {
 
    const { createAlarm } = useContext(alarmContext);
    const  alarms = props.alarms;
    const dataset = props.dataset;

    let newAlarms = calculateAlarms(dataset, alarms);
    if (newAlarms.length > 0){
        console.log(" a ver cuantas ves");
    for (var i = 0 ; i < newAlarms.length ; i++){
        createAlarm({
            message: newAlarms[i].message,
            status: newAlarms[i].status,
            assignTo: newAlarms[i].assignTo,
            assignDate: newAlarms[i].assignDate
        });
    } 
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
  