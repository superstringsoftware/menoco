import { Mongo } from "meteor/mongo"
import SimpleSchema from 'simpl-schema';

export interface IDatatypefield {
    name: string,
    type: string,
    optional: boolean,
    isArray: boolean
}

export const SDatatypefield = new SimpleSchema({
    name: {
      type: String,
      label: "Name",
      max: 200 // You can customize this max length or remove it
    },
    type: {
      type: String,
      label: "Type",
      max: 200
    },
    optional: {
      type: Boolean,
      label: "Optional"
    },
    isArray: {
      type: Boolean,
      label: "Is Array"
    }
  });

export interface IDatatype {
    name: string,
    description: string,
    fields: IDatatypefield[],
    ownerId?: string,
    applicationName?: string,
    isPublic: boolean,
    isPersistent: boolean
}

export const SDatatype = new SimpleSchema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        required: true
    },
    'fields.$': {
        type: SDatatypefield,
    },
    ownerId: {
        type: String,
        optional: true
    },
    applicationName: {
        type: String,
        optional: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    isPersistent: {
        type: Boolean,
        required: true
    }
});

export const ColDatatype = new Mongo.Collection("datatypes");