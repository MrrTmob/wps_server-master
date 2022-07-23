import SimpleSchema from 'simpl-schema';

export const Stores = new Mongo.Collection('stores');

const schema = new SimpleSchema({
    name: {
        type: String,
    },
    shortcutName: {
        type: String
    },
    coverImgUrl: {
        type: String,
        optional: true
    },
    desc: {
        type: String,
        optional: true
    },
    favouriteBy: {
        type: Array,
        optional: true

    },
    'favouriteBy.$': {
        type: String
    },
    reportBy: {
        type: Array,
        optional: true

    },
    'reportBy.$': {
        type: String
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
    blackListUsers: {
        type: Array,
        optional: true
    },
    'blackListUsers.$': {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true


    },
    closeOrder: {
        type: Boolean,
        optional: true
    },
    createdBy: {
        type: String,
        // optional: true
    },
    address: {
        type: String,
        optional: true
    },
});

Stores.attachSchema(schema);