
var jwt = require('jsonwebtoken');
const secret = Meteor.settings.private.secret;
export default class GeneralFn {

    static CheckRoles({requestId, roles} = {roles: []}) {
        return Roles.userIsInRole(requestId, roles);
    }
    static isRootUser({requestId,privateUser}){
        return Roles.userIsInRole(requestId, [privateUser.username]);
    }

    static NamespaceV1(route) {
        return '/api/v1' + route;
    }
    static verifyToken(token){
       return jwt.verify(token, secret);
    }
}