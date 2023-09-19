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
    }
}

const tsInterfaceField = (f:IDatatypefield) => {
    let s = f.name
    if (f.optional) s+= "?"
    s+=" : " + f.type
    if (f.isArray) s+= "[]"
    return s;
}