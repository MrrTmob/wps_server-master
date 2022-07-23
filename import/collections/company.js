import SimpleSchema from 'simpl-schema';

export const Company = new Mongo.Collection('company');


const schema = new SimpleSchema({
    name: {
        type: String
    },
    startHour: {
        type: String,
    },
    closeHour: {
        type: String
    },
    logoUrl: {
        type: String,
        optional: true
    },
    defaultCurrency: {
        type: String // can be KHR, USD
    },
    exchangeRate: {
        type: Object
    },
    'exchangeRate.KHR': {
        type: Number
    },
    'exchangeRate.USD': {
        type: Number
    },
    'exchangeRate.THB': {
        type: Number
    }

});

Company.attachSchema(schema);