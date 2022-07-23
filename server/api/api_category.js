import GeneralFn from '../../import/fn/general';

const API = JsonRoutes;
const sendResult = API.sendResult;


API.add('post', GeneralFn.NamespaceV1('/categories/upsert'), (req, res, next) => {
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
        Meteor.call('category_upsert', req.body, (err, result) => {
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
API.add('get', GeneralFn.NamespaceV1('/categories/all'), (req, res, next) => {
    const {token} = req.headers;
    const {s} = req.query;
    let selector = {};
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
    if (s) {
        selector.isUsable = eval(s);
    }
    return new Promise((resolve, reject) => {
        Meteor.call('category_all',selector, (err, result) => {
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
});

API.add('get', GeneralFn.NamespaceV1('/categories/:id'), (req, res, next) => {
    const {id} = req.params;
    return new Promise((resolve, reject) => {
        Meteor.call('category_all', {_id: id},(err, result) => {
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