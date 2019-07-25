require('../models/noticias.model')
const mongoose = require('mongoose')
const TaskNoticias = mongoose.model('noticias')

const novaNoticia = (req, res) => {
    const criarNoticia = new TaskNoticias(req.body)
    criarNoticia.save((err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)

    })
}

const listarTodasNoticias = (req, res) => {
    TaskNoticias.find((err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const encontrarUmaNoticia = (req, res) => {
    TaskNoticias.findOne({ _id: req.params.id }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const encontrarNoticiaPorCategoria = (req, res) => {
    TaskNoticias.find({ categoria: req.params.categoria, estado_noticia: true }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const encontrarNoticiaPorTitulo = (req, res) => {
    TaskNoticias.find((err, task) => {
        if (err)
            res.send({ success: false })
        else {
            res.send(-1 != task.titulo.toUpperCase().indexOf(val))
        }

    })
}

const apagarNoticia = (req, res) => {
    TaskNoticias.remove({ _id: req.params.id }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send({ success: true })
    })
}

const editarNoticia = (req, res) => {
    const idNoticia = req.params.id
    req.body.update_at = new Date()
    TaskNoticias.findOneAndUpdate({ _id: idNoticia }, req.body, { new: true }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.json(task)

    })
}

const encontrarNovasNoticias = (req, res) => {
    TaskNoticias.find({ estado_noticia: false, }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const atualizarEstado = (req, res) => {
    req.body.update_at = new Date()
    req.body.estado_noticia = true
    TaskNoticias.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.json(task)

    })
}

const noticiasDaSemana = (req, res) => {
    TaskNoticias.find({ estado_noticia: true }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const encontrarNoticiaPorIdUtilizador = (req, res) => {
    TaskNoticias.find({ idUtilizador: req.params.id }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const encontrarUmaNoticiaPorCategoriaEIdUtilizador = (req, res) => {
    TaskNoticias.find({ idUtilizador: req.params.id, categoria: req.params.categoria }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const noticiasNumeroSemanas = (req, res) => {
    TaskNoticias.find({ created_at: { $gte: req.params.data0, $lte: req.params.data1 }, estado_noticia: true }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

const noticiasNumeroSemanasCateg = (req, res) => {
    TaskNoticias.find({ created_at: { $gte: req.params.data0, $lte: req.params.data1 }, estado_noticia: true, categoria: req.params.categoria }, (err, task) => {
        if (err)
            res.send({ success: false })
        res.send(task)
    })
}

exports.noticiasController = {
    novaNoticia,
    listarTodasNoticias,
    encontrarUmaNoticia,
    apagarNoticia,
    editarNoticia,
    encontrarNoticiaPorCategoria,
    encontrarNoticiaPorTitulo,
    encontrarNoticiaPorIdUtilizador,
    encontrarNovasNoticias,
    atualizarEstado,
    noticiasDaSemana,
    encontrarUmaNoticiaPorCategoriaEIdUtilizador,
    noticiasNumeroSemanas,
    noticiasNumeroSemanasCateg
};