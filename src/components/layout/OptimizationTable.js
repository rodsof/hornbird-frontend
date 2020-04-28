import React from "react";
import { Table, Card, Dropdown } from "react-bootstrap";

const Example = (props) => {

  console.log("props.energyTableData====>", props.energyTableData)
  return (
    <Card style={{ padding: "30px" }}>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
          <th></th>

            <th>Date</th>
            <th>Tin Condenser, C</th>
            <th>chwtout</th>
            <th>dT Air, C</th>
            <th>dT CHW</th>
            <th>safanfrequency</th>
            <th>totalpower</th>


          </tr>
        </thead>
        <tbody>
         
              <tr>
              <th>Current Reading</th>
              <td>{props.energyTableData && props.energyTableData["Current Reading"]["date"]}</td>

                <td>{props.energyTableData && props.energyTableData["Current Reading"]["Tin Condenser, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Current Reading"]["chwtout"]}</td>
                <td>{props.energyTableData && props.energyTableData["Current Reading"]["dT Air, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Current Reading"]["dT CHW, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Current Reading"]["safanfrequency"]}</td>
                <td>{props.energyTableData && props.energyTableData["Current Reading"]["totalpower"]}</td>

              </tr>

              <tr>
              <th>Last Reading</th>
              <td>{props.energyTableData && props.energyTableData["Last Reading"]["date"]}</td>

                <td>{props.energyTableData && props.energyTableData["Last Reading"]["Tin Condenser, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Last Reading"]["chwtout"]}</td>
                <td>{props.energyTableData && props.energyTableData["Last Reading"]["dT Air, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Last Reading"]["dT CHW, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Last Reading"]["safanfrequency"]}</td>
                <td>{props.energyTableData && props.energyTableData["Last Reading"]["totalpower"]}</td>

              </tr>

              <tr>
              <th>Optimized Current Reading</th>
              <td>{props.energyTableData && props.energyTableData["Optimized Current Reading"]["date"]}</td>

                <td>{props.energyTableData && props.energyTableData["Optimized Current Reading"]["Tin Condenser, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Optimized Current Reading"]["chwtout"]}</td>
                <td>{props.energyTableData && props.energyTableData["Optimized Current Reading"]["dT Air, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Optimized Current Reading"]["dT CHW, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["Optimized Current Reading"]["safanfrequency"]}</td>
                <td>{props.energyTableData && props.energyTableData["Optimized Current Reading"]["totalpower"]}</td>

              </tr>
           
        </tbody>
      </Table>
    </Card>
  );
};

export default Example;
