const mongoose = require('mongoose');
const readLine = require('readline');
mongoose.set("strictQuery", false);

//const dbURI = 'mongodb://localhost/Loc8r';
const dbPassword = process.env.MONGODB_PASSWORD;
const dbURI = `mongodb+srv://duna020801_db_user:${dbPassword}@cluster0.8zvjtzo.mongodb.net/Loc8r`;

var gracefulShutdown;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function () {
    console.log('Mongoose connection error: ' + dbURI);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected ' + dbURI);
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close();
    console.log('Mongoose disconnected through ' + msg);
    callback();
}
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    })
});
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./locations');

