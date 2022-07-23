const privateUser = Meteor.settings.private;
export default class UserApi {
    static checkLogin(user, password) {
        let detailLogin = Accounts._checkPassword(user, password);
        if (detailLogin.error) {
            return detailLogin;
        }
        return this.fetchUser({selector: {_id: user._id}, skip: 0 , limit: 1});
    }

    static queryUserByUsername(username, password) {
        if (!!username) {
            let user = Meteor.users.findOne({username});
            if (!!user) {
                return this.checkLogin(user, password);
            }
            return {error: {error: 404, message: 'Username not exist'}};
        }
    }

    static listUserByStore() {

    }

    static fetchUser({selector, skip, limit} = {selector:{username: {$nin: [privateUser.username]}}, skip: 0, limit: 50}) {
        const rawCollection = Meteor.users.rawCollection();
        return rawCollection.aggregate([
            {
                $match: selector
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $unwind: {
                    path: '$stores',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'stores',
                    localField: "stores",
                    foreignField: '_id',
                    as: 'storeDoc'
                }
            }, {
                $unwind: {
                    path: "$storeDoc",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    username: {$last: '$username'},
                    stores: {$push: '$storeDoc'},
                    roles: {$last: '$roles'},
                    profile: {$last: '$profile'},
                    createdAt: {$last: '$createdAt'},
                    tel: {$last: "$tel"}
                }
            }
        ]).toArray();
    }
}