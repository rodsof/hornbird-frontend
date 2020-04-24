import React from "react";
import { Table, Card, Dropdown } from "react-bootstrap";

const Example = (props) => {
  return (
    <Card style={{ padding: "30px" }}>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>DATE</th>
            <th>POWER CONSUMPTION</th>
            <th>ACTUAL SA FAN FREQUENCY</th>
            <th>PREDICTED VALUE</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => {
            return (
              <tr>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.condition}</td>
                <td>{item.params}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default Example;
