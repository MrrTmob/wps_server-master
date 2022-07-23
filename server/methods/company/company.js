import CompanyFn from "../../../import/fn/company";
import {Meteor} from "meteor/meteor";
import GeneralFn from "../../../import/fn/general";

Meteor.methods({
    company_fetch(){
        return CompanyFn.fetch();
    },
    company_update(id,requestId,doc){
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.CheckRoles({requestId, roles: ['super','admin']}) ) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return CompanyFn.update(id, doc);
    }
})