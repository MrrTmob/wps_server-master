import CategoryFn from "../../../import/fn/category";
import {Meteor} from "meteor/meteor";
import GeneralFn from "../../../import/fn/general";

Meteor.methods({
    category_upsert(doc) {
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.isRootUser({ requestId: doc.createdBy,privateUser: privateUser }) && !GeneralFn.CheckRoles({requestId: doc.createdBy, roles:['admin', 'decore']})) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return CategoryFn.upsert(doc);
    },
    category_all(selector) {
        return CategoryFn.findAll(selector);
    }
});