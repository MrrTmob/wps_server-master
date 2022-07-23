import GeneralFn from '../../import/fn/general';

const API = JsonRoutes;
const sendResult = API.sendResult;


API.add('post', GeneralFn.NamespaceV1('/products/add'), (req, res, next) => {
    const {token} = req.headers;
    res.charset = 'utf-8';
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
    return new Promise((resolve, reject) => {
        Meteor.call('product_add', req.body, (err, result) => {
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
})
API.add('post', GeneralFn.NamespaceV1('/products/:id/edit'), (req, res, next) => {
    const {token} = req.headers;
    const {id} = req.params;
    const {location} = req.body;
    res.charset = 'utf-8';
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
    if (!!location) {
        req.body.location = {
            type: 'Point',
            coordinates: JSON.parse(req.body.location)
        }
    }
    return new Promise((resolve, reject) => {
        Meteor.call('product_update', id, req.body, (err, result) => {
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
        });
})


API.add('get', GeneralFn.NamespaceV1('/products'), (req, res, next) => {
    const {token} = req.headers;
    res.charset = 'utf-8';
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
    return new Promise((resolve, reject) => {
        Meteor.call('product_query', req.query, (err, result) => {
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
                    data: er,
                }
            })
        })
});


API.add('get', GeneralFn.NamespaceV1('/products/:id'), (req, res, next) => {
    const {token} = req.headers;
    const {id} = req.params;
    res.charset = 'utf-8';
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
    return new Promise((resolve, reject) => {
        Meteor.call('product_query_by_id', id, (err, result) => {
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
                    data: er,
                }
            })
        })
});

API.add('get', GeneralFn.NamespaceV1('/products/count'), (req, res, next) => {
    const {token} = req.headers;
    res.charset = 'utf-8';
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
    return new Promise((resolve, reject) => {
        Meteor.call('product_count', {status: 'active'}, (err, result) => {
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
                    data: er,
                }
            })
        })
});