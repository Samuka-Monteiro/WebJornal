const router = require('express').Router()
const path = require('path')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

router.get('/criteriosAdesao', function (req, res) { 
    res.sendFile(path.join(__dirname, '../views/html/docs/') + 'criterios.pdf');
})

router.get('/criteriosAvaliacao', function (req, res) { 
   res.sendFile(path.join(__dirname, '../views/html/docs/') + 'criterios2.pdf');
});

router.get('/noticias', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/html/') + 'index.html');
    
});

router.get('/paginaInicial', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/html/') + 'paginaInicial.html');
    
});

router.post('/emailConfirmacaoRegisto', function (req, res) {
    let bodycontent = "";
    bodycontent += 'Caro, '+req.body.nome+'<br>';
    bodycontent += 'Seja bem vindo a Web Jornal' + '<br>' + 'Seu registo foi aceite.' + '<br>'+'Acesse<a href="https://ea8-cfportela.c9users.io/paginaInicial">  aqui</a> ';
    
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'webjornal9@gmail.com',
            pass: "webjornal123"
        }
    }));
    transporter.verify(function (error, success) {
        if (error) { console.log(error); }
        else { console.log('Server is ready to take our messages'); }
    })
    const mailOptions = {
        from: 'webjornal9@gmail.com',
        to: req.body.email,
        cc: 'other@email.com',
        subject: 'Site contact',
        html: bodycontent
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) { console.log(error); }
        else {
            console.log('Email sent: ' + info.response);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

router.post('/emailRegeitarRegisto', function (req, res) {
    let bodycontent = "";
    bodycontent += 'Caro, '+req.body.nome+'<br>';
    bodycontent += 'O seu registo não foi aceite pelos seguintes motivos:' + '<br>' + req.body.motivo;
    
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'webjornal9@gmail.com',
            pass: "webjornal123"
        }
    }));
    transporter.verify(function (error, success) {
        if (error) { console.log(error); }
        else { console.log('Server is ready to take our messages'); }
    })
    const mailOptions = {
        from: 'webjornal9@gmail.com',
        to: req.body.email,
        cc: 'other@email.com',
        subject: 'Site contact',
        html: bodycontent
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) { console.log(error); }
        else {
            console.log('Email sent: ' + info.response);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

router.post('/emailConfirmacaoNoticia', function (req, res) {
    let bodycontent = "";
    bodycontent += 'Caro, '+req.body.nome+'<br>';
    bodycontent += 'A sua noticia foi aceite e já se encontra publicada' + '<br>' + 'Obrigado pela sua colaboração.' + '<br>'+'Atenciosamente, webjornal.';
    
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'webjornal9@gmail.com',
            pass: "webjornal123"
        }
    }));
    transporter.verify(function (error, success) {
        if (error) { console.log(error); }
        else { console.log('Server is ready to take our messages'); }
    })
    const mailOptions = {
        from: 'webjornal9@gmail.com',
        to: req.body.email,
        cc: 'other@email.com',
        subject: 'Site contact',
        html: bodycontent
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) { console.log(error); }
        else {
            console.log('Email sent: ' + info.response);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

router.post('/emailRegeitarNoticia', function (req, res) {
    let bodycontent = "";
    bodycontent += 'Caro, '+req.body.nome+'<br>';
    bodycontent += 'A sua noticia não foi aceite pelos seguintes motivos:' + '<br>' + req.body.motivo;
    
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'webjornal9@gmail.com',
            pass: "webjornal123"
        }
    }));
    transporter.verify(function (error, success) {
        if (error) { console.log(error); }
        else { console.log('Server is ready to take our messages'); }
    })
    const mailOptions = {
        from: 'webjornal9@gmail.com',
        to: req.body.email,
        cc: 'other@email.com',
        subject: 'Site contact',
        html: bodycontent
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) { console.log(error); }
        else {
            console.log('Email sent: ' + info.response);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

module.exports = router
