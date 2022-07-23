import {Company} from "../collections/company";


export default class CompanyFn {
    static fetch(selector={}) {
        return Company.find(selector).fetch();
    }

    static update(id, doc) {
        return Company.update({_id:id},{$set: doc});

    }
}