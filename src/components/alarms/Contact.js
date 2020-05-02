/* eslint-disable  */
import React, { Component } from "react";
import { Form, Row, Col, Button, Alert, Container } from "react-bootstrap";
import clienteAxios from '../../config/axios';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSending: false,
      isSent: false,
      errors: []
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    this.setState({ isSending: true });
        
       const message = this.props.alarm.message + '. ';
        const id = this.props.alarm._id;
        await clienteAxios.post('/api/alarms', {
            message: `Hi! This alarm was assigned to you: ${message}`,
            email: formData.get("email"),
            id: id
          })
          .then(response => {
            if (response.data === "Message sent") {
                form.reset();
                this.setState({ isSent: true });
      
                setTimeout(() => {
                  this.setState({ isSent: false });
                  //this.props.history.push("/dashboard"); // Redirect to home page after sending message
                }, 13000);
              } else {
                this.setState({ errors: response.data });
                const { errors } = this.state;
                let time = errors.length * 3000;
                setTimeout(() => {
                  this.setState({ errors: [] });
                }, time);
              }
            })
            .catch(error => console.log(error))
            .finally(() => this.setState({ isSending: false }));
  };

  showContactForm() {
    const { isSending, isSent, errors } = this.state;

    if (errors.length > 0) {
      return errors.map((error, i) => {
        return (
          <Alert key={i} variant="danger">
            {error.msg}
          </Alert>
        );
      });
    }

    if (isSent) {
      return (
        <Row className="h-100 justify-content-center align-items-center">
          <Col className="text-center" md={12}>
            <Alert variant="success">MESSAGE SENT (Refresh page) </Alert>
          </Col>
        </Row>
      );
    }

    return (
      <Form className="formContact" onSubmit={this.handleSubmit}>
        <Form.Group as={Col}>
          <Form.Control
            name="email"
            id="email"
            disabled={isSending}
            type="email"
            placeholder="Enter an email"
            > 
            </Form.Control>
        </Form.Group>

        <Form.Group className="pl-3">
          <Button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </Form.Group>
      </Form>
    );
  }
  render() {
    return <Container className="h-100">{this.showContactForm()}</Container>;
  }
}

export default Contact;
