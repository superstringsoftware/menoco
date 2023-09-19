import {Meteor} from 'meteor/meteor'
import { ColDatatype } from './Datatypes'

Meteor.publish("datatypes.allMine", function() {
    const uid = Meteor.userId()
    return ColDatatype.find({ownerId: uid})
})