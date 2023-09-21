import { IDatatype, IDatatypefield } from "./Datatypes";

/**
 * This is the heart of our magic - generation of various shit from the datatypes.
 */

export const DatatypeConverters = {

    /**
     * Generate full data file with all given options from the datatype
     * @param d 
     */
    genDataFile: (d:IDatatype) => {
        let s = "import { Mongo } from 'meteor/mongo'\nimport SimpleSchema from 'simpl-schema';\n\n"
        s+= DatatypeConverters.tsInterface(d) + "\n\n" + DatatypeConverters.simplSchema(d)
        return s
    },

    /**
     * Convert datatype to typescript interface
     * @param d 
     * @returns 
     */
    tsInterface: (d: IDatatype) => {
        let s = ""
        if (d.description.length > 0) {
            s+= "/*\n" + d.description + "\n*/\n"
        }
        s+= "export interface I" + d.name + " {\n"
        d.fields.forEach(f => {
            s+= "    " + tsInterfaceField(f) + ",\n"
        })
        s+= "}"
        return s;
    },

    /**
     * Convert datatype to simpl-schema definition
     * @param d 
     */
    simplSchema: (d: IDatatype) => {
        let s = "/* simlp-schema definition for interface I" + d.name + " */\n"
        s+= "export const S" + d.name + " = new SimpleSchema({\n"
        d.fields.forEach(f => {
            s+= "    " + simpleSchemaField(f) + ",\n"
        })
        s+= "});"
        return s;
    }

}

// converting fields inside ts interface
const tsInterfaceField = (f:IDatatypefield) => {
    let s = f.name
    if (f.optional) s+= "?"
    s+=" : " + f.type
    if (f.isArray) s+= "[]"
    return s;
}

// converting fields inside simpl schema
// helper map for type conversions first
const ssTypeMap = (str:string) => {
    switch (str) {
        case "string": return "String"; break;
        case "boolean": return "Boolean"; break;
        case "number": return "Number"; break;
        default: return str; 
    }
}
// now the function
const simpleSchemaField = (f:IDatatypefield) => {
    let s = f.name + ": {\n"
    if (f.isArray) {
        s+= "        type: Array,\n"
        if (f.optional) s+= "        optional: true\n"
        s+="    },\n"
        // now, need to add the type of array elements:
        s+= "    '" + f.name + ".$': {\n        type: " + ssTypeMap(f.type) + "\n    }"
    }
    else {
        s+= "        type: " + ssTypeMap(f.type) + ",\n"
        if (f.optional) s+= "        optional: true\n"
        s+="    }"
    }
    
    return s;
}

/**
 * Converters into ReactForms
 */
export const FormConverters = {

    basicReactForm: (d:IDatatype) => { 

        const formGroupStyles = "mb-3"
        const formName = d.name + "FormBasic"
        const dvName = "data" + d.name
        const datatypeName = "I" + d.name
        const datatypeSimplSchemaName = "S" + d.name

        // now field by field generations
        let fieldStateDefinitions = ""
        let fieldsNdtConstruction = ""
        let allFormGroupsForFields = ""
        d.fields.forEach (f => {
            fieldStateDefinitions+= `    const [${f.name}, set${f.name}] = useState(odt ? odt.${f.name} : '')\n`
            fieldsNdtConstruction+= `         ${f.name}: ${f.name},\n`
            // todo - need different input types!!!
            allFormGroupsForFields+= `            <Form.Group className="${formGroupStyles}">
            <Form.Label>Edit ${f.name}</Form.Label>
            <Form.Control type="text" placeholder="enter ${f.name}"
                value={${f.name}} onChange={(e) => set${f.name}(e.target.value)} />
            {!valid && vctx?.keyErrorMessage("${f.name}") && <span className='text-danger'>{vctx?.keyErrorMessage("${f.name}")}</span>}
        </Form.Group>\n`
        })


        const s = `import React, { useState } from 'react'
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'
import ${datatypeName} from '[PUT PROPER FILE NAME]'
import ${datatypeSimplSchemaName} from '[PUT PROPER FILE NAME]'

export const ${formName} = (props:{ ${dvName}: ${datatypeName},
    onCancel: () => void,
    onSave: (${dvName}: ${datatypeName}) => void
}) => {

    const odt = props.${dvName}
    const onCancel = props.onCancel
    const onSave = props.onSave

    const [valid, setValid] = useState(true)
    const [vctx, setVctx] = useState<any>(null)

    /* here go the field state definitions */
${fieldStateDefinitions}
    /* end of the field state definitions  */

    const save = () => {

        /* construction of the ndt */
        const ndt: ${datatypeName} = {
            // ... fields go here
${fieldsNdtConstruction}
        }
        /* end of construction of the ndt */

        const validationContext = ${datatypeSimplSchemaName}.newContext();
        validationContext.validate(ndt);

        setValid(validationContext.isValid());
        setVctx(validationContext)

        if (validationContext.isValid()) {
            onSave(ndt)
        }
    }

    return (
        <Form>
            
${allFormGroupsForFields}
            
            <Button variant="outline-success" onClick={save}>Save</Button>{" "}
            <Button variant="outline-warning" onClick={onCancel}>Cancel</Button>
        </Form>
    )
}
`
        return s;
    }
}

