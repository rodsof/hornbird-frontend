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
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import ChartTable from "../charts/ChartTable";
import OptimizationTable from "./OptimizationTable";

const data = [
  {
    date: "02/12/2020 12:03:34",
    name: "Actuator",
    condition: "Short description",
    params: "Range",
    value: "+30",
  },
  {
    date: "02/12/2020 12:03:34",
    name: "Sensor",
    condition: "Short description",
    params: "Range",
    value: "+45",
  },
  {
    date: "02/12/2020 12:03:34",
    name: "Motor",
    condition: "Short description",
    params: "Range",
    value: "-12",
  },
];
let totalEnergy = [];
let lastDate;
let minDate;

function getTotalEnergy(dataset) {
  let data = [];
  for (var i = 0; i < dataset.length; i++)
    data.push({
      label: convert(dataset[i].date),
      value: dataset[i].energymonthly,
    });
  return data;
}

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

const EnergyOptimization = (props) => {
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
  }, []);

  // item changes
  useEffect(() => {
    getUsers();
    getDataset();
    // eslint-disable-next-line
  }, [item]);

  if (item) {
    name = item[0].name;
  }

  if (dataset.length > 0) {
    lastDate = dataset[dataset.length - 1].date;
  }
  totalEnergy = getTotalEnergy(dataset);

  console.log("dataset=-=>", dataset);
  return (
    <div className="row">
      <div className="col-md-12 nopadding">
        <Bar />
      </div>
      {dashboard ? (
        <div className="col-md-3 nopadding">
          <Dashboard />
        </div>
      ) : null}
      <div className="col-md-9 nopadding">
        <main style={{ paddingTop: 20 }}>
          <Container>
            <Row>
              <Col>
                <h4>Energy Optimization</h4>
              </Col>
            </Row>
            <hr />
            <br />
            <Row>
              <Col>
                <h4>dT Air SA Fan Frequency</h4>
              </Col>
            </Row>
            <br />
            <br />
            <div
              className="ct-chart"
              style={{ height: 300, width: "33%", display: "inline-block" }}
            >
              <BarChart
                data={totalEnergy}
                title="Energy"
                color="#2F4B8A"
                max={lastDate}
                min={minDate}
                unit="kWh"
              />
            </div>
            <div
              className="ct-chart"
              style={{ height: 300, width: "33%", display: "inline-block" }}
            >
              <BarChart
                data={totalEnergy}
                title="Energy"
                color="#2F4B8A"
                max={lastDate}
                min={minDate}
                unit="kWh"
              />
            </div>{" "}
            <div
              className="ct-chart"
              style={{ height: 300, width: "33%", display: "inline-block" }}
            >
              <BarChart
                data={totalEnergy}
                title="Energy"
                color="#2F4B8A"
                max={lastDate}
                min={minDate}
                unit="kWh"
              />
            </div>
            <br />
            <br />
            <Row>
              <Col>
                <h4 style={{marginBottom:20}} >Optimization</h4>
              </Col>
            </Row>
            <OptimizationTable data={data} />
            <Row>
              <Col>
                <h4 style={{marginBottom:20}} >Optimization</h4>
              </Col>
            </Row>
            <OptimizationTable data={data} />
            <Row>
              <Col>
                <h4 style={{marginBottom:20}} >Optimization</h4>
              </Col>
            </Row>
            <OptimizationTable data={data} />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default EnergyOptimization;
