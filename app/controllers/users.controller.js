require('../models/users.model')
const mongoose = require('mongoose')
const env = require('../.env')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const TaskUsers = mongoose.model('users')


const protectRoutes = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization']
    //const token = req.body.token || ''
    if(token)
    {
        jwt.verify(token,env.secret, (err, decoded)=>{
            if(err)
            {
                res.json({ success: false, message: 'Falha na autenticacao do token.' })
            }
            else
            {
                //req.decoded = decoded
                next()
            }
        })
    }
    else
    {
        return res.status(403).send({ success: false, message: 'Sem token.' 
        })  
    }
}

const checkToken = (req, res)=>{
    const token = req.body.token || req.query.token || req.headers['authorization']
    //const token = req.body.token || ''
    if(token)
    {
        jwt.verify(token,env.secret, (err, decoded)=>{
            if(err)
            {
                res.json({ success: false})
            }
            else
            {
                res.json({ success: true})
            }
        })
    }
    else
    {
        res.json({ success: false})
    }
}



const authenticateUser = (req, res) => {
    const password = req.body.password || ''
    TaskUsers.findOne({email: req.body.email}, (err, user)=>{
        if(err)
        {
            res.status(400).send({errors: ['Erro interno']}) 
        }
        if(!user)
        {
            res.json({ success: false, message: 'Falha na autenticação. Utilizador não encontrado.' }) 
        } else if (user)
        {
            if(!bcrypt.compareSync(password, user.password))
            {
                res.json({sucess: false, message: 'Falha na autenticação. Password errada'})
            }
            else
            {   
                const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
                const payload = {email: user.email, firstName: user.firstName, ip:ip}
                const token = jwt.sign(payload, env.secret, {
                    expiresIn: 1440 
                  })
                  res.json({
                    success: true,
                    message: 'Curte o token!',
                    token: token
                  })
            }
        }
    })
}


//POST
const novoUser= (req, res) => {
     const salt  = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    req.body.password = passwordHash
    const criarUser = new TaskUsers(req.body)
    criarUser.save((err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
        
    })
}

const listarTodosUsers = (req, res) =>{
    TaskUsers.find((err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
    })
}

//PUT
const atualizarEstado = (req, res) => {
    req.body.update_at = new Date()
    req.body.estadoRegisto = true
    TaskUsers.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},  (err, task)=>{
        if(err)
            res.send({success: false})
        res.json(task)
                
    })
}

//encontar um utilizador
const encontrarUmUser = (req, res) => {
   
    TaskUsers.findOne({_id: req.params.id}, (err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
    })
}

const encontrarUsersEmail = (req, res) => {
    console.log(req.params.email)
    TaskUsers.findOne({email: req.params.email}, (err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
    })
}

//DELETE
const eliminarUser = (req, res) => {
    TaskUsers.remove({_id: req.params.id}, (err, task)=>{
        if(err)
            res.send({success: false})
        res.send({success: true})
    })
}

//encontar utilizador por estado
const encontrarUsersNovos = (req, res) => {
    TaskUsers.find({estadoRegisto: false}, (err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
    })
}

const atualizarPassword = (req, res) => {
    
    req.body.update_at = new Date()
    const salt  = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    req.body.password = passwordHash
    
    TaskUsers.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},  (err, task)=>{
        if(err)
            res.send({success: false})
        res.json(task)
                
    })
}
// const encontrarUmUtilizadorIdUtilizador = (req, res) => {
//     console.log(req.params.idUtilizador)
//     TaskUsers.findOne({_id: req.params.idUtilizador}, (err, task)=>{
//         if(err)
//             res.send({success: false})
//         res.send(task)
//     })
// }


exports.usersController = {
    novoUser,
    listarTodosUsers,
    encontrarUmUser,
    atualizarEstado,
    eliminarUser,
    atualizarPassword,
    encontrarUsersNovos,
    encontrarUsersEmail,
    authenticateUser,
    protectRoutes,
    checkToken
};