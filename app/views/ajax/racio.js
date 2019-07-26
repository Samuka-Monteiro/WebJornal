
$(document).ready(function () {
    racio()    
});

function racio(){
    console.log("Enr«tou")
    $.ajax({
        type: 'GET',
        url: 'app/racio/find',
        success: function (data) {
            
            if (data[0].estado_racio==true) {
                //buscar as noticias que foram criadas num determinado numero de semanas
             $( "#switchR" ).prop( "checked", true );
             $( "#oRacio" ).html( 'o racio é de '+data[0].racio+' semanas.' );
              
             var data0= dataAtual(new Date())
             var data1=new Date()
             data1.setDate(data1.getDate() - data[0].racio*7)
             data1=dataAtual(data1)
            
             
           
                $.ajax({
                type: 'GET',
                url: 'app/noticia/numSemanas/'+data1+'/'+data0,
                    success: function (data) {
                    
                        listar(data)
            
                    }
                });        
                        
                        
                        
                        
                        
            } else {
                $( "#switchR" ).prop( "checked", false );
                 $( "#oRacio" ).html( 'o racio encontra-se desligado.' );
                console.log('racio desligado')
            }
           $("#semanas").val(data[0].racio);
    
        }
    });
}

function definirRacio(){

    var estado_racio; 
    if ( $("#switchR").is(":checked")) {
        estado_racio = true
    }else{
        estado_racio = false
    }

    var data={}
    data.racio=$("#semanas").val()
    data.estado_racio=estado_racio
    $.ajax({
        type: 'PUT',
        url: 'app/racio/post/',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
           racio()
        }
    });
    
}

function dataAtual(date){

        var d = new Date(date);
        
        
        
        var day = d.getDate();
        var month = (d.getMonth()+1);
        var year = d.getFullYear();
        var hora= d.getHours()
        var minuto= d.getMinutes()
        var segundo= d.getSeconds()
        
        if (day   < 10) {day   = "0"+day;}
		if (month < 10) {month = "0"+month;}
		
		if (hora  < 10) {hora  = "0"+hora;}
		if (minuto < 10) {minuto = "0"+minuto;}
		if (segundo < 10) {segundo = "0"+segundo;}
        
        var strDate = year + "-" + month + "-" + day+'T'+hora+':'+minuto+':'+segundo+'.379Z';
   
        return strDate 
    
}

function listar(data){
        
    var txt = "";
    var views=0
    var cont = data.length
    var dividir=0
 
     data.forEach(function (row) {
           views +=parseInt(row.num_visualizacao) 
        })
    
   dividir =cont/views
   
   console.log(data)
    console.log(views)
    console.log(cont)
    console.log(dividir)
    
    data.forEach(function (row) {
        
        
        dividir = cont/views
        
        var dividir1 = row.num_visualizacao/views
        
        if (dividir1 < dividir) {
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
        } 

    });

    $("#principaisNoticias").html(txt);
    
}

// function nome(id){
//     $.ajax({
//             type: 'GET',
//             url: 'app/users/findUtilizador/' + id,
        
//             success: function (result) {
                
//               localStorage.setItem('nomeUser'+cont, JSON.stringify(result.nome))
//               cont++
              
//             }
//         });
//         return JSON.parse(localStorage.getItem('nomeUser'+cont1))
//         cont1++
// }

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


$("#search2").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#principaisNoticias .row").filter(function () {

        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

        //($("#listarTodasNoticias .my-5").toggle($(this).text().toLowerCase().indexOf(value) > -1)

    });


});
