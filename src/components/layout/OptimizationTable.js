import React from "react";
import { Table, Card, Dropdown } from "react-bootstrap";

const Example = (props) => {

  console.log("props.energyTableData====>", props.energyTableData)
  return (
    <Card style={{ padding: "30px" }}>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
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
                <td>{props.energyTableData && props.energyTableData["Tin Condenser, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["chwtout"]}</td>
                <td>{props.energyTableData && props.energyTableData["dT Air, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["dT CHW, C"]}</td>
                <td>{props.energyTableData && props.energyTableData["safanfrequency"]}</td>
                <td>{props.energyTableData && props.energyTableData["totalpower"]}</td>

              </tr>
           
        </tbody>
      </Table>
    </Card>
  );
};

export default Example;
