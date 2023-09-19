import React, { useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/esm/Row'
import { IDatatypefield } from '../api/Datatypes'
import { Button } from 'react-bootstrap'

export const DatatypesForm = () => {

    const [fields,setFields] = useState<IDatatypefield[]>([])
    const [name, setName] = useState<string>("")
    const [desc, setDesc] = useState<string>("")

    const deleteK = (k:number)=> {
        const newf = fields.filter((f,i) => k != i)
        setFields(newf)
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name of the Type</Form.Label>
        <Form.Control type="string" placeholder="one word as per typescript rules"
        value={name} onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description of the Type</Form.Label>
        <Form.Control as="textarea" rows={3} 
        value={desc} onChange={(e)=>setDesc(e.target.value)}/>
      </Form.Group>

      <hr></hr>

      <Row>
        <Col lg={4}>
            Field Name
        </Col>
        <Col lg={4}>
            Field Type
        </Col>
        <Col lg={4}>
            <span className="small">optional? array?</span>
        </Col>
      </Row>
      
      {fields.map((f,i) => {
        return <Row key={i}>
        <Col lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control size="sm" type="text" placeholder="field name" />
            </Form.Group> 
        </Col>
        <Col lg={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control size="sm" type="text" placeholder="field type" />
            </Form.Group>
            
        </Col>
        <Col lg={4}>
        <Form.Check // prettier-ignore
                inline
        type="switch"
        id="custom-switch"
        
      /><Form.Check // prettier-ignore
      inline
type="switch"
id="custom-switch"

/><button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>deleteK(i)}>
    <i className="fa-light fa-trash"></i></button>
        </Col>
    </Row>
      })}

      <Button onClick={()=> {
        var newf = fields.map(x => x)
        newf.push({
            name: "",
            type: "",
            isArray: false,
            optional: true
        })
        setFields(newf)
      }}>New Field</Button>
      
    </Form>
    )
}

