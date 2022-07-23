module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '139.162.46.91',
      username: 'root',
      // pem: './path/to/pem'
      password: 'h2eqwer007#123'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'wps',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://139.162.46.91',
      MONGO_URL: 'mongodb://mongodb/wps',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
      TZ: 'Asia/Bangkok',
      PORT: 9999
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.6.12',
    servers: {
      one: {}
    }
  },

  // proxy: {
  //   domains: 'h2eiot.com,www.h2eiot.com',
  //
  //   ssl: {
  //     // Enable Let's Encrypt'
  //     forceSSL: true,
  //     letsEncryptEmail: 'email@h2etech.com'
  //   }
  // }
};
