const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');
//const bCrypt = require('bcrypt-nodejs');

// console.log('passport up')

    
// passport.use(new LocalStrategy( function (email, password, done) {
//   console.log(email)
//         User.findOne({ email: email }, function (err, user) {
//             if (err) {
//                 return done(err);
//             } if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }
//             if (!user.validPassword(password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         });
// }));



//     passport.use('local-signup', new LocalStrategy(
//         {
//             usernameField: 'Lemail',
//             passwordField: 'Lpass',
//             passReqToCallback: true // allows us to pass back the entire request to the callback
//         },
       
//     ));
    
    
    // function configure(passport){
        
    //     const strategyFunc =function(email, password, done){
    //         console.log(email)
    //         User.authenticate(email, password, function(err, user){
    //             if (err) {
    //                 console.log('LocalStrategy - Error trying to authenticate')
    //                 done(err)
    //             } else if(user) {
    //               console.log('LocalStrategy - Successful login')
    //                 done(null, err) 
    //             }
    //             else {
    //                 console.log('LocalStrategy - could not find the user or somesuch')
    //                 done(null, false)
    //             }
    //         })
    //     }
        
    //     passport.use(new LocalStrategy(strategyFunc))
        
    //     passport.serializeUser(function (user, done){
    //         done(null, user.id)
    //     })
        
    //     passport.deserializeUser(function (id, done){
    //         User.findById(id, function(err, user){
    //             done(err, user)
    //         })
    //     })
    // }
    
    // module.exports={
    //     configure
    // }