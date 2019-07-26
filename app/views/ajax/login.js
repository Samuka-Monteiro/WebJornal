$('#email').focus(function () {
    $('#error').hide()
});

$('#password').focus(function () {
    $('#error').hide()
});

$('#login').on('submit', (e) => {
    if (e.isDefaultPrevented()) {
        console.log("form with errors")
    }
    else {
        event.preventDefault();
        var data = {};
        data.email = $('#email').val();
        data.password = $('#password').val();
        console.log(data)
        $('#login')[0].reset();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/app/Authenticate',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                if (result.success) {
                    $.ajax({
                        type: 'GET',
                        url: 'app/users/findE/' + data.email,
                        success: function (data1) {
                            console.log(data1)
                            //guardar o id do user na local storage
                            if (data1.estadoRegisto == true) {
                                localStorage.setItem('user', JSON.stringify(result))
                                localStorage.setItem('idUser', JSON.stringify(data1._id))
                                //rederecionar para pagina principal
                                window.location.replace("http://localhost:8080/noticias");
                            } else {
                                swal('Aguarde o email de comfirmacão do seu registo!')
                            }
                        }
                    });

                }
                else {
                    $('#error').show()
                    $('#login')[0].reset();
                    window.location.replace("http://localhost:8080/paginaInicial");
                }
            },
            error: function (data) { console.log(data) }
        });

    }
})

function validToken() {
    if (localStorage.getItem("user")) {
        $.ajax({
            type: 'GET',
            url: 'app/check',
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            contentType: 'application/json',
            success: function (result) {

                console.log(result)
                if (result.success) {
                    window.location.replace("https://localhost:8080/paginaInicial");
                }
            },
            error: function (data) { console.log(data) }
        })
    }
}