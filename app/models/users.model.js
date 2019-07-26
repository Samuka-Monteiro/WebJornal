const mongoose = require('mongoose')

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

module.exports = mongoose.model('users', Users)