import React, { useContext, useEffect } from "react";
import Dashboard from "../layout/Dashboard";
import Bar from "../layout/Bar";
import AuthContext from "../../context/autenticacion/authContext";
import itemContext from "../../context/items/itemContext";
import DashboardContext from "../../context/dashboard/dashboardContext";
import chartContext from "../../context/charts/chartContext";
import { Container, Row, Col } from "react-bootstrap";
import BarChart from "../charts/BarChart";
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
let totalEnergy_1 = [];
let totalEnergy_2 = [];
let totalEnergy_3 = [];
let totalEnergy_4 = [];

let lastDate;
let minDate;
// function getTotalEnergy(x,y) {

function getTotalEnergy(x, y) {
  let data = [];
  for (var i = 0; i < x.length; i++)
    data.push({
      // label: convert(dataset[i].date),
      // value: dataset[i].energymonthly,
      label: x[i],
      value: y[i],
    });
  return data;
}


const EnergyOptimization = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, getUsers } = authContext;
  const itemsContext = useContext(itemContext);
  const { item, getEnergyOptimization, energyTableData } = itemsContext;
  let name = "";
  const dashboardContext = useContext(DashboardContext);
  const { dashboard } = dashboardContext;

  const chartsContext = useContext(chartContext);
  const { getDataset, getGraphApi, graphApiData } = chartsContext;
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  // item changes
  useEffect(() => {
    getUsers();
    getDataset();
    getGraphApi()
    getEnergyOptimization();

    // eslint-disable-next-line
  }, [item]);

  if (item) {
    name = item[0].name;
  }

  // if (dataset.length > 0) {
  //   lastDate = dataset[dataset.length - 1].date;
  // }
  // totalEnergy = getTotalEnergy(dataset);

  if (graphApiData) {

    totalEnergy_1 = getTotalEnergy(graphApiData.X1, graphApiData.y1);
    totalEnergy_2 = getTotalEnergy(graphApiData.X2, graphApiData.y2);
    totalEnergy_3 = getTotalEnergy(graphApiData.X3, graphApiData.y3);
    totalEnergy_4 = getTotalEnergy(graphApiData.X4, graphApiData.y4);

  }

  // console.log("dataset=-=>", dataset);
  // let test=JSON.parse(energyTableData)
  // console.log("energyTableData=-=>", test.columns);
  console.log("energyTableData=-=>", energyTableData);

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
              style={{ height: 300, width: "33%", display: "inline-block", margin: "20px" }}
            >
              <BarChart
                data={totalEnergy_1}
                title="dT Air, C"
                color="#2F4B8A"
                max={lastDate}
                min={minDate}
                unit="SA Fan Frequency, Hz"
              />
            </div>
            <div
              className="ct-chart"
              style={{ height: 300, width: "33%", display: "inline-block", margin: "20px" }}
            >
              <BarChart
                data={totalEnergy_2}
                title="dT CHW, C"
                color="#2F4B8A"
                max={lastDate}
                min={minDate}
                unit="CHW Tout, C"
              />
            </div>{" "}
            <div
              className="ct-chart"
              style={{ height: 300, width: "33%", display: "inline-block", margin: "20px" }}
            >
              <BarChart
                data={totalEnergy_3}
                title="dT CHW, C"
                color="#2F4B8A"
                max={lastDate}
                min={minDate}
                unit="Tin Condenser, C"
              />
            </div>
            <div
              className="ct-chart"
              style={{ height: 300, width: "33%", display: "inline-block", margin: "20px" }}
            >
              <BarChart
                data={totalEnergy_4}
                title="PT, Total PowerPlant Power, KW"
                color="#2F4B8A"
                max={lastDate}
                min={minDate}
                unit="Tin Condenser, C"
              />
            </div>
            <br />
            <br />
            <Row>
              <Col>
                <h4 style={{ marginBottom: 20 }} >Optimization</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>The last reading shows the values read by machine second last time the current reading shows the latest readings and optimize reading shows the readings suggested by AI for better performance.</p>              </Col>
            </Row>
            <OptimizationTable data={data} energyTableData={energyTableData && energyTableData} />
            <br />
            {/* <Row>
              <Col>
                <h4 style={{marginBottom:20}} >Optimization</h4>
              </Col>
            </Row>
            <OptimizationTable data={data} energyTableData={ energyTableData &&  energyTableData["Last Reading"]} />
            <Row>
              <Col>
                <h4 style={{marginBottom:20}}  >Optimization</h4>
              </Col>
            </Row>
            <OptimizationTable data={data} energyTableData={energyTableData && energyTableData["Optimized Current Reading"]} />
         */}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default EnergyOptimization;



// {
//   "columns":["Mob dist","Thresh","Anomaly"],
// "index":[1583550000000,1583204400000,1583809210000,1582686010000,1582772410000,1582599610000,1582513210000,1582354810000,1582426810000,1582254010000,1606878000000,1606878000000,1583895610000,1583982010000,1584068400000,1584154800000],
// "data":[[1.1347054098,3.9509060001,false],[1.1347054098,3.9509060001,false],[1.1347054098,3.9509060001,false],[1.1347054098,3.9509060001,false],[1.3674697145,3.9509060001,false],[1.8872258607,3.9509060001,false],[0.9724108503,3.9509060001,false],[1.3999764816,3.9509060001,false],[1.5274755983,3.9509060001,false],[1.4763065226,3.9509060001,false],[0.5953844765,3.9509060001,false],[1.9827419417,3.9509060001,false],[1.4763065226,3.9509060001,false],[2.4332758613,3.9509060001,false],[1.9827419417,3.9509060001,false],[1.9827419417,3.9509060001,false]]}



// {"Last Reading":{"dT Air, C":17,"safanfrequency":56.0,"chwtout":11.0,"dT CHW, C":6.6,"Tin Condenser, C":30.0,"totalpower":869},
// "Current Reading":{"dT Air, C":17,"safanfrequency":56.0,"chwtout":11.0,"dT CHW, C":3.8,"Tin Condenser, C":30.0,"totalpower":869},
// "Optimized Current Reading":{"dT Air, C":17,"safanfrequency":60.0,"chwtout":12.944,"dT CHW, C":3.8,"Tin Condenser, C":26.477,"totalpower":869}}