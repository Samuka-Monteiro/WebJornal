const express = require('express'),
    server = express(),
    port = process.env.port || 8080,
    bodyParser = require('body-parser'),
    queryParser = require('express-query-int'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('connect-flash');

global.nodemailer = require('nodemailer');
global.smtpTransport = require('nodemailer-smtp-transport');

server.use(flash());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(queryParser())
server.use(express.static('views'))
server.use('/', express.static('app/views'))
server.use('/', express.static('app/views/html'))
server.use('/public', express.static('app/views'))
server.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());

server.listen(port, () => { console.log('Server UP on port: ' + port) })

module.exports = server
