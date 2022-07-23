import {Accounts} from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
const privateEnv = Meteor.settings.private;
Accounts.onCreateUser((options,user)=>{
    if (options.profile) {
        user.profile = {};
        user.profile.approved = options.profile.approved;
        user.tel = options.tel;
        user.stores = options.stores;
        user.roles = options.roles;
        Roles.addUsersToRoles(user._id, options.roles)
    }
    else if (!options.profile){
        user.profile = {
            approved: false
        };
        if(user.username == privateEnv.username){
            Roles.addUsersToRoles(user._id, [privateEnv.username, 'admin']);
            user.roles =[privateEnv.username];
            user.profile.approved = true;
        }else{
            Roles.addUsersToRoles(user._id, ['guest']); //group super,admin,gm,cashier,
            user.roles = ['guest'];
        }
    }
    return user;
});