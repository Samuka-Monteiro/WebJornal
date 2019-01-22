$(document).ready(function(){
    principaisNoticias();
})

function principaisNoticias (){
    
     $.ajax({
        type: 'GET',
        url: 'app/posts',
        success: function (data) {
            listarPrincipaisNoticias(data)

        }
    });
}

function listarPrincipaisNoticias(data){
    
    // Variaveis 
    var txt = "";
    var cont = 0;
    var racio = ["", "", ""];
    var DatAtual = new Date(); 
    var data1;
    var data2;
     
    
     // Se este local storage existir
        if (localStorage.getItem("racio"))
            racio = JSON.parse(localStorage.getItem("racio"));
            
     // Update do racio por dias/semanas/meses/anos quando a data atual é maior que a data maior defenida no rácio            
     if (racio[1] != "") {
         
         
            if (DatAtual.getTime() > new Date(racio[2]).getTime()) {

               
              // Variaveis para calcular o numero de dias de diferença
               var oneDay = 24 * 60 * 60 * 1000; 
               var firstDate = new Date(racio[1]);
               var secondDate = new Date(racio[2]);

               // diferença de dias
               var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
               
               DatAtual.setDate(new Date(racio[2]).getDate() + diffDays);
               
               //Ano
               var ano = DatAtual.getFullYear();
               
               // Mês
               var mes;
              
               if (DatAtual.getMonth() < 10)
               {
                   mes = 1 + DatAtual.getMonth();
                   
                   mes = "0" + mes;
               }
               else
               {
                   mes = DatAtual.getMonth() + 1;
               }
               
               var dia;
               if (DatAtual.getDate() < 10)
               {
                   dia = "0" + DatAtual.getDate();
               }
               else
               {
                   dia = DatAtual.getDate();
               }
               
               // Nova data2
               racio[2] = ano +"-"+ mes +"-"+ dia;
               
               // Actualizar racio
               localStorage.setItem('racio', JSON.stringify(racio));
            }
            
                data1 = new Date(racio[1]).getTime();
                data2 = new Date(racio[2]).getTime();
            

        }
    
   
            
    if (racio[0] == "crescente"){
        data.sort(crescente);
    }
    
    if (racio[0] == "decrescente"){
        data.sort(decrescente);
    }
    
    if (racio[0] == "antigo"){
        data.sort(sortByOldest);
    }
    
    if (racio[0] == "novo"){
        data.sort(sortByDate);
    }
           
    txt += `<!-- Section heading -->
            <h2 class="h1-responsive font-weight-bold text-center my-5">Principais notícias</h2>
            <!-- Section description -->
            <p class="text-center dark-grey-text w-responsive mx-auto mb-5">As tuas principais notícias desta semada ordenadas 'racio'.</p>`

    data.forEach(function (row) {
        
         if (data1 <= new Date(row.created_at).getTime() && data2 >= new Date(row.created_at).getTime())
            {
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
                            <a class="font-weight-bold">Samuel Monteiro</a>, 12/04/2018
                        </div>
                        <div class="col-2">
                            <span class="badge badge-secondary badge-pill" title='Número de visualizações'>${row.num_visualizacao}</span>
                        </div>
                    </div>
                </p>`

        txt += ` <div id='lerMais` + cont + `'> <button class='btn btn-primary btn-m'>Ler mais</button>
                </div> 
                </div> 
                </div> 
                </div>  
                <hr class="my-5">`

        cont++
            }
            
         if (racio[1] == "" && racio[2] == ""){
            
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
                            <a class="font-weight-bold">Samuel Monteiro</a>, 12/04/2018
                        </div>
                        <div class="col-2">
                            <span class="badge badge-secondary badge-pill" title='Número de visualizações'>${row.num_visualizacao}</span>
                        </div>
                    </div>
                </p>`

        txt += ` <div id='lerMais` + cont + `'> <button class='btn btn-primary btn-m' onclick='noticiaInfo("${row._id}")'>Ler mais</button>
                </div> 
                </div> 
                </div> 
                </div>  
                <hr class="my-5">`

        cont++
        }
    });
    
    
    $("#principaisNoticias").html(txt);
    
    
}

function crescente (a, b){
    if (parseInt(a.num_visualizacao) > parseInt(b.num_visualizacao))
    return -1;
  if (parseInt(a.num_visualizacao) < parseInt(b.num_visualizacao))
    return 1;
  return 0;
}

function decrescente (a, b){
    if (parseInt(a.num_visualizacao) < parseInt(b.num_visualizacao))
    return -1;
  if (parseInt(a.num_visualizacao) > parseInt(b.num_visualizacao))
    return 1;
  return 0;
}

function sortByDate (a, b){
    return -(new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

function sortByOldest (a, b){
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
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