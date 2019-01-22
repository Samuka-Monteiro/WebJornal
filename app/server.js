const express = require('express'),
    cors = require('./assets/cors'),
    server = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    queryParser = require('express-query-int'),
    passport = require('passport'),
    session= require('express-session'),
    fs = require('fs'),
    exphbs = require('express-handlebars');
    
    global.nodemailer = require('nodemailer');
    global.smtpTransport = require('nodemailer-smtp-transport');
        
        
    const flash=require('connect-flash')
    server.use(flash());

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors)
server.use(queryParser())
server.use(express.static('views'))
server.use('/', express.static('app/views'))
server.use('/', express.static('app/views/html'))
server.use('/public', express.static('app/views'))

// For Passport
server.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions

// require('./assets/passport').configure(passport)

//var models = require("/models");
    //load passport strategies
   //(passport,models.user.model);
 //require('./assets/passport.js')(passport,models.user.model)
server.listen(port, () => { console.log('Server UP on port: '+port) })


module.exports = server
