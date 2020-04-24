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


const FaultPrediction = (props) => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, getUsers, usuarios } = authContext;
  const itemsContext = useContext(itemContext);
  const { item } = itemsContext;
  let name = "";
  const dashboardContext = useContext(DashboardContext);
  const { dashboard } = dashboardContext;

  const chartsContext = useContext(chartContext);
  const { getDataset, dataset } = chartsContext;
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [])

  // item changes
  useEffect(() => {
    getUsers();
    getDataset();
    // eslint-disable-next-line
  }, [item]);

  if (item) {
    name = item[0].name;
  }

  console.log("dataset=-=>",dataset)
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
        <main style={{paddingTop:20}} >
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

            <div className="ct-chart" style={{width:"500px",alignSelf:"flex-end"}}>

              <LineChart
                // data={[{ label: "jan", value: 30 }, { label: "feb", value:60 },{ label: "mar", value: 90 }, { label: "apr", value: 150 }]}
                data={dataset}
                title="Energy"
                color="#2F4B8A"
                max={0.01}
                min={0}
                unit="kWh"
              />
              <h5 style={{marginLeft:'200px'}}>Date / Time</h5>
            </div>
            <br />
            <br />
            <Row>
              <Col>
                <h4>Anamoly Detector</h4>
              </Col>
            </Row>
            {/* <ChartTable chart={[{}]} /> */}

            <FaultTable data={data} />

          </Container>
        </main>
      </div>
    </div>
  );
};

export default FaultPrediction;