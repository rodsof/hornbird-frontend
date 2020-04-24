import React from "react";
import { Table, Card, Dropdown } from "react-bootstrap";

const Example = (props) => {
  return (
    <Card style={{ padding: "30px" }}>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Select</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Sensor</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Actuator</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Motor</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>HEALTH CONDITION</th>
            <th>SET PARAMETERS</th>
            <th>VALUE</th>
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
                <td>{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default Example;
