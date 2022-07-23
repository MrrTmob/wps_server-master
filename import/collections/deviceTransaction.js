import SimpleSchema from 'simpl-schema';


export const DeviceTransaction = new Mongo.Collection('device_transaction');
export const DeviceTransactionDetail = new Mongo.Collection('device_transaction_detail');
const schemaTransactionDetail = new SimpleSchema({
    details: {
        type: Object,
        blackbox: true
    },
    timestamp: {
        type: Date,
        autoValue() {
            return new Date();
        }
    }
});

DeviceTransactionDetail.attachSchema(schemaTransactionDetail);