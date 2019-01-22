$(document).ready(function () {

        $('#registarFormId').on('submit', (e) => {
    
        if (e.isDefaultPrevented()) {
            console.log("form with errors")
        }
        else {
            
            let pass1 = $('#formRegPass').val();
            let pass2 = $('#formRegPass2').val();
            
            if (pass2 != pass1 || pass1 != pass2) {
                swal("Passwords diferentes")
                event.preventDefault();
            }
            else{
            
                event.preventDefault();
                
                var data = {};
                data.nome = $('#formRegNome').val();
                data.email = $('#formRegEmail').val();
                data.password = $('#formRegPass').val();
                data.admin = false;
                data.adress = $('#formRegAdress').val();
                data.answer = $('#formRegAnswer').val();
                data.estadoRegisto = false;
        
                console.log(data)
        
        
                $('#registarFormId')[0].reset();
                $.ajax({
                    type: 'POST',
                    url: 'app/users/post',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (result) {
                        console.log('user adicionado com sucesso')
                        swal("SUCESSO", "Registo com sucesso! Aguarde email de confirmação.", "success");
        
                    },
                    error: function (data) { console.log(data) }
                });
            }
        }
    })

});

