import admin from 'firebase-admin';

var serviceAccount = JSON.parse(Assets.getText('serviceAccount.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://h2e-wps.firebaseio.com"
});
const FCM = {
    pushNotificaiton({users, title, body, type, id}) {
        users.forEach((user) => {
            const fcmToken = !!user && (user.profile.fcmToken != null) ? user.profile.fcmToken : [];

            fcmToken.forEach((token) => {
                var message = {
                    notification: {
                        title: title,
                        body: body,

                    },
                    android: {
                        priority: 'high',
                        notification: {
                            title: title,
                            body: body,
                            icon: 'ic_notification',
                            sound: 'alert.wav',
                            color: '#00bfff',
                            clickAction: 'FLUTTER_NOTIFICATION_CLICK',
                        },
                    },
                    // apns: {
                    //     "payload": {
                    //         "sound": "default"
                    //     },
                    // },
                    data: {
                        click_action: "FLUTTER_NOTIFICATION_CLICK",
                        type: type,
                        id: id,
                    },
                    token: token
                };
                if (!!fcmToken)
                    admin.messaging(

                    ).send(message)
                        .then((data) => {
                            // console.log(data);
                        })
                        .catch(err => console.log(err));
            })
        })
    }
}

module.exports = FCM;