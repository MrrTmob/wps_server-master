import GeneralFn from '../../import/fn/general';

const API = JsonRoutes;
const sendResult = API.sendResult;


API.add('get', GeneralFn.NamespaceV1('/company'), (req, res, next) => {
    res.charset = 'utf-8';
    return new Promise((resolve, reject) => {
        Meteor.call('company_fetch', (err, result) => {
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

API.add('post', GeneralFn.NamespaceV1('/company/:id/edit/:userId'), (req, res, next) => {
    res.charset = 'utf-8';
    const {id, userId} = req.params;
    const {token} = req.headers;
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
        Meteor.call('company_update', id, userId, req.body, (err, result) => {
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