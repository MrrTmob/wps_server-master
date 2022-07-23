import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import GeneralFn from '../../../import/fn/general';
import UserApi from '../../../import/fn/user';

const privateUser = Meteor.settings.private;
Meteor.methods({
    user_createUser({username, password, roles, stores, profile, tel}) {
        return Accounts.createUser({
            username,
            password,
            roles, stores,
            tel,
            profile: profile
        })
    },
    user_updateUser(id, rId, {roles, stores, profile, tel}) {
        if (!GeneralFn.CheckRoles({
            requestId: rId,
            roles: ['admin', 'super', 'gm'],
        })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return Meteor.users.update({_id: id}, {$set: {roles, stores, profile, tel}});
    },
    user_changePassword(_id, rId, {password}) {
        if (!GeneralFn.CheckRoles({
            requestId: rId,
            roles: ['admin', 'super', 'gm'],
        })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return Accounts.setPassword(_id, password);

    },
    user_login(username, password) {
        if (!!username) {
            let user = Meteor.users.findOne({username});
            if (!!user) {
                const validateLogin = UserApi.checkLogin(user, password);
                if (!!validateLogin.error) {
                    throw new Meteor.Error(validateLogin.error.reason);
                }
                return validateLogin;
            }
            throw new Meteor.Error("ឈ្មោះអ្នកប្រើប្រាស់មិនត្រមឹត្រូវ");
        }
    },
    user_profile({_id, requestId}) {
        if (!GeneralFn.CheckRoles({
            requestId,
            roles: ['admin', 'super', 'gm'],
        })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return Meteor.users.findOne({
            _id
        })
    },
    user_fetch(requestId) {
        if (!GeneralFn.CheckRoles({requestId, roles: ['admin']}) && !GeneralFn.isRootUser({
            requestId,
            privateUser: privateUser
        })) {
            throw new Meteor.Error('អ្នកមិនមានសិទ្ធ!')
        }
        return UserApi.fetchUser();
    },

    user_addFcmToken(selector, userId) {
        return Meteor.users.update({_id: userId}, selector);
    },
});