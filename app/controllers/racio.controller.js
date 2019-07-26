require('../models/racio.model')
const mongoose = require('mongoose')
const TaskRacio = mongoose.model('racio')

const novoRacio= (req, res) => {
    const criarRacio = new TaskRacio(req.body)
    criarRacio.save((err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
        console.log(task)
        
    })
}

const apresentarRacio = (req, res) =>{
    TaskRacio.find((err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
    })
}

const editarRacio = (req, res) => {
    req.body.update_at = new Date()
    let id='5b2254989f6bbe7e9057c8c9'
    console.log(req.body.racio)
    console.log(req.body.estado_racio)
    TaskRacio.findOneAndUpdate({_id: id}, req.body, {new: true},  (err, task)=>{
        if(err)
            res.send({success: false})
        res.json(task)
                
    })
}

exports.racioController = {
    novoRacio,
    apresentarRacio,
    editarRacio
    
};