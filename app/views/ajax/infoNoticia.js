var dados = {}
var idU=""
var nomeU=""
$(document).ready(function () {
    apresentarNoticiaInfo()
     var news = JSON.parse(localStorage.getItem('noticia'));
     
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
                   
                    if (localStorage.getItem("idUser")) {

                        $.ajax({
                            type: 'GET',
                            url: 'app/users/find/' + JSON.parse(localStorage.getItem('idUser')),
                            headers: {
                                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                            },
                            success: function (result) {
                                //ver se a noticia é do utilizador
                                idU=result._id
                                nomeU = result.nome
                                
                                if (news.idUtilizador==result._id) {
                                    console.log('igual')
                                    $("#delete").show();
                                    $("#editar").show();
                                } else {
                                    console.log('diferente')
                                     $("#delete").hide();
                                    $("#editar").hide();
                                }
                               
                            }
                        });

                    } 

                } 
            },
            error: function (data) { console.log(data) }
        })
    } else {

         $("#delete").hide();
         $("#editar").hide();
        
    }
});

function noticiaInfo(id) {
    $.ajax({
        type: 'GET',
        url: 'app/find/' + id,
        success: function (data) {
            load_home("contentBody", 'noticiaInfo.view');


        }
    });
}

function alerta() {

 var data = JSON.parse(localStorage.getItem('noticia'));
    swal({
        title: "Tens a certeza?",
        text: "Uma vez apagada,não poderás recuperar esta notícia!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {


                $.ajax({
                    type: 'DELETE',
                    url: 'app/delete/' + data._id,
                    headers: {
                        'authorization': String(JSON.parse(localStorage.getItem("user")).token)
                    },
                    success: function (data) {
                        swal("A notícia foi apagada com sucesso!", {
                            icon: "success",
                        });
                        load_home("contentBody", 'todasNoticias.view');
                    }
                });


            } else {
                swal("Cancelada!");
            }
        });

}


function editar() {

    var data = JSON.parse(localStorage.getItem('noticia'));
    
    $.ajax({
        url: "app/find/" + data._id.toString(),
        type: 'GET',
        headers: {
                'authorization': String(JSON.parse(localStorage.getItem("user")).token)
        },
        success: function (response) {

            $('#id').val(response._id)
            $('#nomeE').val(response.titulo)
            $('#fonteE').val(response.fonte)
            $('#autorE').val(response.autor)
            $('#linkE').val(response.link)
            $('#descricaoE').val(response.descricao)
            $('#textoE').val(response.texto)
            
            var selectedTags = document.getElementsByClassName("chk")
            // for (var i =0; i < selCat.length; i++ ) {
            //     console.log(selCat[i].value)
            // }
            
            // $(".chk").each(function (i) {
            //     if (response.categoria.indexOf(selCat[i].value) != -1) {
            //                 selCat[i].checked = true
                            
            //     }
            //     else {
            //                 selCat[i].checked = false
            //     }
    
            // });
            
            for (let j = 0; j < selectedTags.length; j++) {
             
                console.log(selectedTags[j].getAttribute("value"))
                if (response.categoria.indexOf(selectedTags[j].getAttribute("value")) != -1) {
                    selectedTags[j].checked = true
                } else {
                    selectedTags[j].checked = false
                }
                break
            }
            
            
            //ativar clicks
           

        },
        error: function (data) { alert('Não foi possivel carregar a tabela!') }
    });


}

$('#formEditarNoticia').on('submit', (e) => {
    var categorias = []

    if (e.isDefaultPrevented()) {
        console.log("form with errors")

    }
    else {

        event.preventDefault();
        var data = {};
        data._id = $('#id').val()
        data.titulo = ($('#nomeE').val()).toUpperCase();
        data.fonte = $('#fonteE').val();
        data.autor = $('#autorE').val();
        data.link = $('#linkE').val();
        data.descricao = $('#descricaoE').val();
        data.texto = $('#textoE').val();
        data.estado_noticia = false;
        data.idUtilizador = idU
        data.nome_utilizador =nomeU
        
        //data.num_visualizacao = data.num_visualizacao 

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
    	    data.categoria = selected
    	    alert(selected)
    	   // console.log(data)
            $.ajax({
                type: 'PUT',
                url: "app/post/" + data._id,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (result) {
    
                  console.log(result)
                    $('#formEditarNoticia')[0].reset();
                    $('#editarNoticiaModal').modal('hide');
    
                    swal("A notícia foi editada com sucesso!", {
                        icon: "success",
                    });
    
                    localStorage.setItem('noticia', JSON.stringify(data));
                    apresentarNoticiaInfo()
    
    
                },
                error: function (data) { console.log(data) }
            });
    	}else{
    	    swal('Selecione uma categoria!')
    		
    	}

    }
})



function load_home(var1, var2) {
    $.ajax({
        type: "GET",
        url: "../" + var2 + ".html",
        data: {},
        success: function (data) {
            $("#" + var1).html(data);

        },
        error: function (data, err, err2) {
            console.log(data);
            console.log(err);
            console.log(err2);
            console.log(err2);
        }
    })
    var body = document.body,
        html = document.documentElement;
}




function dataRegisto(date){

        var d = new Date(date);
        
        var day = d.getDate();
        var month = (d.getMonth()+1);
        var year = d.getFullYear();
        
        if (day   < 10) {day   = "0"+day;}
		if (month < 10) {month = "0"+month;}
        
        var strDate = day + "/" + month + "/" + year;
   
        return strDate
        
}

function apresentarNoticiaInfo() {
    
  
   
    var data = JSON.parse(localStorage.getItem('noticia'));
    var txt = "";
    var categoria = ""

    for (var i = 0; i < data.categoria.length; i++) {
        categoria += data.categoria[i] + ","

    }
    

    txt += ` <section class="magazine-section my-5 pl-4">
    
            <h2 class="h1-responsive font-weight-bold text-center my-5">Informações sobre a notícia</h2>
    
            <p class="text-center dark-grey-text w-responsive mx-auto mb-5">
                Detalhes da notícia. Para mais Informações consulte a fonte da notícia caso esta tenha uma.
            </p>
    
            <div class="row pb-3">
                <div class="col-lg-6 col-md-12">
                    <div class="single-news mb-lg-0 mb-4">
                        <div class="view overlay rounded z-depth-1-half mb-4">
                            <img class="img-fluid" src="${data.link}"
                                alt="Sample image">
                            <a>
                                <div class="mask rgba-white-slight"></div>
                            </a>
                        </div>
                        <div class="news-data d-flex justify-content-between">
                            <a href="#!" class="deep-purple-text">
                                <h6 class="font-weight-bold">${data.categoria}</h6>
                            </a>
                            <p class="font-weight-bold dark-grey-text">
                                <i class="fa fa-clock-o pr-2"></i>${dataRegisto(data.created_at)}</p>
                        </div>
                        <h3 class="font-weight-bold dark-grey-text mb-3">
                            <a>${data.titulo}</a>
                        </h3>
                        <p class="dark-grey-text mb-lg-0 mb-md-5 mb-4">${data.descricao}</p>
    
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div class="single-news mb-4 ml-3">
                        <div class="row">
                            <div class="col-md-9">
                                <p class="font-weight-bold dark-grey-text">Fonte</p>
                                <div class="d-flex justify-content-between">
                                    <a href="#!" class="dark-grey-text">${data.fonte}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="single-news mb-4 ml-3">
                        <div class="row">
                            <div class="col-md-9">
                                <p class="font-weight-bold dark-grey-text">Autor</p>
                                <div class="d-flex justify-content-between">
                                    <a href="#!" class="dark-grey-text">${data.autor}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="single-news mb-4 ml-3">
                        <div class="row">
                            <div class="col-md-9">
                                <p class="font-weight-bold dark-grey-text">Mais detalhes</p>
                                <div class="d-flex justify-content-between">
                                    <a href="#!" class="dark-grey-text">${data.texto}
                                    </a>
                                </div>
    
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>`

    $("#informacaoNoticia").html(txt);
}