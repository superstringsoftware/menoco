import { Mongo } from "meteor/mongo"

export interface IDatatypefield {
    name: string,
    type: string,
    optional: boolean,
    isArray: boolean
}

export interface IDatatype {
    name: string,
    description: string,
    fields: IDatatypefield[],
    ownerId: string,
    applicationName?: string,
    isPublic: boolean,
    isPersistent: boolean
}

export const ColDatatype = new Mongo.Collection("datatypes");