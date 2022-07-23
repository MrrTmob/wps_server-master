import StoreFn from "../../../import/fn/store";
import GeneralFn from "../../../import/fn/general";
import {Meteor} from "meteor/meteor";

Meteor.methods({
    store_add(doc){
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.isRootUser({ requestId: doc.createdBy,privateUser: privateUser })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return StoreFn.insert(doc);
    },
    store_update(id,doc){
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.isRootUser({ requestId: doc.createdBy,privateUser: privateUser })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return StoreFn.update(id,doc);
    },
    store_all(selector,requestId){
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.CheckRoles({requestId, roles: ['admin']}) && !GeneralFn.isRootUser({ requestId: requestId,privateUser: privateUser })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return StoreFn.findAll(selector).fold((stores) => stores.map(o => ({
            label: `${o.name}`,
            value: `${o._id}`
        })));
    },
    store_list(selector,requestId){
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.CheckRoles({requestId, roles: ['admin']}) && !GeneralFn.isRootUser({ requestId: requestId,privateUser: privateUser })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return StoreFn.findAll(selector).stores;
    },
    store_find_one(selector,requestId){
        const privateUser = Meteor.settings.private;
        if ( !GeneralFn.CheckRoles({requestId, roles: ['admin']}) && !GeneralFn.isRootUser({ requestId: requestId,privateUser: privateUser })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return StoreFn.findOne(selector).store;
    }
});