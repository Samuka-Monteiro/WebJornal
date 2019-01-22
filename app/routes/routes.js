const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const noticias = require('../controllers/noticias.controller')
const users = require('../controllers/users.controller')
const racio = require('../controllers/racio.controller')


//RACIO
router.post('/racio/post', racio.racioController.novoRacio)
router.get('/racio/find', racio.racioController.apresentarRacio)
router.put('/racio/post/', racio.racioController.editarRacio)//editar racio


// router.get('/users/findUtilizador/:idUtilizador', users.usersController.encontrarUmUtilizadorIdUtilizador)

//GRAFICOS
router.get('/findG', noticias.noticiasController.noticiasDaSemana)

//NOTICIAS
router.get('/posts', noticias.noticiasController.noticiasDaSemana)
router.get('/find/:id', noticias.noticiasController.encontrarUmaNoticia)
router.get('/finds/:categoria', noticias.noticiasController.encontrarNoticiaPorCategoria)
router.get('/findN', noticias.noticiasController.encontrarNoticiaPorTitulo)
//NOTICIAS
router.get('/noticia/numSemanas/:data0/:data1', noticias.noticiasController.noticiasNumeroSemanas)//todas as noticias de um determinado numero de semanas
router.get('/noticia/numSemanasCateg/:data0/:data1/:categoria', noticias.noticiasController.noticiasNumeroSemanasCateg)//todas as noticias de um determinado numero de semanas + categoria 

router.get('/findIdCate/:id/:categoria', noticias.noticiasController.encontrarUmaNoticiaPorCategoriaEIdUtilizador)
//USERS
router.post('/users/post', users.usersController.novoUser)//registar
router.put('/post/:id', noticias.noticiasController.editarNoticia)//editar noticia view


router.get('/users/findE/:email', users.usersController.encontrarUsersEmail)

router.post('/Authenticate', users.usersController.authenticateUser)
router.get('/check',  users.usersController.checkToken)
router.use( users.usersController.protectRoutes)

//MINHAS NOTICIAS
router.get('/noticia/find/:id', noticias.noticiasController.encontrarNoticiaPorIdUtilizador)

//MINHAS NOTICIAS FIM

router.delete('/delete/:id', noticias.noticiasController.apagarNoticia)

router.post('/post', noticias.noticiasController.novaNoticia)
router.get('/noticiasNovas/find', noticias.noticiasController.encontrarNovasNoticias)
router.put('/estadoNoticia/post/:id', noticias.noticiasController.atualizarEstado)


//USERS
router.get('/users/posts', users.usersController.listarTodosUsers)
router.get('/users/find/:id', users.usersController.encontrarUmUser)
router.put('/users/post/:id', users.usersController.atualizarEstado)
router.delete('/users/delete/:id', users.usersController.eliminarUser)
router.get('/usersNovos/find', users.usersController.encontrarUsersNovos)
router.put('/users/posts/:id',users.usersController.atualizarPassword)








module.exports = router


