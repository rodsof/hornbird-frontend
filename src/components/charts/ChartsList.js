import React, {  useContext,  useState } from "react";
import chartContext from "../../context/charts/chartContext";
import {Dropdown, Row, Col, Container } from "react-bootstrap";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Card from "./Card";
import uuidv4 from 'uuid/v4';
import ChartTable from "./ChartTable";

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
// Data generation
function getRandomArray(dataset, title) {
  // Create random array of objects
  let data = [];
  let delivering = false;
  if (!delivering) {
    for (var i = 0; i < dataset.length; i++) {
      if (title === "CHW TIN") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].chwtin
        });
      }
      if (title === "CHW TOUT") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].chwtout
        }); // falta agregar para energy
      }
      if (title === "SA T") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].sat
        }); // falta agregar para energy
      }
      if (title === "SPACE T") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].spacet
        }); // falta agregar para energy
      }   if (title === "OA T") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].oat
        }); // falta agregar para energy
      }
      if (title === "SA DUCT ST PRESSURE") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].saductstpressure
        }); // falta agregar para energy
      }
      if (title === "OAT RH") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].oatrh
        }); // falta agregar para energy
      }
      if (title === "Space RH") {
        data.push({
          label: convert(dataset[i].date),
          value: dataset[i].spacerh
        }); // falta agregar para energy
      }
    }
  } else {
    let dates = getRandomDateArray(15);
    for (var i = 0; i < dates.length; i++) {
      data.push({
        label: dates[i].time,
        value: Math.round(20 + 80 * Math.random())
      });
    }
  }
  return data;
}

function getTemperature(dataset){
  let data = [];
   data.push({
   label: "SA T" ,
   value:  dataset[dataset.length -1].sat
 })
 data.push({
  label: "Space T" ,
  value:  dataset[dataset.length -1].spacet
})
data.push({
  label: "CHW TIN" ,
  value:  dataset[dataset.length -1].chwtin
})
data.push({
  label: "CHW TOUT" ,
  value:  dataset[dataset.length -1].chwtout
})
data.push({
  label: "OA T" ,
  value:  dataset[dataset.length -1].oat
})
 return data;
}
function getPressures(dataset){
  let data = [];
  data.push({
  label: "SA DUCT ST PRESSURE" ,
  value:  dataset[dataset.length -1].saductstpressure
})
return data;
}

function getHumidity(dataset){
  let data = [];
data.push({
 label: "SPACE RH" ,
 value:  dataset[dataset.length -1].spacerh
})
data.push({
 label: "OAT RH" ,
 value:  dataset[dataset.length -1].oatrh
})
return data;
}




function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date("2018-05-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs).toLocaleDateString(),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function randomFeeds(dataset, category) {
  let feeds = [];
  if (category === "TEMPERATURE") {
    feeds.push({
      title: "CHW TOUT",
      unit: "ºC",
      data: getRandomArray(dataset, "CHW TOUT"),
      color: "#9368E9"
    });

    feeds.push({
      title: "CHW TIN",
      unit: "ºC",
      data: getRandomArray(dataset, "CHW TIN"),
      color: "#FFA534"
    });
    feeds.push({
      title: "OA T",
      data: getRandomArray(dataset, "OA T"),
      color: "#87CB16",
      unit: "ºC"
    });
    feeds.push({
      title: "SPACE T",
      unit: "ºC",
      data: getRandomArray(dataset, "SPACE T"),
      color: "cd0000"
    });
    feeds.push({
      title: "SA T",
      unit: "ºC",
      data: getRandomArray(dataset, "SA T"),
      color: "#1DC7EA"
    });
  }
  if (category === "PRESSURE") {
    feeds.push({
      title: "SA DUCT ST PRESSURE",
      unit: "Pa",
      data: getRandomArray(dataset, "SA DUCT ST PRESSURE"),
      color: "#cd0000"
    });
  }
  if (category === "HUMIDITY") {
    feeds.push({
      title: "Space RH",
      unit: "RH",
      data: getRandomArray(dataset, "Space RH"),
      color: "#cd0000"
    });
    feeds.push({
      title: "OAT RH",
      unit: "RH",
      data: getRandomArray(dataset, "OAT RH"),
      color: "#cd0000"
    });
  }
 
  return feeds;
}


const ChartsList = () => {
  

  const chartsContext = useContext(chartContext);
  const { getDataset, dataset } = chartsContext;

  const [click, handleClick] = useState(null);
  const [selectedIndex, handleClickCard] = useState(null);
  const [category, saveCategory] = useState(null);
let feeds =  randomFeeds(dataset, category);


  if (!dataset){
    getDataset();
}


const handleClickTemperature = e => {
  e.preventDefault();
  saveCategory("TEMPERATURE");
  handleClick(true);
} 

const handleClickChart = i => {
  handleClickCard(i);
}
const backToBar = e => {
  e.preventDefault();
  handleClickCard(null);
}
const handleClickPressure = e => {
  e.preventDefault();
  saveCategory("PRESSURE");
  handleClick(true);
}

const handleClickHumidity = e => {
  e.preventDefault();
  saveCategory("HUMIDITY");
  handleClick(true);
}


  setTimeout(() => {
    feeds = (randomFeeds(dataset, category));
  }, 360000);



if (selectedIndex!== null) {
  return (
    <Col>
                <button 
                className="btn btn-secundario"
                onClick={backToBar}> Back </button>
                <Card
                statsIcon="fa fa-clock-o"
                title="feed"
                stats="30 minutes ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct"
                  >
                    <LineChart data={feeds[selectedIndex].data} title={feeds[selectedIndex].title} color={feeds[selectedIndex].color}
                    unit={feeds[selectedIndex].unit} />
                  </div>
                }
              /> 
             <ChartTable charts = {feeds[selectedIndex].data} />
              </Col>
  );
  }
else {
  return (
    <div className="content">
        <Container fluid>
      <Dropdown>
    {category === "TEMPERATURE" ? <Dropdown.Toggle variant="info" id="dropdown-basic">Temperature  </Dropdown.Toggle>
    : category === "PRESSURE" ? <Dropdown.Toggle variant="info" id="dropdown-basic">Pressure  </Dropdown.Toggle>
      : category === "HUMIDITY" ? <Dropdown.Toggle variant="info" id="dropdown-basic"> Humidity </Dropdown.Toggle> : 
      <Dropdown.Toggle variant="info" id="dropdown-basic">Select Group</Dropdown.Toggle>}
 
  <Dropdown.Menu>
    <Dropdown.Item onClick={handleClickTemperature}>Temperature</Dropdown.Item>
    <Dropdown.Item onClick={handleClickPressure}>Pressure</Dropdown.Item>
    <Dropdown.Item onClick={handleClickHumidity}>Humidity</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     
              { click ? 
                   <Row>
                    {feeds.map((feed,index) => (
                    <Col
                    key={uuidv4()}
                    onClick={()=> handleClickChart(index)} >
                     <Card
                     statsIcon="fa fa-clock-o"
                     title={feed.title}
                     stats="30 minutes ago"
                     key={uuidv4()}
                     content={
                       <div
                         id="chartPreferences"
                         className="ct-chart ct-perfect-fourth"
                       >
                         <BarChart 
                         data = {feed.data} 
                         title = {feed.title}
                        color = {feed.color}
                        unit = {feed.unit}
                        />
                       </div>
                     }
                   />
                   </Col>
                         ))}
                         </Row>
                      : null}
              </Container>
              </div>     
                  
  );

}
}
export default ChartsList;
