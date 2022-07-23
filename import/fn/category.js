import {Category} from "../collections/category";

export default class CategoryFn {
    static upsert(doc) {
        const selector = {
            $set: doc
        };
        return Category.upsert({_id: doc._id}, selector, {
            $setOnInsert: {
                _id: Random.id,
            }
        });
    }

    static findAll(selector = {isUsable: true}) {
        return Category.find(selector).fetch();
    }
}