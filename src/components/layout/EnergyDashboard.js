import React,{ useContext } from 'react';
import chartContext from "../../context/charts/chartContext";
import AuthContext from "../../context/autenticacion/authContext";
import { Row, Col} from "react-bootstrap";
import Card from "../charts/Card";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import StatsCard from './StatsCard';
import moment from 'moment';
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}


 function getEnergyMonthly(dataset){
   let monthlyEnergyAcum=0;
   let todayEnergy=0;
   let weeklyEnergyAcum = 0;
   var today = new Date();
   var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   for (var i = 0 ; i < dataset.length ; i++){
    var date = new Date(dataset[i].date);

   if (convert(dataset[i].date) === convert(currentDate)){
    todayEnergy =  dataset[i].energymonthly 
   }
  //today.getmonth returns month-1
  if (date.getMonth() === today.getMonth()){
      monthlyEnergyAcum =  monthlyEnergyAcum + dataset[i].energymonthly;
  }
  var now = moment();
var input = moment(dataset[i].date);
var isThisWeek = (now.isoWeek() === input.isoWeek())
if ( isThisWeek) {
   weeklyEnergyAcum = weeklyEnergyAcum + dataset[i].energymonthly;
}
}
let data = {
  todayEnergy : todayEnergy,
  monthlyEnergy : monthlyEnergyAcum,
  weeklyEnergy : weeklyEnergyAcum
}
return data;
  }


function getTotalEnergy(dataset){
  let data = [];
  for (var i = 0 ; i < dataset.length ; i++)
   data.push({
   label: convert(dataset[i].date) ,
   value:  dataset[i].energymonthly
 })
 return data;
};   


function getAhuCop(dataset){
  let data = [];
  for (var i = 0 ; i < dataset.length ; i++)
   data.push({
   label: convert(dataset[i].date) ,
   value:  dataset[i].ahucop
 })
 return data;
};  

const EnergyDashboard = () => {
    const chartsContext = useContext(chartContext);
    const { getDataset, dataset } = chartsContext;
    let ahucop = { };
    let energy = { };
    let totalEnergy = [];
    let lastDate;
    let minDate;
 
  const authContext = useContext(AuthContext);
    if (!dataset){
      getDataset();
  }
  else{
    energy = getEnergyMonthly(dataset);
    if (dataset.length >0 ){
    lastDate = dataset[dataset.length -1].date;
    }
    ahucop = getAhuCop(dataset);
    totalEnergy = getTotalEnergy(dataset);
  }

    setTimeout(() => {
        energy = getEnergyMonthly(dataset);
        lastDate = dataset[dataset.length -1].date;
        ahucop = getAhuCop(dataset);
      }, 3600000); // every half hour

    return ( 
      <div>
        <Row>
        <div className="col-3">
        <div className="row nopadding">
        <StatsCard 
          statsValue={energy.todayEnergy}
          statsText="Energy This Day"
          bg="success"
          bigIcon={<i className="pe-7s-graph1 text-danger" />}
          statsIcon={<i className="fa fa-clock-o" />}
          statsIconText="This Day"
          />
          </div>
          <div className="row nopadding">
           <StatsCard 
          statsValue={energy.weeklyEnergy}
          statsText="Energy This Week"
          bg="info"
          bigIcon={<i className="pe-7s-graph1 text-danger" />}
          statsIcon={<i className="fa fa-clock-o" />}
          statsIconText="This Week "
          />
          </div>
          <div className="row nopadding">
          <StatsCard 
          statsValue={energy.monthlyEnergy}
          statsText="Energy This Month"
          bg="danger"
          bigIcon={<i className="pe-7s-graph1 text-danger" />}
          statsIcon={<i className="fa fa-clock-o" />}
          statsIconText="This Month"
          />
          </div>
          </div>
          <div className="col-9">
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Energy"
                category="Energy"
                stats="Updated 30 minutes ago"
                content={
                  <div className="ct-chart">
                    <BarChart
                      data={totalEnergy}
                      title="Energy"
                      color = "#2F4B8A"
                      max = {lastDate}
                      min = {minDate}
                      unit = "kWh"
                    />
                  </div>
                }      
              />
        </div>
        </Row>
        <Row>
        <div className="col-12 nopadding">
        <Card
          statsIcon="fa fa-history"
          id="chartHours"
          title="AHU COP"
          category="AHU COP"
          stats="Updated 30 minutes ago"
          content={
            <div className="ct">
                <LineChart
                data={ahucop}
                title="AHU COP"
                color="#FA0000"
                unit=""
              />
            </div>
          }
        />
        </div>
        </Row>
  </div>
     );
}
 
export default EnergyDashboard;