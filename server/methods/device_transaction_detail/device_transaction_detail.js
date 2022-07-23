import { Meteor } from "meteor/meteor";
import GeneralFn from "../../../import/fn/general";
import DeviceTransactionDetailFn from "../../../import/fn/device_transaction_detail";
import { Product } from '../../../import/collections/product';

Meteor.methods({
    device_transaction_detail_add(doc) {
        const privateUser = Meteor.settings.private;
        if (!doc.productToken) {
            throw new Meteor.Error('Product not found');
        }
        const userId = doc.productToken.split('-')[0];
        if (!GeneralFn.CheckRoles({ requestId: userId, roles: ['admin'] })) {
            throw new Meteor.Error('Sorry your product token is invalid!');
        }
        const product = Product.findOne({ productToken: doc.productToken });
        if (!product) {
            throw new Meteor.Error('Product not found');
        }
        doc.storeId = product.storeId;
        doc.productId = product._id;
        return DeviceTransactionDetailFn.insert(doc);
    },
    device_transaction_detail_fetch(selector) {
        return DeviceTransactionDetailFn.find(selector);
    },
    device_transaction_detail_query_by_area(selector){
        return DeviceTransactionDetailFn.queryByArea(selector);
    },
    device_transaction_detail_query_by_product(selector,categoryId){
        return DeviceTransactionDetailFn.queryByProduct(selector,categoryId);
    },
    device_transaction_detail_query_by_product_current(selector,categoryId) {
        return DeviceTransactionDetailFn.queryByProduct(selector,categoryId,'timestamp');

    },
    device_transaction_detail_query_by_chart(selector) {
        return DeviceTransactionDetailFn.byChart(selector);

    }
});