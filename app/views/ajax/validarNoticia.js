var idUt=''

$(document).ready(function () {

    listarNoticia()
    
});

function listarNoticia() {

        $.ajax({
            type: 'GET',
            url: 'app/noticiasNovas/find',
            headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            success: function (data) {
                //debugging para ver se foi pedido com sucesso
                
                
                var strHTML = "";

                strHTML += `<div class="table-container">
                            <table class="table table-filter">
                                <tbody>`

                data.forEach(function (row) {
                
                    strHTML += `
                                <tr data-status="" data-toggle="modal" data-target="#verNoticiaModal" onclick="preecherModal('${row._id}')">
                                        <td>
                                            <div class="media">
                                                <a href="#" class="pull-left">
                                                    <img src="${row.link}" class="media-photo">
                                                </a>
                                                <div class="media-body">
                                                    <span class="media-meta pull-right">${dataRegisto(row.created_at)}</span>
                                                    <h4 class="title">
                                                        ${row.titulo}
                                                        <span class=" media-meta pull-right">${horaRegisto(row.created_at)}</span>
                                                    </h4>
                                                    <p class="summary">${row.autor}</p>
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
            url: 'app/find/' + id,
             headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
            },
            success: function (data) {
                
                idUt = data.idUtilizador
                
                var categoria = ""

                for (var i = 0; i < data.categoria.length; i++) {
                    categoria += data.categoria[i] + "\n"
            
                }
                        
                        $('#modalIdLink').attr('src',data.link)
                        $('#modalIdTitle').html(data.titulo)
                        $('#modalIdFonte').html(data.fonte)
                        $('#modalIdAutor').html(data.autor)
                        $('#modalIdDescricao').html(data.descricao)
                        $('#modalIdTexto').html(data.texto)
                        $('#modalIdCateg').html(categoria)
                        
            }
        });
        
    $("#btnValidar").click(function(){
        
        swal({
        title: "Tens a certeza?",
        text: "Esta noticia será exibida nas timelines!",
        icon: "warning",
        buttons: true,
        dangerMode: false,
    })
        .then((willValidate) => {
            if (willValidate) {

                 $.ajax({
                    type: 'PUT',
                    url: 'app/estadoNoticia/post/' + id,
                     headers: {
                        'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                    },
                    //data: JSON.stringify(data),
                    contentType: 'application/json',
                    //os dados recebidos do model estão na variável data
                    success: function (data) {
                    
                    swal("Validou a noticia");
                    $('#verNoticiaModal').modal('hide')
                    $('#formMotivo')[0].reset();
                    listarNoticia()

                    
                }
            });
            
                $.ajax({
                    type: 'GET',
                    url: 'app/users/find/' + idUt,
                    headers: {
                        'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                    },
                    success: function (result) {
                            $.ajax({
                                type: 'POST',
                                url: '/emailConfirmacaoNoticia',
                                data: JSON.stringify(result),
                                contentType: 'application/json',
                                success: function (result0) {
                                    //analisa res.end que está no result e se o status for 200 envia um alerta
                                    if (result.status == 200) { alert("submitted with success"); }
                                },
                                error: function (data) { console.log(data) }
                            });
                    
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
            text: "Esta noticia será eliminada e vai ser enviado um email a explicar o motivo a quem a publicou!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willValidate) => {
                if (willValidate) {
    
    $.ajax({
                type: 'GET',
                url: 'app/users/find/' + idUt,
                headers: {
                    'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                },
                success: function (result) {
                    var dadosP={}
                    dadosP.email=result.email
                    dadosP.nome=result.nome
                    dadosP.motivo=$('#idMotivo').val()
                    console.log(dadosP.motivo)
                        $.ajax({
                            type: 'POST',
                            url: '/emailRegeitarNoticia',
                            data: JSON.stringify(dadosP),
                            contentType: 'application/json',
                            success: function (result0) {
                                //analisa res.end que está no result e se o status for 200 envia um alerta
                                if (result.status == 200) { alert("submitted with success"); }
                            },
                            error: function (data) { console.log(data) }
                        });
                
                }
            });
            
            $.ajax({
                type: 'DELETE',
                url: 'app/delete/' + id,
                headers: {
                    'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                },
                //data: JSON.stringify(data),
                contentType: 'application/json',
                //os dados recebidos do model estão na variável data
                success: function (data) {
                    
                    swal("Noticia eliminada!");
                    $('#verNoticiaModal').modal('hide')
                    $('#motivoNoticiaModal').modal('hide')
                    $('#formMotivo')[0].reset();
                    listarNoticia()
                    
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