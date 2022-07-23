import {UserLoginAuditor} from '../collections/user_login_auditor';

export default class UserLoginAuditorFn {

    static insert(doc){
        return UserLoginAuditor.insert(doc);
    }
}