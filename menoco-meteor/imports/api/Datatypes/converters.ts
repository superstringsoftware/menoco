import { IDatatype, IDatatypefield } from "./Datatypes";

/**
 * This is the heart of our magic - generation of various shit from the datatypes.
 */

export const DatatypeConverters = {

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