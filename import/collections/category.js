import SimpleSchema from 'simpl-schema';

export const Category = new Mongo.Collection('category');

const schema = new SimpleSchema({
    name: {
        type: String
    },
    desc: {
        type: String,
        optional: true
    },
    createdBy: {
        type: String
    },
    timestamp: {
        type: Date,
        autoValue(){
            return new Date();
        }
    },
    isUsable: {
        type: Boolean,
    }

});

Category.attachSchema(schema);