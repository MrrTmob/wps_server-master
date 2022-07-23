import { Meteor } from "meteor/meteor";
import {Product} from '../../../import/collections/product';
import ProductFn from "../../../import/fn/product";
import GeneralFn from "../../../import/fn/general";

Meteor.methods({
    product_add(doc){
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.isRootUser({ requestId: doc.createdBy,privateUser: privateUser }) && !GeneralFn.CheckRoles({requestId: doc.createdBy, roles:['admin']})) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return ProductFn.insert(doc);
    },
    product_update(id,doc) {
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.isRootUser({ requestId: doc.createdBy,privateUser: privateUser }) && !GeneralFn.CheckRoles({requestId: doc.createdBy, roles:['admin']})) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return ProductFn.update(id,doc);
    },
    product_query(query) {
        return ProductFn.query(query);
    },
    product_query_by_id(id) {
        return ProductFn.findOne(id);
    },
    product_count(selector){
        return ProductFn.count(selector);
    },
    getIP() {
        var header = this.connection.httpHeaders;
        var ipAddress = header['x-forwarded-for'].split(',')[0];
        console.log(ipAddress)
        return ipAddress;
    }
})