
$(document).ready(function () {
   
//   // Variaveis
//     var racios = ["", "", ""];
//     var DatAtual = new Date();
    
//     // Se este local storage existir
//         if (localStorage.getItem("racio"))
//             racios = JSON.parse(localStorage.getItem("racio"));
            
//          // Se a switch4 foi usada
//          if (racios[1] != "" && racios[2] != ""){
           
//           if (DatAtual.getTime() > new Date(racios[2]).getTime()) {
               
//               // Variaveis para calcular o numero de dias de diferença
//               var oneDay = 24 * 60 * 60 * 1000; 
//               var firstDate = new Date(racios[1]);
//               var secondDate = new Date(racios[2]);

//               // diferença de dias
//               var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
               
//               DatAtual.setDate(new Date(racios[2]).getDate() + diffDays);
               
//               //Ano
//               var ano = DatAtual.getFullYear();
               
//               // Mês
//               var mes;
              
//               if (DatAtual.getMonth() < 10)
//               {
//                   mes = 1 + DatAtual.getMonth();
                   
//                   mes = "0" + mes;
//               }
//               else
//               {
//                   mes = DatAtual.getMonth() + 1;
//               }
               
//               var dia;
//               if (DatAtual.getDate() < 10)
//               {
//                   dia = "0" + DatAtual.getDate();
//               }
//               else
//               {
//                   dia = DatAtual.getDate();
//               }
               
//               // Nova data2
//               racios[2] = ano +"-"+ mes +"-"+ dia;
               
//               // Actualizar racio
//               localStorage.setItem('racio', JSON.stringify(racios));
//             }
          
//           $('#switch4').prop('checked', true);
//           $('#data1').val(racios[1]);
//           $('#data2').val(racios[2]);
          
//           $("#data1").prop('disabled', true);
//           $("#data2").prop('disabled', true);
//         }
        
//         else{
//             $("#data1").prop('disabled', false);
//             $("#data2").prop('disabled', false);
//         }
            
//         if (racios[0] == "crescente"){
           
//           $('#switch0').prop('checked', true);
//           $('#switch1').prop('checked', false);
//           $('#switch2').prop('checked', false);
//           $('#switch3').prop('checked', false);
//         }
    
//         if (racios[0] == "decrescente"){
           
//           $('#switch0').prop('checked', false);
//           $('#switch1').prop('checked', false);
//           $('#switch2').prop('checked', true);
//           $('#switch3').prop('checked', false);
//         }
    
//     if (racios[0] == "antigo"){
         
//           $('#switch0').prop('checked', false);
//           $('#switch1').prop('checked', false);
//           $('#switch2').prop('checked', false);
//           $('#switch3').prop('checked', true);
//     }
    
//     if (racios[0] == "novo"){
//           $('#switch0').prop('checked', false);
//           $('#switch1').prop('checked', true);
//           $('#switch2').prop('checked', false);
//           $('#switch3').prop('checked', false);
//     }
    
//     // Fazer o display das notícias mais vistas desta semana nas Principais notícias
//     $('#switch0').click(function () {

//         $('#switch0').change(function () {
//             if ($(this).prop("checked")) {
//                 $('#switch1').prop('checked', false);
//                 $('#switch2').prop('checked', false);
//                 $('#switch3').prop('checked', false);

//                 console.log('sim')
//             } else {
               
//                 console.log('nao')
//             }
//         });
        
//         if ($("#switch0").is(":checked")) {
//             racios[0]="crescente"
             
            
//         }else{
//             racios[0]=""
//         }
//         localStorage.setItem('racio', JSON.stringify(racios));
//         //var isChecked = $('#chkSelect').attr('checked') ? true : false;




//     });

//     // Fazer o display das notícias mais recentes nas Principais notícias
//     $('#switch1').click(function () {

//           $('#switch1').change(function () {
//             if ($(this).prop("checked")) {
//                 $('#switch0').prop('checked', false);
//                 $('#switch2').prop('checked', false);
//                 $('#switch3').prop('checked', false);

//                 console.log('sim')
//             } else {
               
//                 console.log('nao')
//             }
//         });
        
//         if ($("#switch1").is(":checked")) {
//             racios[0]="novo"
            
            
//         }else{
//             racios[0]=""
//         }
        
        
//         localStorage.setItem('racio', JSON.stringify(racios));
//         //var isChecked = $('#chkSelect').attr('checked') ? true : false;



//     });
    
//     // Fazer o display das  notícias menos vistas desta semana nas Principais notícias
//     $('#switch2').click(function () {

//           $('#switch2').change(function () {
//             if ($(this).prop("checked")) {
//                 $('#switch0').prop('checked', false);
//                 $('#switch1').prop('checked', false);
//                 $('#switch3').prop('checked', false);

//                 console.log('sim')
//             } else {
               
//                 console.log('nao')
//             }
//         });
        
//         if ($("#switch2").is(":checked")) {
//             racios[0]="decrescente"
             
            
//         }else{
//             racios[0]=""
//         }
        
//         localStorage.setItem('racio', JSON.stringify(racios));
//         //var isChecked = $('#chkSelect').attr('checked') ? true : false;



//     });
    
//     // Fazer o display das notícias mais antigas nas Principais notícias
//     $('#switch3').click(function () {

//           $('#switch3').change(function () {
//             if ($(this).prop("checked")) {
//                 $('#switch0').prop('checked', false);
//                 $('#switch1').prop('checked', false);
//                 $('#switch2').prop('checked', false);

//                 console.log('sim')
//             } else {
               
//                 console.log('nao')
//             }
//         });
        
//         if ($("#switch3").is(":checked")) {
//             racios[0]="antigo"
            
            
//         }else{
//             racios[0]=""
//         }
        
         
//         localStorage.setItem('racio', JSON.stringify(racios));
//         //var isChecked = $('#chkSelect').attr('checked') ? true : false;



//     });
    
//     // Fazer o display das notícias mais antigas nas Principais notícias
//     $('#switch4').click(function () {
        
//         // Variaveis data
//         var data1 = new Date($('#data1').val()).getTime();
//         var data2 = new Date($('#data2').val()).getTime();
        
//         if ( data1 > data2 || isNaN == true || isNaN(data2) == true){
            
//              $('#switch4').prop('checked', false);
//             alert("Tens de escolher uma data para cada caixa e a primeira caixa tem de ser menor que a segunda!");
            
//         }
//         else{
//             if ($("#switch4").is(":checked")) {
            
//             racios[1]= $('#data1').val();
//             racios[2]= $('#data2').val();
//             $("#data1").prop('disabled', true);
//             $("#data2").prop('disabled', true);
             
            
//         }else{
             
//              racios[1]= "";
//              racios[2]=  "";
             
//              $('#data1').val(racios[1])
//              $('#data2').val(racios[2])
             
//              $("#data1").prop('disabled', false);
//              $("#data2").prop('disabled', false);
//         }
        
//         localStorage.setItem('racio', JSON.stringify(racios));
//         //var isChecked = $('#chkSelect').attr('checked') ? true : false;
//         }



//     });

    racio()
    
    // $("#todos").css("background-color", 'rgb(66, 133, 246)');
    
    //  $("#arte").css("background-color", "rgb(46, 46, 46)");
    //  $("#design").css("background-color", "rgb(46, 46, 46)");
    //  $("#tecnologias").css("background-color", "rgb(46, 46, 46)");
    //  $("#arquitetura").css("background-color", "rgb(46, 46, 46)");
    
});

function racio(){
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
