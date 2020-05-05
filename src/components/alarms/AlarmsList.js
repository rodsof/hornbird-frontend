import React, { useContext } from "react";
import AuthContext from "../../context/autenticacion/authContext";
import alarmContext from "../../context/alarms/alarmContext";
import {  Alert , Col} from "react-bootstrap";
import AlarmsTable from "./AlarmsTable";
import uuidv4 from 'uuid/v4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Contact from './Contact';


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
    if (a.length>0)
    var last = a[a.length - 1].start;
    else
    var last = today;
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
 
    const { alarms, createAlarm, getAlarms } = useContext(alarmContext);
    const usuarios = props.usuarios;
    const dataset = props.dataset;
    const authContext = useContext(AuthContext);
    const { usuario } = authContext; 

    let newAlarms = calculateAlarms(dataset, alarms);

    if (alarms.length === 0){
    for (var i = 0 ; i < newAlarms.length ; i++){
        createAlarm({
            message: newAlarms[i].message,
            status: newAlarms[i].status,
            assignTo: newAlarms[i].assignTo,
            assignDate: newAlarms[i].assignDate
        });
    } 
    getAlarms();
}
const handleClick = alarmId => {
    console.log(alarmId);
  }

   
    // run the function on page init 
    setTimeout(() => {
        if (alarms.length > 0 ){    
            calculateAlarms(dataset);
        }    // execute it one time to not render every time the component
    }, 3600000);
  
    
    return (
        <Col>
       {/*  <StatsCard
        bigIcon={<i className="pe-7s-graph1 text-danger" />}
        statsText="Alarms"
        bg="danger"
        statsValue={alarms.length}
        statsIcon={<FontAwesomeIcon icon={ faClock} size="3x" color="white"/> 
    }
        statsIconText="Checked 30 minutes ago"
      /> */}
    {/* {alarms.map((alarm) => (
        <Alert 
        variant="danger"
        key={uuidv4()}>
            {convert(alarm.start)}
            <span>{"\n"}</span>
            {alarm.message}
            { usuario.admin ? 
            <div>
            <span> {"\n"} Assign </span>
            {alarm.assignTo ? <p>Already assigned to {alarm.assignTo} </p>
            :
            <Contact 
            alarm = {alarm}
            />
            }
            </div> 
            :
            <div>
            <button 
            onClick = {()=> handleClick(alarm._id)} 
            className="btn btn-secundario btn-block"
            > 
            DONE
            </button>
            </div> 
        }
        </Alert> }
    ))*/}
            <AlarmsTable 
            alarms={alarms}
            />
        </Col>
    );
  };
  
  export default AlarmsList;
  