const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const Users = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required: true},
    adress: {type: String, required: false},
    answer: {type: String, required: true},
    estadoRegisto: {type: Boolean, required: true},
    
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
})

/*
Users.virtual('password')
    .get(function (){ return null;})
    .set(function (value){
        const hash= bcrypt.hashSync(value, 10)
        this.passwordHash = hash
        
    })
    
    
Users.methods.authenticate= function(password){
    return bcrypt.compareSync(password, this.passwordHash)
}

Users.statics.authenticate= function(email, password, done){
     console.log( email)
    this.findOne({email : email}, function (err, user){
        if (err) {
            console.log('Err attempting to use static authenticate function', err)
            done(err)
        }else if (user && user.authenticate(password)) {
            console.log('this should be a successful login')
            done(null, user)
        }else{
            console.log('probably got their password wrong')
            done(null, false)
        }
    })
}*/

module.exports = mongoose.model('users', Users)