import React, { useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/esm/Row'
import { IDatatype, IDatatypefield } from '../api/Datatypes/Datatypes'
import { Button } from 'react-bootstrap'
import { DatatypesController } from '../api/Datatypes/methods'

export const DatatypesForm = (props: {
    dt: IDatatype | null,
    onCancel: () => void
}) => {

    const odt = props.dt
    const onCancel = props.onCancel

    const [fields, setFields] = useState<IDatatypefield[]>(odt ? odt.fields : [])
    const [name, setName] = useState<string>(odt ? odt.name : "")
    const [desc, setDesc] = useState<string>(odt ? odt.description : "")

    const save = () => {
        console.log("export interface I"+name + " {")
        fields.map((f) => {
            let tp = f.type
            let fn = f.name
            if (f.isArray) tp+="[]"
            if (f.optional) fn+="?"
            console.log(fn + " : " + tp + ",")
        })
        console.log("}")

        const cleanf = fields.filter((f) => (f.name.length > 0) && (f.type.length > 0) )
        const dt : IDatatype = {
            name: name,
            description: desc,
            fields: cleanf,
            isPersistent: false,
            isPublic: false
        }

        // saving to the collection
        if (odt) {
            //updating
            DatatypesController.update.call({id: odt._id, fields: dt}, (err: any,res: any) => {
                console.log(err,res)
            })
        }
        else {
            // creating new
        DatatypesController.insert.call(dt, (err: any,res: any) => {
            console.log(err,res)
            if (!err) {
                onCancel()
            }
        })
        }
    }

    const deleteK = (k: number) => {
        const newf = fields.filter((f, i) => k != i)
        setFields(newf)
    }

    const updFN = (k:number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newf = fields.map((f,i) => {
            if (i!=k) return f;
            else {
                var f1 = f;
                f1.name = e.target.value;
                return f1;
            }
        })
        setFields(newf)
    }

    const updFT = (k:number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newf = fields.map((f,i) => {
            if (i!=k) return f;
            else {
                var f1 = f;
                f1.type = e.target.value;
                return f1;
            }
        })
        setFields(newf)
    }

    const updFO = (k:number) => {
        const newf = fields.map((f,i) => {
            if (i!=k) return f;
            else {
                var f1 = f;
                f1.optional = !f.optional;
                return f1;
            }
        })
        setFields(newf)
    }

    const updFA = (k:number) => {
        const newf = fields.map((f,i) => {
            if (i!=k) return f;
            else {
                var f1 = f;
                f1.isArray = !f.isArray;
                return f1;
            }
        })
        setFields(newf)
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name of the Type</Form.Label>
                <Form.Control type="string" placeholder="one word as per typescript rules"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description of the Type</Form.Label>
                <Form.Control as="textarea" rows={3}
                    value={desc} onChange={(e) => setDesc(e.target.value)} />
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

            {fields.map((f, i) => {
                return <Row key={i}>
                    <Col lg={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control size="sm" type="text" placeholder="field name"
                            value={f.name} onChange={(e)=>updFN(i,e)} />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Control size="sm" type="text" placeholder="field type"
                            value={f.type} onChange={(e)=>updFT(i,e)} />
                        </Form.Group>

                    </Col>
                    <Col lg={4}>
                        <Form.Check // prettier-ignore
                            inline
                            type="switch"
                            id="custom-switch"
                            checked={f.optional}
                            onChange={()=>updFO(i)}

                        /><Form.Check // prettier-ignore
                            inline
                            type="switch"
                            id="custom-switch"
                            checked={f.isArray}
                            onChange={()=>updFA(i)}

                        /><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteK(i)}>
                            <i className="fa-light fa-trash"></i></button>
                    </Col>
                </Row>
            })}

            <Button variant="outline-primary" onClick={() => {
                var newf = fields.map(x => x)
                newf.push({
                    name: "",
                    type: "",
                    isArray: false,
                    optional: false
                })
                setFields(newf)
            }}>New Field</Button>{" "}
            <Button variant="outline-success" onClick={save}>Save</Button>{" "}
            <Button variant="outline-warning" onClick={onCancel}>Cancel</Button>

        </Form>
    )
}

