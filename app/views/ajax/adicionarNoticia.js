var categ = false
var nomeUt=""
 
$(document).ready(() => {
    // $("#formNewUser").hide();
    // refreshUsers()
      validTokenB()
      
    if (JSON.parse(localStorage.getItem('idUser'))) {
         $.ajax({
            type: 'GET',
            url: 'app/users/find/' + JSON.parse(localStorage.getItem('idUser')),
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            success: function (result2) {
                                                
                nomeUt=result2.nome                   
 
            }
        }); 
      }
})



$('#alterarPassword').on('submit', (e) => {
   
    
    if (e.isDefaultPrevented()) {
        console.log("form with errors")
    }
    else {
        
        let pass1 = $('#passN').val();
        let pass2 = $('#passC').val();
            
            if (pass2 != pass1) {
                swal("Passwords diferentes")
                event.preventDefault();
            }else{
                 var data = {};
                
                data.password = pass2
               
                $.ajax({
                type: 'PUT',
                url: 'app/users/posts/'+JSON.parse(localStorage.getItem("idUser")),
                data: JSON.stringify(data),
                contentType: 'application/json',
                 headers: {
                    'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                },
                    success: function (result) {
                        console.log('alterada')
                        swal("Password alterada com sucesso");

                    },
                    error: function (data) { console.log(data) }
                });
            }
       


    }
})





$('#formAdicionarNoticia').on('submit', (e) => {
   
    
    if (e.isDefaultPrevented()) {
        console.log("form with errors")
    }
    else {
        event.preventDefault();
        var data = {};
        data.titulo = ($('#titulo').val()).toUpperCase();
        data.fonte = $('#fonte').val();
        data.autor = $('#autor').val();
        if ($('#link').val() == "") {
            data.link = "https://i.ytimg.com/vi/Xomw0M8Q2YA/maxresdefault.jpg";
        } else {
            data.link = $('#link').val();
        }
        data.descricao = $('#descricao').val();
        data.texto = $('#texto').val();
        data.num_visualizacao = '0'
        data.estado_noticia = false;
        data.idUtilizador=JSON.parse(localStorage.getItem("idUser"))
        
        data.nome_utilizador = nomeUt
       
        /* declare an checkbox array */
    	var chkArray = [];
    	
    	/* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
    	$(".chk:checked").each(function() {
    		chkArray.push($(this).val());
    	});
    	
    	/* we join the array separated by the comma */
    	var selected;
    	selected = chkArray.join(',') ;
    	
    	/* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
    	if(selected.length > 0){
    	    data.categoria=selected
    	   $('#formAdicionarNoticia')[0].reset();
            $.ajax({
                type: 'POST',
                url: 'app/post',
                data: JSON.stringify(data),
                contentType: 'application/json',
                 headers: {
                    'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                },
                success: function (result) {
                    
                    console.log('noticia adicionada com sucesso')
                    swal("SUCESSO", "Notícia adicionada com sucesso!", "success");
    
                    
                },
                error: function (data) { console.log(data) }
            });
    			
    	}else{
    	    swal('Selecione uma categoria!')
    		
    	}
        
        // $("input[name='bla[]']").each(function () {
        //     if ($("input[name='bla[]']").prop('checked') == true) {
        //         categorias.push($("input[name='bla[]']").val())
        //     }
        // });
        
        // console.log($("input[name='bla[]']").value())
        // console.log(categorias)

        
            
        
        
        

    }
})

/*function refreshUsers() {
    $.ajax({
        type: 'GET',
        url: 'api/posts',
        success: function (data) {
            var txt = "";
            txt += "<table class='table' style='padding:10px; width:70%; margin:0% 15% 0% 15%'>"; 
            txt += "<thead style='background-color:#607d8b; color:white '>";
            txt += "<tr><th style='text-align:right'>Primeiro Nome</th><th style='text-align:right'>Segundo Nome</th></tr></thead><tbody>"; 
            data.forEach(function (row) {
                txt += "<tr><td style='text-align:right'>" + row.firstName + "</td><td style='text-align:right'>" + row.secondName + "</td></tr>";
            });
            txt += "</tbody></table>";
        $("#result").html(txt);
        }
        });
}*/


function validTokenB() {

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

                    //esconder os botoes
                    $("#log").hide();
                    $("#reg").hide()

                    //apresentar os botoes
                    $("#meuPerfil").show();
                    $("#minhasNoticias").show();
                    $("#divider").show();
                    $("#addNews").show();


                    if (localStorage.getItem("idUser")) {

                        $.ajax({
                            type: 'GET',
                            url: 'app/users/find/' + JSON.parse(localStorage.getItem('idUser')),
                            headers: {
                                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                            },
                            success: function (result) {
                                
                                //preencher form meu perfil
                               
                                $("#nomeUtili").html(result.nome)
                                $("#emailUtili").html(result.email)
                                
                                
                                if (result.admin == true) {
                                    console.log('é admin')

                                    //apresentar os botoes
                                    $("#dropdownAdmn").show();

                                } else {
                                    console.log('não é admin')

                                    //esconder os botoes

                                    $("#dropdownAdmn").hide();
                                }

                            }
                        });

                    }else{
                        $("#meuPerfil").hide();
                        $("#minhasNoticias").hide();
                        $("#divider").hide();
                        $("#addNews").hide();
                        $("#dropdownAdmn").hide();
                    }

                } else {
                    $("#meuPerfil").hide();
                    $("#minhasNoticias").hide();
                    $("#divider").hide();
                    $("#addNews").hide();
                    $("#dropdownAdmn").hide();
                    
                    $("#log").show();
                    $("#reg").show()
                    
                    localStorage.removeItem('user')
                    localStorage.removeItem('idUser')
                    window.location.replace("https://ea8-cfportela.c9users.io/paginaInicial");
                }
            },
            error: function (data) { console.log(data) }
        })
    }else{
        
        $("#meuPerfil").hide();
        $("#minhasNoticias").hide();
        $("#divider").hide();
        $("#addNews").hide();
        $("#dropdownAdmn").hide();
        
        
        $("#log").show();
        $("#reg").show()
        
    }
}

