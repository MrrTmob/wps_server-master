import GeneralFn from '../../import/fn/general';
import moment from 'moment';

const API = JsonRoutes;
const sendResult = API.sendResult;


API.add('post', GeneralFn.NamespaceV1('/device_transaction_detail/:product_id/add'), (req, res, next) => {
    res.charset = 'utf-8';
    const {product_id} = req.params;
    const {bar} = req.query;
    if (!!bar) {
        req.body.bar = +bar;
    }
    req.body.productToken = product_id;
    return new Promise((resolve, reject) => {
        Meteor.call('device_transaction_detail_add', req.body, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er) => {
            sendResult(res, {
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});

API.add('get', GeneralFn.NamespaceV1('/device_transaction_detail/:store_id'), (req, res, next) => {
    res.charset = 'utf-8';
    const {store_id} = req.params;
    const selector = {
        'details.storeId': store_id
    }
    return new Promise((resolve, reject) => {
        Meteor.call('device_transaction_detail_fetch', selector, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er) => {
            sendResult(res, {
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});
API.add('get', GeneralFn.NamespaceV1('/device_transaction_detail'), (req, res, next) => {
    res.charset = 'utf-8';
    const {token} = req.headers;
    const {store_id} = req.query;
    const startDate = moment().startOf('days').toDate();
    const endDate = moment().endOf('days').toDate();
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    } catch (e) {
        sendResult(res, {
            data: {
                code: 403,
                message: "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    const selector = {
        'details.storeId': store_id,
        timestamp: {
            $gte: startDate,
            $lte: endDate
        }
    };
    return new Promise((resolve, reject) => {
        Meteor.call('device_transaction_detail_query_by_area', selector, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er) => {
            sendResult(res, {
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});

API.add('get', GeneralFn.NamespaceV1('/device_transaction_detail/group_by_product'), (req, res, next) => {
    res.charset = 'utf-8';
    const {token} = req.headers;
    const {store_id, category_id} = req.query;
    const startDate = moment().startOf('days').toDate();
    const endDate = moment().endOf('days').toDate();
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    } catch (e) {
        sendResult(res, {
            data: {
                code: 403,
                message: "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    const selector = {
        'details.storeId': store_id,
        timestamp: {
            $gte: startDate,
            $lte: endDate
        }
    };
    return new Promise((resolve, reject) => {
        Meteor.call('device_transaction_detail_query_by_product', selector, category_id, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er) => {
            sendResult(res, {
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});
API.add('get', GeneralFn.NamespaceV1('/device_transaction_detail/group_by_product_current'), (req, res, next) => {
    res.charset = 'utf-8';
    const {token} = req.headers;
    const {store_id, category_id} = req.query;
    const startDate = moment().add(7,'hours').startOf('days').toDate();
    const endDate = moment().add(7, 'hours').endOf('days').toDate();
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    } catch (e) {
        sendResult(res, {
            data: {
                code: 403,
                message: "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    const selector = {
        'details.storeId': store_id,
        timestamp: {
            $gte: startDate,
            $lte: endDate
        }
    };
    return new Promise((resolve, reject) => {
        Meteor.call('device_transaction_detail_query_by_product_current', selector, category_id, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er) => {
            sendResult(res, {
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});
API.add('get', GeneralFn.NamespaceV1('/device_transaction_detail/report/chart'), (req, res, next) => {
    res.charset = 'utf-8';
    const {token} = req.headers;
    const {store_id, sDate,eDate,productId} = req.query;
    const startDate = moment(sDate).subtract(7, 'hours').toDate();
    const endDate = moment(eDate).subtract(7,'hours').toDate();
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    } catch (e) {
        sendResult(res, {
            data: {
                code: 403,
                message: "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    const selector = {
        'details.storeId': store_id,
        'details.productId': productId,
        timestamp: {
            $gte: startDate,
            $lte: endDate
        }
    };
    return new Promise((resolve, reject) => {
        Meteor.call('device_transaction_detail_query_by_chart', selector, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res, {
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er) => {
            sendResult(res, {
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});