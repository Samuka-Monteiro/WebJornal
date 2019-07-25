

$(document).ready(function () {

     todasNoticias()
     
    
})


function todasNoticias() {
    $("#todos").css("background-color", 'rgb(66, 133, 246)');
    
     $("#arte").css("background-color", "rgb(46, 46, 46)");
     $("#design").css("background-color", "rgb(46, 46, 46)");
     $("#tecnologias").css("background-color", "rgb(46, 46, 46)");
     $("#arquitetura").css("background-color", "rgb(46, 46, 46)");
    $.ajax({
        type: 'GET',
        url: 'app/posts',
        
        success: function (data) {
            
            listarTodasNoticias(data)

        }
    });
}

function categoria(categoria) {

    if (categoria == "Arte") {
        $("#arte").css("background-color", 'rgb(66, 133, 246)');
        
        //desativar as outras
        $("#todos").css("background-color", "rgb(46, 46, 46)");
        $("#design").css("background-color", "rgb(46, 46, 46)");
         $("#tecnologias").css("background-color", "rgb(46, 46, 46)");
         $("#arquitetura").css("background-color", "rgb(46, 46, 46)");
      
    } else if (categoria == "Design") {
        $("#design").css("background-color", 'rgb(66, 133, 246)');
        
        //desativar as outras
         $("#todos").css("background-color", "rgb(46, 46, 46)");
        $("#arte").css("background-color", "rgb(46, 46, 46)");
        $("#tecnologias").css("background-color", "rgb(46, 46, 46)");
         $("#arquitetura").css("background-color", "rgb(46, 46, 46)");
      
      
    } else if (categoria == "Tecnologias") {
        $("#tecnologias").css("background-color", 'rgb(66, 133, 246)');
        
        //desativar as outras
        $("#arquitetura").css("background-color", "rgb(46, 46, 46)");
         $("#todos").css("background-color", "rgb(46, 46, 46)");
        $("#arte").css("background-color", "rgb(46, 46, 46)");
        $("#design").css("background-color", "rgb(46, 46, 46)");
    } else {
        $("#arquitetura").css("background-color", 'rgb(66, 133, 246)');
        
        //desativar as outras
        $("#todos").css("background-color", "rgb(46, 46, 46)");
        $("#arte").css("background-color", "rgb(46, 46, 46)");
        $("#design").css("background-color", "rgb(46, 46, 46)");
        $("#tecnologias").css("background-color", "rgb(46, 46, 46)");
    }


    $.ajax({
        type: 'GET',
        url: 'app/finds/' + categoria,
       
        success: function (data) {
            if (data.length == 0) {
                swal("Desculpe!", "Não existe nenhuma notícia com esta categoria");
            } else {
                listarTodasNoticias(data)
            }


        }
    });


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

function listarTodasNoticias(data) {

    var txt = "";
 
   
    data.forEach(function (row) {
        
        
        txt += `<div class="row" >
                <div class="col-lg-5 col-xl-4"> 
                    <div class="view overlay rounded z-depth-1-half mb-lg-0 mb-4">`


        txt += `<img class="img-fluid" src="${row.link}"
                        alt="Sample image">
                    <a>
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>
            </div>


            <div class="col-lg-7 col-xl-8">
            <h3 class="font-weight-bold dark-grey-text mb-3">
            <a>${row.titulo}</a>
        </h3>
                
               
                <p class="dark-grey-text">${row.descricao}</p>
               
                <p>
                    <div class="row">
                        <div class="col-10">
                            por
                            <a class="font-weight-bold">${row.nome_utilizador}</a>, ${dataRegisto(row.created_at)}
                        </div>
                        <div class="col-2">
                            <span class="badge badge-secondary badge-pill" title='Número de visualizações'>${row.num_visualizacao}</span>
                        </div>
                    </div>
                </p>`

        txt += ` <div> <button class='btn btn-primary btn-sm'  onclick='noticiaInfo("${row._id}")'>Ler mais</button>
                </div> 
                </div> 
                </div> 
                </div>  
                <hr class="my-5">`

    });

    $("#listarTodasNoticias").html(txt);

}

function nomeUtilizador(idUtilizador){
    
}

function noticiaInfo(id) {

    $.ajax({
        type: 'GET',
        url: 'app/find/' + id,
        
        success: function (data) {


            //update num_visualizações
            data.num_visualizacao = parseInt(data.num_visualizacao) + 1
           

            updateViews(id, data)

            localStorage.setItem('noticia', JSON.stringify(data));
            load_home("contentBody", 'noticiaInfo.view');
        }
    });




}


function updateViews(id, data) {
    
    $.ajax({
        type: 'PUT',
        url: 'app/post/' + id,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (result) {
            console.log(result.titulo,result.num_visualizacao)
        }
    });
}


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


$("#inputPesquisaPac").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#listarTodasNoticias .row").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
