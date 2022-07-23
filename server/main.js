import {Meteor} from 'meteor/meteor';
import './api';
import './methods/user/user';
import './methods/product/product';
import './methods/store/store';
import './methods/company/company';
import './methods/category/category';
import './methods/device_transaction_detail/device_transaction_detail';
import './methods/pushNotification/pushNotification';
import './hooks/account';
import './hooks/device_transaction_detail';
import {Accounts} from 'meteor/accounts-base';
import {JsonRoutes} from 'meteor/simple:json-routes'
import {UserLoginAuditor} from '../import/collections/user_login_auditor';
import {Stores} from '../import/collections/stores';
import {Company} from '../import/collections/company';
import {Product} from '../import/collections/product';
import {DeviceTransactionDetail} from '../import/collections/deviceTransaction';
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
const connectHandler = WebApp.connectHandlers;
Meteor.startup(function () {
    let privateSetting = Meteor.settings.private;
    // Enable cross origin requests for all endpoints
    connectHandler.use(function (req, res, next) {
        // add allow origin
        res.setHeader('Access-Control-Allow-Origin', '*');

        // add headers
        res.setHeader('Access-Control-Allow-Headers', [
            'Accept',
            'Accept-Charset',
            'Accept-Encoding',
            'Accept-Language',
            'Accept-Datetime',
            'Authorization',
            'Cache-Control',
            'Connection',
            'Cookie',
            'Content-Length',
            'Content-MD5',
            'Content-Type',
            'Date',
            'User-Agent',
            'X-Requested-With',
            'token',
            'Origin'
        ].join(', '));
        return next();
    });
    if (!Meteor.users.findOne({username: privateSetting.username})) {
        Accounts.createUser({
            username: privateSetting.username,
            password: privateSetting.secret
        })
    }
    //Creating company for the first run
    if(Company.find({}).fetch().length === 0){
        Company.insert({
            name: "Example",
            startHour: "08:00",
            closeHour: "20:30",
            defaultCurrency: "KHR",
            logoUrl: "",
            exchangeRate: {
                KHR: 1,
                USD: 0.00025,
                THB: 0.008
            }
        });
    }
    ///Create index here
    //ensure index for user login auditor
    UserLoginAuditor._ensureIndex({
        timestamp: 1,
    });
    UserLoginAuditor._ensureIndex({
        userId: 1
    });

    /**
     * ensure index for stores
     */
    Stores._ensureIndex({location: '2dsphere'});
    Stores._ensureIndex({name: 1}, {unique: true});
    Stores._ensureIndex({code: 1});
    Stores._ensureIndex({name: 1, createdAt: 1, shortcutName: 1}, {sparse: true, unique: true})


    /**
     *
     * Ensure index for product
     */
    Product._ensureIndex({type: 1, expiredAt: 1});
    Product._ensureIndex({skewNumber: 1}, {unique: true,sparse: true});
    Product._ensureIndex({status: 1, skewNumber: 1, name: 1});
    Product._ensureIndex({productToken: 1});
    Product._ensureIndex({ location: '2dsphere' });

    //Rate Limiter mostly handle for dos attack
    DeviceTransactionDetail._ensureIndex({
        'details.storeId': 1,
        'details.productId': 1,
        'details': 1
    });
    const LISTS_METHODS = [
        'company_fetch',
        'store_add',
        'store_update',
        'store_all',
        'store_list',
        'store_find_one',
        'user_updateUser',
        'user_profile',
        'user_fetch',
        'device_transaction_detail_add'
    ];

    DDPRateLimiter.addRule({
        name(name) {
            return LISTS_METHODS.includes(name);
        },
        // Rate limit per connection ID
        connectionId() {
            return true;
        }
    }, 5, 1000);
});
