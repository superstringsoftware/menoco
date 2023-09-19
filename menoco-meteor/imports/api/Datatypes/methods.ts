import { Meteor } from "meteor/meteor";


//@ts-ignore
import { ValidatedMethod, ValidatedMethodThisBase} from "meteor/mdg:validated-method";
//@ts-ignore
import { ValidationError } from "meteor/mdg:validation-error";
import { ColDatatype, IDatatype, SDatatype } from "./Datatypes";


// Person business logic
export const DatatypesController = {
  // delete
  remove: new ValidatedMethod({
    name: "datatypes.remove",
    validate: null,
    run(pid: string) {
      // who can insert? For now - admin of the account
      const dtc = ColDatatype.find({_id:pid,ownerId: Meteor.userId()}).count()
      if (dtc <= 0) {
        throw new Meteor.Error(
          "datatypes.remove.unauthorized",
          "only owners can remove datatypes"
        );
      }

      // setting correct account id
      
      return ColDatatype.remove({_id: pid})
    },
  }),

  // insert new
  insert: new ValidatedMethod({
    name: "datatypes.insert",
    validate: SDatatype.validator(),
    run(p: IDatatype) {
      // who can insert? For now - admin of the account
      const uid = Meteor.userId()
      if (!uid) {
        throw new Meteor.Error(
          "datatypes.insert.unauthorized",
          "only logged in users can insert datatypes"
        );
      }
      else {

      // setting correct account id
      p.ownerId = uid

      return ColDatatype.insert(p);
      }
    },
  }),
  // update existing
  update: new ValidatedMethod({
    name: "datatypes.update",
    validate: (props: any) => {
        SDatatype.validate(props.fields)
    },
    run(props: { id: string; fields: Partial<IDatatype> }) {
      const uid = Meteor.userId();
      if (!uid) {
        throw new Meteor.Error("datatypes.update.unauthorized", "anonymous user!");
      }
      const dc = ColDatatype.find({_id:props.id,ownerId: uid}).count()
      if (dc <=0) {
        throw new Meteor.Error("datatypes.update.unauthorized", "not an owner or doesnt exist!");
      }

      return ColDatatype.update(props.id, {
        $set: props.fields,
      });
    },
  }),
};
