import './api/api_user';
import './api/api_product';
import './api/api_store';
import './api/api_company';
import './api/api_category';
import './api/api_device_transaction_detail';
import {decode} from 'punycode';

var jwt = require('jsonwebtoken');
const sendResult = JsonRoutes.sendResult;
const secret = Meteor.settings.private.secret;
JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin,Content-Type, Authorization, X-Requested-With,token"
});
JsonRoutes.Middleware.use(function (req, res, next) {
    next();
});