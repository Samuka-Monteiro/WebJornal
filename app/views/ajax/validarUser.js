$(document).ready(function () {

    listarUser()
});

function listarUser() {

        $.ajax({
            type: 'GET',
            url: 'app/usersNovos/find',
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            //os dados recebidos do model estão na variável data
            success: function (data) {
                
                //debugging para ver se foi pedido com sucesso

                var strHTML = "";

                strHTML += `<div class="table-container">
                            <table id="tabelaRegistos" class="table table-filter">
                                <tbody id="TabelaRegistos">`

                data.forEach(function (row) {
              
                    strHTML += `
                                <tr data-status="" data-toggle="modal" data-target="#verUserModal" onclick="preecherModal('${row._id}')">
                                        <td>
                                            <div class="media">
                                                <a href="#" class="pull-left">
                                                    <img src="../img/user.jpg" class="media-photo">
                                                </a>
                                                <div class="media-body">
                                                    <span class="media-meta pull-right">${dataRegisto(row.created_at)}</span>
                                                    <h4 class="title">
                                                        ${row.nome}
                                                        <span class=" media-meta pull-right">${horaRegisto(row.created_at)}</span>
                                                    </h4>
                                                    <p class="summary">${row.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                </tr>`
                })

                strHTML += ` </tbody>
                            </table>
                        </div>`
                $("#TabelaRegistos").html(strHTML);

            }
        });
}

function preecherModal(id){
    
     $.ajax({
            type: 'GET',
            url: 'app/users/find/' + id,
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            //os dados recebidos do model estão na variável data
            success: function (data) {
                        
                        $('#modalIdNomeUser').html(data.nome)
                        $('#modalIdEmail').html(data.email)
                        $('#modalIdSite').html(data.adress)
                        $('#modalIdResposta').html(data.answer)
                        
            }
        });
        
    $("#btnValidar").click(function(){
        
         swal({
        title: "Tens a certeza?",
        text: "Este utilizador vai fazer parte da equipa da Webjornal!",
        icon: "warning",
        buttons: true,
        dangerMode: false,
    })
        .then((willValidate) => {
            if (willValidate) {

             $.ajax({
            type: 'PUT',
            url: 'app/users/post/' + id,
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            //data: JSON.stringify(data),
            contentType: 'application/json',
            //os dados recebidos do model estão na variável data
            success: function (data) {
                
                
                  $.ajax({
                    type: 'POST',
                    url: '/emailConfirmacaoRegisto',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (result) {
                        //analisa res.end que está no result e se o status for 200 envia um alerta
                        if (result.status == 200) { alert("submitted with success"); }
                    },
                    error: function (data) { console.log(data) }
                });
                
                        
                swal("Validou o utilizador " + data.nome)
                $('#verUserModal').modal('hide')
                $('#formMotivo')[0].reset();
                listarUser()
                
            }
        });   
            } else {
                swal("Cancelada!");
            }
        });
        
    });
    
    $("#btnRemover").click(function(){
      
        swal({
            title: "Tens a certeza?",
            text: "Este utilizador será eliminado e vai ser enviado um email a explicar o motivo a quem se registou!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willValidate) => {
                if (willValidate) {
    
        
          $.ajax({
            type: 'PUT',
            url: 'app/users/post/' + id,
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            //data: JSON.stringify(data),
            contentType: 'application/json',
            //os dados recebidos do model estão na variável data
            success: function (data) {
                console.log(data)
                var dadosP={}
                dadosP.email=data.email
                dadosP.nome=data.nome
                dadosP.motivo=$('#idMotivo').val()
                console.log(data)
                  $.ajax({
                    type: 'POST',
                    url: '/emailRegeitarRegisto',
                    data: JSON.stringify(dadosP),
                    contentType: 'application/json',
                    success: function (result) {
                        //analisa res.end que está no result e se o status for 200 envia um alerta
                        if (result.status == 200) { alert("submitted with success"); }
                    },
                    error: function (data) { console.log(data) }
                });
                
                        
                swal("Validou o utilizador " + data.nome)
                $('#verUserModal').modal('hide')
                $('#formMotivo')[0].reset();
                listarUser()
                
            }
        });
        
        
       
    
    
        $.ajax({
            type: 'DELETE',
            url: 'app/users/delete/' + id,
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            //data: JSON.stringify(data),
            contentType: 'application/json',
            //os dados recebidos do model estão na variável data
            success: function (data1) {
               
                swal("Utilizador eliminado!");        
                $('#verUserModal').modal('hide')
                $('#motivoUserModal').modal('hide')
                $('#formMotivo')[0].reset();
                listarUser()
                
            }
        });
    
                } else {
                    swal("Cancelada!");
                }
            });
    
        });  
      
}


function dataRegisto(date){

        var d = new Date(date);
        
        var day =d.getDate();
        var month = (d.getMonth()+1);
        var year = d.getFullYear();
        
        if (day   < 10) {day   = "0"+day;}
		if (month < 10) {month = "0"+month;}
        
        var strDate = day + "/" + month + "/" + year;
   
        return strDate
        
}

function horaRegisto(date){

        var h = new Date(date);
        var hours = h.getHours();
        var minutes = h.getMinutes();
        
        if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		
        var strHour = hours + ":" + minutes;

        return strHour
        
}

