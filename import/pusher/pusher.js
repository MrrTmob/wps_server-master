import Pusher from 'pusher';

export const pusher = new Pusher({
    appId: '723479',
    key: 'a1734a6aa866b87d6189',
    secret: 'fec8181cb6c6e1bb86c3',
    cluster: 'ap1',
    encrypted: true
});
//
// pusher.trigger('thecake', e, {
//     "payment": doc
// });