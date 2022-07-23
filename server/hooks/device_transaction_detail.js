import { DeviceTransactionDetail } from '../../import/collections/deviceTransaction';
import { pusher } from '../../import/pusher/pusher';
import { Product } from "../../import/collections/product";
import { Category } from "../../import/collections/category";
import FCM from "../../import/fcm/fcm";

DeviceTransactionDetail.after.insert(function (userId, doc) {
    Meteor.defer(function () {
        pusher.trigger('H2E_BBWS', doc.details.productToken, doc);
        Product.rawCollection().aggregate([
            {
                $match: { _id: doc.details.productId }
            },
            {
                $lookup: {
                    from: 'category',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categoryDoc'
                }
            },
            {
                $unwind: {
                    path: '$categoryDoc',
                    preserveNullAndEmptyArrays: true
                }
            }
        ])
            .toArray()
            .then((data) => {
                data.forEach(product => {
                    const users = Meteor.users.find({ stores: { $in: [product.storeId] } }).fetch();
                    const minNotificationForAdmin = 0.5;
                    const maxNotificationForAdmin = 4.0;
                    const adminUsers = users.filter(o => o.roles.includes('admin') || o.roles.includes('super'));

                    if (product.notificationWhen && !!product.notificationWhen.min && !!product.notificationWhen.max) {
                        if (doc.details.bar <= product.notificationWhen.min) {
                            FCM.pushNotificaiton({
                                users: doc.details.bar <= minNotificationForAdmin ? adminUsers : users,
                                title: 'សារបន្ទាន់',
                                body: `${product.name} ${product.categoryDoc.name} ធ្លាក់ចុះខុសធម្មតា ` + doc.details.bar + ' បារ',
                                type: 'water_pressure',
                                id: product.categoryDoc._id
                            })
                        }
                        //if max is set > 0 so we will push notification
                        if (product.notificationWhen.max > 0 && doc.details.bar >= product.notificationWhen.max) {
                            FCM.pushNotificaiton({
                                users: doc.details.bar >= maxNotificationForAdmin ? adminUsers : users,
                                title: 'សារបន្ទាន់',
                                body: `${product.name} ${product.categoryDoc.name} ឡើងខ្លាំងខុសធម្មតា ` + doc.details.bar + ' បារ',
                                type: 'water_pressure',
                                id: product.categoryDoc._id
                            });
                        }
                    }

                })
            })
    }, 200);

});