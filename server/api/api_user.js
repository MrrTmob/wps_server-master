import UserLoginAuditorFn from '../../import/fn/user_login_auditor';
import {parse} from 'date-fns';
import GeneralFn from "../../import/fn/general";
const API = JsonRoutes;
const sendResult = API.sendResult;
var jwt = require('jsonwebtoken');
const payload = {
   scope: "h2e",
   app: "cake-thai",
};

//must deploy with setting json
const secret = Meteor.settings.private.secret;
API.add('get', '/info', (req, res, next) => {
    res.charset = 'utf-8';
    sendResult(
        res,
        {
            data: "hi"
        }
    )
})

API.add('post', '/user/login', (req, res, next) => {
    var token = jwt.sign(payload, secret, {expiresIn: '2 days'});
    const {username,password} = req.body;
    const ip = req.connection.remoteAddress;
    res.charset = 'utf-8';
    return new Promise((resolve,reject) =>{
        Meteor.call('user_login', username,password,(err,result)=>{
            if (!err) {
                UserLoginAuditorFn.insert(
                    {
                        ip,
                        userId: result[0]._id,
                        timestamp: new Date()
                    }
                );
                resolve(result[0]);
            }else{
                reject(err.message);
            }
        })
    })
        .then((r) => {
            var token = jwt.sign(payload, secret, {expiresIn: '2 days'});
            sendResult(res,{
                data: {
                    code: 201,
                    data: r,
                    token
                }
            })
        })
        .catch((er)=>{
            sendResult(res,{
                data: {
                    code: 403,
                    data: er,
                }
            })
        })
})
API.add('post', '/user/create', (req, res, next) => {
    const {username,password,roles,stores,profile,tel} = req.body;
    res.charset = 'utf-8';
    return new Promise((resolve,reject)=> {
        Meteor.call('user_createUser',{username,password,roles,stores,profile,tel}, (err,result) => {
            if(!err){
                resolve(result);
            }else{
                reject(err.reason);
            }
        });
    })
    .then((r) => {
        var token = jwt.sign(payload, secret, {expiresIn: '2 days'});
        sendResult(res,{
            data: {
                code: 201,
                data: r,
                token
            }
        })
    })
    .catch((er)=>{
        sendResult(res,{
            data: {
                code: 403,
                message: er,
            }
        })
    })
});
API.add('post', '/user/update/:id/r/:rId', (req, res, next) => { //r = request , rId = user requestId
    const {roles,stores,profile,tel} = req.body;
    const {id,rId} = req.params;
    const {token} = req.headers;
    res.charset = 'utf-8';
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    }catch (e) {
        sendResult(res,{
            data: {
                code: 403,
                message:  "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    return new Promise((resolve,reject)=> {
        Meteor.call('user_updateUser',id,rId,{roles,stores,profile,tel}, (err,result) => {
            if(!err){
                resolve(result);
            }else{
                reject(err.reason);
            }
        });
    })
        .then((r) => {
            sendResult(res,{
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er)=>{
            sendResult(res,{
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});
API.add('post', '/user/update/:id/r/:rId/change_password', (req, res, next) => { //r = request, rId = which userId is request
    const {password} = req.body;
    const {id,rId} = req.params;
    const {token} = req.headers;
    res.charset = 'utf-8';
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    }catch (e) {
        sendResult(res,{
            data: {
                code: 403,
                message:  "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    return new Promise((resolve,reject)=> {
        Meteor.call('user_changePassword',id,rId,{password}, (err,result) => {
            if(!err){
                resolve(result);
            }else{
                reject(err.reason);
            }
        });
    })
        .then((r) => {
            sendResult(res,{
                data: {
                    code: 201,
                    data: r,
                }
            })
        })
        .catch((er)=>{
            sendResult(res,{
                data: {
                    code: 403,
                    message: er,
                }
            })
        })
});

API.add('post', '/user/profile', (req, res, next) => {
    const {_id,requestId} = req.body;
    const {token} = req.headers;
    res.charset = 'utf-8';
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    }catch (e) {
        sendResult(res,{
            data: {
                code: 403,
                message:  "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    return new Promise((resolve,reject)=> {
        Meteor.call('user_profile', {_id,requestId}, (err,result) => {
            if(!err){
                resolve(result);
            }else{
                reject(err.message);
            }
        });
    })
    .then((r) => {
        sendResult(res,{
            data: {
                code: 201,
                data: r,
                
            }
        })
    }) .catch((er)=>{
        sendResult(res,{
            data: {
                code: 403,
                data: er,
            }
        })
    })
});
API.add('post', '/user/fetch_all', (req, res, next) => {
    const {_id} = req.body;
    res.charset = 'utf-8';
    const {token} = req.headers;
    try {
        GeneralFn.verifyToken(token); // if token failed we decline all process
    }catch (e) {
        sendResult(res,{
            data: {
                code: 403,
                message:  "សុំទោសយើងអត់ស្គាល់អ្នក",
            }
        })
    }
    return new Promise((resolve,reject)=> {
        Meteor.call('user_fetch', _id, (err,result) => {
            if(!err){
                resolve(result);
            }else{
                reject(err.message);
            }
        });
    })
        .then((r) => {
            sendResult(res,{
                data: {
                    code: 201,
                    data: r,

                }
            })
        }) .catch((er)=>{
            sendResult(res,{
                data: {
                    code: 403,
                    data: er,
                }
            })
        })
});

API.add('post', '/user/:id/add/fcmToken', (req, res, next) => {
    res.charset = 'utf-8';
    const userId = req.params.id;
    const selector = {
        $addToSet: req.body
    };
    return new Promise((resolve, reject) => {
        Meteor.call("user_addFcmToken", selector, userId, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
});
API.add('post', '/user/:id/remove/fcmToken', (req, res, next) => {
    res.charset = 'utf-8';
    const userId = req.params.id;
    const selector = {
        $set: {
            'profile.fcmToken': []
        }
    };
    return new Promise((resolve, reject) => {
        Meteor.call("user_addFcmToken", selector, userId, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err.message);
            }
        });
    })
});