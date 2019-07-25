const mongoose = require('mongoose')

const Noticias = new mongoose.Schema({
    titulo: {type: String, required: true},
    fonte: {type: String, required: false},
    autor: {type: String, required: false},
    link: {type: String, required: true},
    descricao: {type: String, required: true},
    texto: {type: String, required: true},
    categoria: {type: Array, required: true},
    num_visualizacao:{type: String, require: true},
    idUtilizador:{type: String, require: true},
    estado_noticia:{type: Boolean, require: true},
    nome_utilizador:{type: String, require: true},
    
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('noticias', Noticias)