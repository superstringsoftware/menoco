import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Nav from 'react-bootstrap/esm/Nav';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Navbar from 'react-bootstrap/esm/Navbar';
import Row from 'react-bootstrap/esm/Row';
import { DatatypesForm } from './DatatypesForm';


export const App = () => (
  <>
   <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">menoco</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    
    <Container fluid>
      <Row>
        <Col xl={12} xxl={6}>
        <h5>Datatypes</h5>
        <DatatypesForm />
        </Col>
      </Row>
    </Container>
  </>
);
