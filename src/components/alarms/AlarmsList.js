import React, { useContext } from "react";
import AuthContext from "../../context/autenticacion/authContext";
import alarmContext from "../../context/alarms/alarmContext";
import StatsCard from "../layout/StatsCard";
import {  Alert , Col} from "react-bootstrap";
import AlarmsTable from "./AlarmsTable";
import uuidv4 from 'uuid/v4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import clienteAxios from '../../config/axios';



function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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
                assignTo: " ",
                assignDate: null
            })
        }
        if ( dataset[i].spacet >= 24 &&  dataset[i ].safanfrequency === 60 &&  dataset[i ].chwvalveposition < 100){
            alarms.push({
                message: "CHW Valve Not Fully Open",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: " ",
                assignDate: null
            })
        }
        if ( dataset[i].spacet <= 22 &&  dataset[i ].safanfrequency === 40 &&  dataset[i ].chwvalveposition > 0){
            alarms.push({
                message: "CHW Valve Not Fully Closed",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: " ",
                assignDate: null
            })
        }
        if ( dataset[i].saductstpressure >= 110 &&  dataset[i ].safanfrequency > 40 ){
            alarms.push({
                message: "SA Fan Unable to Reach Minimum Frequency",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: " ",
                assignDate: null
            })
        }
        if ( dataset[i].saductstpressure <= 90 &&  dataset[i ].safr < 1000){
            alarms.push({
                message: "SA Fan Flow Rate Unable to Reach Maximum",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: " ",
                assignDate: null
            })
        }
        if ( dataset[i].saductstpressure >= 110 &&  dataset[i ].safr > 600){
            alarms.push({
                message:  "SA Fan Flow Rate Unable to Reach Minimum",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: " ",
                assignDate: null
            })
        }

        if ( dataset[i].space <= 400 &&  dataset[i ].oadamperopen > 0){
            alarms.push({
                message:   "OA Damper Unable to Reach Minimum Position",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: " ",
                assignDate: null
            })
        }
        if ( dataset[i].space >= 2400 &&  dataset[i ].oadamperopen < 30){
            alarms.push({
                message:   "OA Damper Unable to Reach Maximum Position",
                status: "Open",
                start: convert(dataset[i].date),
                assignTo: " ",
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
    console.log('userss ==>',usuario)
    if (alarms.length === 0){
    for (var i = 0 ; i < newAlarms.length ; i++){
        createAlarm({
            message: newAlarms[i].message,
            start: newAlarms[i].start,
            status: newAlarms[i].status
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
  
    const handleAssigment = async event => {
        event.preventDefault();
        const email = event.currentTarget.value;
        const index = event.currentTarget.selectedIndex;
        const name = event.nativeEvent.target[index].text;
        const message = event.currentTarget.name;
        const id = event.currentTarget.id;
        const userName = event.nativeEvent.target[index].id;
        await clienteAxios.post('/api/alarms', {
            message: `This alarm was assigned to you:${message}`,
            email: email,
            name : name,
            id : id,
            userName : userName
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => console.log(error))
      };
    return (
        <Col>
        <StatsCard
        bigIcon={<i className="pe-7s-graph1 text-danger" />}
        statsText="Alarms"
        bg="danger"
        statsValue={alarms.length}
        statsIcon={<FontAwesomeIcon icon={ faClock} size="3x" color="white"/> 
    }
        statsIconText="Checked 30 minutes ago"
      />
    {alarms.map((alarm) => (
        <Alert 
        variant="danger"
        key={uuidv4()}>
            {convert(alarm.start)}
            <span>{"\n"}</span>
            {alarm.message}
            { usuario.admin ? 
            <div>
            <span> {"\n"} Assign to: </span>
            <select 
            name={alarm.message}
            id = {alarm._id}
            className="btn btn-secundario btn-block"
            onChange = {handleAssigment}
            disabled={alarm.assignTo ? true : false} 
            > 
             {alarm.assignTo ? <option> Assigned </option>: <option> Select a person</option> }
            {usuarios.map((usuario) => 
                <option selected={alarm.assignTo === usuario.name} value={usuario.email} key= {usuario._id} id={usuario.name}> {usuario.name} </option>
                )}
            </select>
            </div> :  alarm.assignTo ? 
             <div>
        
            <button 
            onClick = {()=> handleClick(alarm._id)} 
            className="btn btn-secundario btn-block"
            > 
            DONE
            </button>
            </div> : null
            }
        </Alert>
    ))}
            <AlarmsTable 
            alarms={alarms}
            />
        </Col>
    );
  };
  
  export default AlarmsList;
  