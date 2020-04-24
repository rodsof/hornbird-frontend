import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Card from "./Card";
import uuidv4 from 'uuid/v4';

const ChartTable = (charts) => {
return (
<div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Data"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                     <th>Date</th>
                     <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {charts.charts.map((chart) => {
                        return (
                          <tr
                          key={uuidv4()}
                          >
                            <td> {chart.label} </td>
                            <td> {chart.value} </td>
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
export default ChartTable;