import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Nav from 'react-bootstrap/esm/Nav';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Navbar from 'react-bootstrap/esm/Navbar';
import Row from 'react-bootstrap/esm/Row';
import { DatatypesForm } from './DatatypesForm';
import { LoginWithGithub } from './Login/LoginWithGithub';
import {Meteor} from 'meteor/meteor'
import {useFind, useSubscribe} from 'meteor/react-meteor-data'
import { ColDatatype, IDatatype } from '../api/Datatypes/Datatypes';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { DatatypeConverters } from '../api/Datatypes/converters';


export const App = () => {

  const dtReady = useSubscribe("datatypes.allMine")
  const dts = useFind(() => ColDatatype.find({}))

  console.log(dts)

  const [showLM, setShowLM] = useState(true)
  const handleCloseLeftMenu = () => setShowLM(false)
  const showLeftMenu = () => setShowLM(true)

  // currently selected datatype
  const [currentDT, setCurrentDT] = useState<IDatatype | null>(null)
  console.log(currentDT)

  // editing datatype or not
  const [editingDT, setEditingDT] = useState(false)

  // text strings with generated files
  const [tsInterfaceFile, setTSInterfaceFile] = useState("")

  const generateFiles = (d: IDatatype) => {
    
    setTSInterfaceFile(DatatypeConverters.tsInterface(d))
    
  }


  return <>
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
            {Meteor.userId() ? <span>Hello, {Meteor.user()?.profile?.name}</span> : <LoginWithGithub />}
            
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    
    <Container fluid>
      <Row>
        <Col xl={12} xxl={6}>
        <h5>Datatypes</h5>
        {editingDT ? <DatatypesForm /> : 
        <SyntaxHighlighter language="typescript" style={dark}>
      {tsInterfaceFile}
    </SyntaxHighlighter>}
        
        </Col>
      </Row>
    </Container>


    <Offcanvas show={showLM} onHide={handleCloseLeftMenu}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Apps</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h5>Datatypes</h5>
          {dts.map((d,i) => <>
          <a href="#" onClick={()=> {
            setCurrentDT(d)
            generateFiles(d)
            }}>{d.name}</a>
          </>)}
        </Offcanvas.Body>
      </Offcanvas>
  </>
}
