import SimpleSchema from 'simpl-schema';

export const Product = new Mongo.Collection('product');
const schema = new SimpleSchema({
    name: {
        type: String
    },
    skewNumber: { //this can be auto generate when it comes to bundle insert
        type: String,
        optional: true
    },
    categoryId: {
        type: String
    },
    productToken: {
        type: String
    },
    createdBy: {
        type: String
    },
    storeId: {
        type: String
    },
    timestamp: {
        type: Date,
        autoValue() {
            return new Date()
        }
    },
    status: {
        type: String,
        autoValue() {
            if (this.isInsert) {
                return 'active';
            }
        }
    },
    location: {
        type: Object,
        optional: true
    },

    'location.type': {
        type: String
    },
    'location.coordinates': {
        type: Array
    },
    'location.coordinates.$': {
        type: Number,
        // decimal: true
    },
    notificationWhen: {
        type: Object
    },
    'notificationWhen.min': {
        type: Number
    },
    'notificationWhen.max': {
        type: Number
    }
});

Product.attachSchema(schema);