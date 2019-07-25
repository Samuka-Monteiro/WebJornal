const mongoose = require('mongoose')

const Racio = new mongoose.Schema({
    racio: {type: Number, required: true},
    estado_racio:{type: Boolean, require: true},
    
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('racio', Racio)