import React, { useContext, useEffect } from "react";
import Dashboard from "../layout/Dashboard";
import Bar from "../layout/Bar";
import ChartsList from "../charts/ChartsList";
import AlarmsList from "../alarms/AlarmsList";
import AuthContext from "../../context/autenticacion/authContext";
import itemContext from "../../context/items/itemContext";
import DashboardContext from "../../context/dashboard/dashboardContext";
import EnergyDashboard from "./EnergyDashboard";
import chartContext from "../../context/charts/chartContext";
import { Container, Row, Col } from "react-bootstrap";
import BarChart from "../charts/BarChart"
import LineChart from "../charts/LineChart"
import ChartTable from "../charts/ChartTable"
import FaultTable from "./FaultTable"


const data = [
  {
    date: "02/12/2020 12:03:34",
    name: "Actuator",
    condition: "Short description",
    params: "Range",
    value: "+30"
  },
  {
    date: "02/12/2020 12:03:34",
    name: "Sensor",
    condition: "Short description",
    params: "Range",
    value: "+45"
  },
  {
    date: "02/12/2020 12:03:34",
    name: "Motor",
    condition: "Short description",
    params: "Range",
    value: "-12"
  },
]

const tableData = []
const FaultPrediction = (props) => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, getUsers, usuarios } = authContext;
  const itemsContext = useContext(itemContext);
  const { item, getSelectedTable, faultTableData, setParameters, setParams } = itemsContext;
  let name = "";
  const dashboardContext = useContext(DashboardContext);
  const { dashboard } = dashboardContext;

  const chartsContext = useContext(chartContext);
  const { getDataset, dataset, getMachineCondition, machineConditionData } = chartsContext;
  useEffect(() => {
    usuarioAutenticado();

    // eslint-disable-next-line
  }, [])

  // item changes
  useEffect(() => {
    getUsers();
    getDataset();
    getMachineCondition()
    getSelectedTable();
    // getGraph();

    // eslint-disable-next-line
  }, [item]);

  if (item) {
    name = item[0].name;
  }

  const getSelectedItems = (select) => {
    getSelectedTable(select);
  }

  


  // console.log("getMachineCondition=-=>", machineConditionData)
  // if (faultTableData) {

  //   console.log("faultTableData======>", faultTableData["CHW FR, L/s"])
  //   for (var k in faultTableData) {
  //     console.log("faultTableData", k, faultTableData[k])
  //   }
  // }
  // console.log("setParams====>",setParams)
  if(setParams){
    alert(setParams.msg)
  }
  return (
    <div className="row">
      <div className="col-md-12 nopadding">
        <Bar
        />
      </div>
      {dashboard ?
        <div className="col-md-3 nopadding">
          <Dashboard
          />
        </div>
        :
        null}
      <div className="col-md-9 nopadding">
        <main style={{ paddingTop: 20 }} >
          <Container>
            <Row>
              <Col>
                <h4>Fault Predictions</h4>
              </Col>
            </Row>
            <hr />
            <br />
            <Row>
              <Col>
                <h4>Condition Monitoring</h4>
              </Col>
            </Row>
            <br />
            <br />


            {/* <div className="ct-chart">

              <BarChart
                // data={[{ label: "jan", value: 1 }, { label: "feb", value:2 },{ label: "mar", value: 2 }, { label: "apr", value: 4 }]}
                // data={dataset}
                
                title="Energy"
                color="#2F4B8A"
                max={6}
                min={0}
                unit="kWh"
              />
            </div> */}

            <div className="ct-chart" style={{ width: "500px", alignSelf: "flex-end",padding:"30px",margin:"30px" }}>

              <LineChart
                // data={[{ label: "jan", value: 30 }, { label: "feb", value:60 },{ label: "mar", value: 90 }, { label: "apr", value: 150 }]}
                // data={dataset}
                data={machineConditionData ? machineConditionData: [{label:"wait",value:1,threshold:3.9}]}
                title="Energy"
                color="#2F4B8A"
                // max={10}
                // min={1}
                unit="kWh"
              />

              <h5 style={{ marginLeft: '200px' }}>Date / Time</h5>
            </div>
            <br />
            <br />
            <Row>
              <Col>
                <h4>Anamoly Detector</h4>
              </Col>
            </Row>

            <FaultTable data={data} getSelectedItems={getSelectedItems} setParameters={setParameters} faultTableData={faultTableData} />

          </Container>
        </main>
      </div>
    </div>
  );
};

export default FaultPrediction;







// {CHW FR, L/s: "{'status': 'normal', 'anamoly_value': '--'}",
//  CHW Valve Position, %: "{'status': 'normal', 'anamoly_value': '--'}",
//   OA Damper Open, %: "{'status': 'normal', 'anamoly_value': '--'}"}
// CHW FR, L/s: "{'status': 'normal', 'anamoly_value': '--'}"
// CHW Valve Position, %: "{'status': 'normal', 'anamoly_value': '--'}"
// OA Damper Open, %: "{'status': 'normal', 'anamoly_value': '--'}"



// getMachineCondition=-=> 
// {"columns":["Mob dist","Thresh","Anomaly"],
// "index":[1583550000000,1583204400000,1583809210000,1582686010000,1582772410000,1582599610000,1582513210000,1582354810000,1582426810000,1582254010000,1606878000000,1606878000000,1583895610000,1583982010000,1584068400000,1584154800000],
// "data":[[1.1347054098,3.9509060001,false],[1.1347054098,3.9509060001,false],[1.1347054098,3.9509060001,false],[1.1347054098,3.9509060001,false],[1.3674697145,3.9509060001,false],[1.8872258607,3.9509060001,false],[0.9724108503,3.9509060001,false],[1.3999764816,3.9509060001,false],[1.5274755983,3.9509060001,false],[1.4763065226,3.9509060001,false],[0.5953844765,3.9509060001,false],[1.9827419417,3.9509060001,false],[1.4763065226,3.9509060001,false],[2.4332758613,3.9509060001,false],[1.9827419417,3.9509060001,false],[1.9827419417,3.9509060001,false]]}



// "{\"Last Reading\":{\"dT Air, C\":17,\"safanfrequency\":56.0,\"chwtout\":11.0,\"dT CHW, C\":6.6,\"Tin Condenser, C\":30.0,\"totalpower\":869},\"Current Reading\":{\"dT Air, C\":17,\"safanfrequency\":56.0,\"chwtout\":11.0,\"dT CHW, C\":3.8,\"Tin Condenser, C\":30.0,\"totalpower\":869},\"Optimized Current Reading\":{\"dT Air, C\":17,\"safanfrequency\":60.0,\"chwtout\":12.944,\"dT CHW, C\":3.8,\"Tin Condenser, C\":26.477,\"totalpower\":869}}"