import {Stores} from '../collections/stores';

export default class StoreFn {
    static store;
    static stores;
    static insert(doc) {
        return Stores.insert(doc);
    }

    static update(id,doc) {
        return Stores.update({_id: id}, {$set: doc})
    }

    static findOne(selector) {
        this.store = Stores.findOne(selector);
        return this;
    }

    static findAll(selector = {}) {
        this.stores = Stores.find(selector).fetch();
        return this;
    }

    static fold(fn) {
        return fn(this.stores);
    }
}