import SimpleSchema from 'simpl-schema';

export const UserLoginAuditor = new Mongo.Collection("user_login_auditor");

const schema = new SimpleSchema({
    timestamp: {
        type: Date
    },
    userId: {
        type: String
    },
    ip: {
        type: String,
        optional: true
    }
});

UserLoginAuditor.attachSchema(schema);