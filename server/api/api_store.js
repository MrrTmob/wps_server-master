import GeneralFn from '../../import/fn/general';

const API = JsonRoutes;
const sendResult = API.sendResult;

API.add('post', GeneralFn.NamespaceV1('/store/add'), (req, res, next) => {
    const {name, coordinates, address, desc, closeOrder, createdBy, shortcutName} = req.body;
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
        Meteor.call('store_add', {
            name,
            address,
            coordinates,
            desc,
            closeOrder,
            createdBy,
            shortcutName
        }, (err, result) => {
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
                    code: 200,
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

API.add('post', GeneralFn.NamespaceV1('/store/all'), (req, res, next) => {
    const {selector, requestId} = req.body;
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
        Meteor.call('store_all', selector, requestId, (err, result) => {
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
                    code: 200,
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
API.add('post', GeneralFn.NamespaceV1('/store/list'), (req, res, next) => {
    const {selector, requestId} = req.body;
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
        Meteor.call('store_list', selector, requestId, (err, result) => {
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
                    code: 200,
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
API.add('post', GeneralFn.NamespaceV1('/store/:id'), (req, res, next) => {
    const {requestId} = req.body;
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
        Meteor.call('store_find_one', {_id: id}, requestId, (err, result) => {
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
API.add('post', GeneralFn.NamespaceV1('/store/:id/edit'), (req, res, next) => {
    const {name, coordinates, address, desc, closeOrder, createdBy, shortcutName} = req.body;
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
        Meteor.call('store_update', id,{name,coordinates,address,desc,closeOrder,createdBy,shortcutName}, (err, result) => {
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