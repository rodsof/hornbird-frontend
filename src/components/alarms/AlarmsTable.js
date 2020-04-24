import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Card from "../charts/Card";
import uuidv4 from 'uuid/v4';

const AlarmsTable = (alarms) => {
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
return (
<div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Alarms"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                     <th>Alarm Description</th>
                     <th>Start</th>
                     <th>Status</th>
                     <th>Assign To</th>
                     <th>Assign Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alarms.alarms.map((alarm) => {
                        return (
                          <tr
                          key={uuidv4()}
                          >
                            <td> {alarm.message} </td>
                            <td> {convert(alarm.start)} </td>
                            <td> {alarm.status} </td>
                            <td> {alarm.assignTo} </td>
                            <td> {alarm.assignDate} </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
            </Row>
            </Container>
            </div>
);
}
export default AlarmsTable;