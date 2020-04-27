import React, { useState } from "react";
import { Table, Card, Dropdown, Modal, Button, Form } from "react-bootstrap";
import { Pencil } from 'react-bootstrap-icons';

const Example = (props) => {
  const [modal, setModal] = useState(false)
  const [name, setName] = useState("")
  const [lower, setLower] = useState("")
  const [upper, setUpper] = useState("")
  let arr = []
  console.log("FAULTtABLEdata=====>",props.faultTableData)
  // props.faultTableData
  // if (props.faultTableData) {
  //   for (var k in props.faultTableData) {
  //     arr.push({ name: k,condition:props.faultTableData[k].status,value:props.faultTableData[k].status, })
  //   }
  // }

  const submitParams = () => {
    if (name && lower && upper) {

      props.setParameters(name, lower, upper)
      setModal(false)
    }
    else {
      alert("Please enter fields properly")
    }

  }

  return (
    <Card style={{ padding: "30px" }}>
      <Modal
        show={modal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Parameters
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" disabled value={name} onChange={(e) => setName(e.target.value)} />

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lower</Form.Label>
              <Form.Control type="text" placeholder="Lower" value={lower} onChange={(e) => setLower(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Upper</Form.Label>
              <Form.Control type="text" placeholder="Upper" value={upper} onChange={(e) => setUpper(e.target.value)} />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => submitParams()} >
            Submit
            </Button>
          <Button onClick={() => setModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Select</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onSelect={() => props.getSelectedItems("sensor")} >Sensor</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onSelect={() => props.getSelectedItems("actuator")} >Actuator</Dropdown.Item>
          <Dropdown.Item href="#/action-3" onSelect={() => props.getSelectedItems("motor")}>Motor</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>HEALTH CONDITION</th>
            <th>SET PARAMETERS</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
          { props.faultTableData &&  props.faultTableData.map((item, inx) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.condition}</td>
                <td>{item.params} <span onClick={() => {setModal(true); setName(item.name)}} style={{ float: "right", padding: "5px", cursor: "pointer" }}>
                  <Pencil color="gray" size={20} />


                </span>

                </td>
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
