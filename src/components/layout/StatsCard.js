/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export class StatsCard extends Component {
  render() {
    return (
      <div className={`card card-stats bg-${this.props.bg}`}>
        <div className="content">
          <Row>
            <Col xs={6}>
              <div className="numbers">
                <p>{this.props.statsText1}</p>
                <p> {this.props.statsValue1} {this.props.unit} </p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="numbers">
                <p>{this.props.statsText2}</p>
                <p> {this.props.statsValue2} {this.props.unit} </p>
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            { !isNaN(this.props.amount) && isFinite(this.props.amount) ?
            <span>Change: {this.props.amount} %</span>
            :
            null }
            <hr />
            <div className="stats">
              {this.props.statsIcon} {this.props.statsIconText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
