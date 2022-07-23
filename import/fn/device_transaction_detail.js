import {DeviceTransactionDetail} from "../collections/deviceTransaction";
import product from "./product";
import {Product} from "../collections/product";
import {Category} from "../collections/category";
import FCM from "../fcm/fcm";

export default class DeviceTransactionDetailFn {
    static insert(doc) {
        return DeviceTransactionDetail.insert({
            details: doc
        })
    }

    static find(selector, page = 1) {
        const limit = 10;
        const skip = page * limit - limit;

        const rawCollection = DeviceTransactionDetail.rawCollection();
        return rawCollection.aggregate([
            {
                $match: selector
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {

                $lookup: {
                    from: 'product',
                    localField: 'details.productId',
                    foreignField: '_id',
                    as: 'productDoc'
                }
            },
            {

                $unwind: {
                    path: '$productDoc',
                    preserveNullAndEmptyArrays: true
                }
            },
            {

                $sort: {
                    timestamp: -1
                }
            }
        ]).toArray()
    }

    static queryByArea(selector) {
        const rawCollection = DeviceTransactionDetail.rawCollection();
        return rawCollection.aggregate([
            {
                $match: selector
            },
            {
                $sort: {
                    'details.bar': 1
                }
            },
            {
                $lookup: {
                    from: 'product',
                    localField: 'details.productId',
                    foreignField: '_id',
                    as: 'productDoc'
                }
            },
            {
                $unwind: {
                    path: '$productDoc',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: '$productDoc.categoryId',
                    minBar: {
                        $first: '$$ROOT'
                    },
                    maxBar: {
                        $last: '$$ROOT'
                    }
                }
            },
            {
                $lookup: {
                    from: 'category',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryDoc'
                }
            },
            {
                $unwind: {
                    path: '$categoryDoc',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'product',
                    let: {category_id: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$categoryId', '$$category_id']
                                }
                            }
                        }
                    ],
                    as: 'products'
                }
            }
        ]).toArray()
    }

    static queryByProduct(selector, categoryId, sortKey = 'details.bar') {
        const rawCollection = DeviceTransactionDetail.rawCollection();
        const productPipeline = [
            {
                $match: selector
            },
            {
                $sort: {
                    timestamp: -1
                }
            },
            // {
            //     $limit: 50
            // },
            {
                $lookup: {
                    from: 'product',
                    localField: 'details.productId',
                    foreignField: "_id",
                    as: 'productDoc'
                }
            },
            {
                $unwind: {
                    path: '$productDoc',
                    preserveNullAndEmptyArrays: true
                }
            },
        ];
        if ((typeof categoryId == "undefined") && !!categoryId) {
            productPipeline.push(
                {
                    $match: {
                        'productDoc.categoryId': categoryId
                    }
                },)
        }
        return rawCollection.aggregate([
            ...productPipeline,
            {
                $sort: {
                    [sortKey]: 1
                }
            },
            {
                $group: {
                    _id: '$details.productId',
                    productToken: {
                        $last: '$details.productToken'
                    },
                    minBar: {
                        $first: '$$ROOT'
                    },
                    maxBar: {
                        $last: '$$ROOT'
                    },
                    productDoc: {
                        $last: "$productDoc"
                    }
                }
            },

        ]).toArray();
    }

    static byChart(selector) {
        const rawCollection = DeviceTransactionDetail.rawCollection();
        const pipeline = [
            {
                $match: selector
            },
            {
                $sort: {
                    timestamp: -1
                }
            },

            {
                $project: {
                    dateStr: {
                        $dateToString: {
                            format: '%H:%M',
                            date: '$timestamp',
                            timezone: '+07:00'
                        }
                    },
                    timestampStr: {
                        $dateToString: {
                            format: '%Y-%m-%d %H:%M',
                            date: '$timestamp',
                            timezone: '+07:00'
                        }
                    },
                    hour: {
                        $dateToString: {
                            format: '%H',
                            date: '$timestamp',
                            timezone: '+07:00'
                        }
                    },
                    minute: {
                        $dateToString: {
                            format: '%M',
                            date: '$timestamp',
                            timezone: '+07:00'
                        }
                    },
                    bar: '$details.bar'
                }
            },
            {
                $sort: {
                    hour: 1
                }
            },
            {
                $group: {
                    _id: {
                        hour: '$hour',
                        minute: '$minute'
                    },
                    hour: {
                        $last: '$hour',

                    },
                    bar: {
                        $last: '$bar'
                    },
                    minute: {
                        $last: '$minute'
                    }
                }
            },
            {
                $sort: {
                    '_id.hour': 1,
                    '_id.minute': 1
                }
            },
            {
                $group: {
                    _id: '$hour',
                    hour: {
                        $last: '$hour'
                    },
                    bar: {
                        $last: '$bar'
                    },
                    dataByMinutes: {
                        $push: '$$ROOT'
                    }
                }
            },
            // {
            //     $limit: 50
            // },
            {
                $sort: {
                    _id: 1
                }
            }
        ]
        return rawCollection.aggregate(pipeline).toArray();
    }
}

