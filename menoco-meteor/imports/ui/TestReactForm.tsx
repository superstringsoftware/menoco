import React, { useState } from 'react'
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'
import SimpleSchema from 'simpl-schema';

/**
 * This is used as a reference form for our generators
 */

interface ITestInterface {
    name: string,
    age: number,
    birthDate?: Date,
    friends?: string[]
}

export const STestType = new SimpleSchema({
    name: {
        type: String,
        min: 1
    },
    age: {
        type: Number,
    },
    birthDate: {
        type: Date,
        optional: true
    },
    friends: {
        type: Array,
        optional: true
    },
    'friends.$': {
        type: String
    },

});

export const TestReactForm = (props: {
    dt?: ITestInterface,
    onCancel: () => void,
    onSave: (ndt: ITestInterface) => void
}) => {

    const odt = props.dt
    const onCancel = props.onCancel
    const onSave = props.onSave

    const [valid, setValid] = useState(true);
    const [vctx, setVctx] = useState<any>(null)

    const [name, setName] = useState(odt ? odt.name : "")
    const [age, setAge] = useState(odt ? odt.age : "")

    const save = () => {

        // clean up, validate and then save
        const ndt: ITestInterface = {
            name: name,
            age: age
        }

        const validationContext = STestType.newContext();

        validationContext.validate(ndt);

        setValid(validationContext.isValid());
        setVctx(validationContext)

        if (validationContext.isValid()) {
            onSave(ndt)
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="enter name"
                    value={name} onChange={(e) => setName(e.target.value)} />
                {!valid && vctx?.keyErrorMessage("name") && <span className='text-danger'>{vctx?.keyErrorMessage("name")}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="enter age"
                    value={age} onChange={(e) => setAge(parseFloat(e.target.value))} />
                {!valid && vctx?.keyErrorMessage("age") && <span className='text-danger'>{vctx?.keyErrorMessage("age")}</span>}
            </Form.Group>

            <Button variant="outline-success" onClick={save}>Save</Button>{" "}
            <Button variant="outline-warning" onClick={onCancel}>Cancel</Button>

        </Form>
    )
}

