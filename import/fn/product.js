import {Product} from '../collections/product';

export default class ProductFn {
    static query(query) {
        let {q, s,store_id} = query; //q = normal query ,s = skewNumber query;
        let selector = {
            status: 'active',

        };
        if (!!store_id) {
            selector.storeId = store_id
        }
        if (!!s) {
            selector.skewNumber = {
                $regex: s,
                $options: 'mi'
            };
        }
        if (!!q) {
           selector.$or = [
               {skewNumber: {$regex: q, $options: 'mi'}},
               {name: {$regex: q, $options: 'mi'}},
           ]

        }
        const rawCollection = Product.rawCollection();
        return rawCollection.aggregate([{
            $match: selector
        },
            {$sort: {timestamp: -1}},
            {$skip: +query.skip || 0},
            {$limit: +query.limit ||  10},]).toArray()
    }

    static count(selector = {status: 'active'}) {
        return Product.find(selector).count();
    }
    static insert(doc) {
        return Product.insert(doc);
    }

    static findOne(id) {
        return Product.findOne({_id: id});
    }
    static update(id,doc) {
        return Product.update({_id: id}, {$set: doc})
    }
}