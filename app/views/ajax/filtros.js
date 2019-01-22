$(document).ready(function () {
   
  // Variaveis
    var racios = ["", "", ""];
    var DatAtual = new Date();
    
    // Se este local storage existir
        if (localStorage.getItem("racio"))
            racios = JSON.parse(localStorage.getItem("racio"));
            
         // Se a switch4 foi usada
         if (racios[1] != "" && racios[2] != ""){
           
          if (DatAtual.getTime() > new Date(racios[2]).getTime()) {
               
              // Variaveis para calcular o numero de dias de diferença
              var oneDay = 24 * 60 * 60 * 1000; 
              var firstDate = new Date(racios[1]);
              var secondDate = new Date(racios[2]);

              // diferença de dias
              var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
               
              DatAtual.setDate(new Date(racios[2]).getDate() + diffDays);
               
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
              racios[2] = ano +"-"+ mes +"-"+ dia;
               
              // Actualizar racio
              localStorage.setItem('racio', JSON.stringify(racios));
            }
          
          $('#switch4').prop('checked', true);
          $('#data1').val(racios[1]);
          $('#data2').val(racios[2]);
          
          $("#data1").prop('disabled', true);
          $("#data2").prop('disabled', true);
        }
        
        else{
            $("#data1").prop('disabled', false);
            $("#data2").prop('disabled', false);
        }
            
        if (racios[0] == "crescente"){
           
          $('#switch0').prop('checked', true);
          $('#switch1').prop('checked', false);
          $('#switch2').prop('checked', false);
          $('#switch3').prop('checked', false);
        }
    
        if (racios[0] == "decrescente"){
           
          $('#switch0').prop('checked', false);
          $('#switch1').prop('checked', false);
          $('#switch2').prop('checked', true);
          $('#switch3').prop('checked', false);
        }
    
    if (racios[0] == "antigo"){
         
          $('#switch0').prop('checked', false);
          $('#switch1').prop('checked', false);
          $('#switch2').prop('checked', false);
          $('#switch3').prop('checked', true);
    }
    
    if (racios[0] == "novo"){
          $('#switch0').prop('checked', false);
          $('#switch1').prop('checked', true);
          $('#switch2').prop('checked', false);
          $('#switch3').prop('checked', false);
    }
    
    // Fazer o display das notícias mais vistas desta semana nas Principais notícias
    $('#switch0').click(function () {

        $('#switch0').change(function () {
            if ($(this).prop("checked")) {
                $('#switch1').prop('checked', false);
                $('#switch2').prop('checked', false);
                $('#switch3').prop('checked', false);

                console.log('sim')
            } else {
               
                console.log('nao')
            }
        });
        
        if ($("#switch0").is(":checked")) {
            racios[0]="crescente"
             
            
        }else{
            racios[0]=""
        }
        localStorage.setItem('racio', JSON.stringify(racios));
        //var isChecked = $('#chkSelect').attr('checked') ? true : false;




    });

    // Fazer o display das notícias mais recentes nas Principais notícias
    $('#switch1').click(function () {

          $('#switch1').change(function () {
            if ($(this).prop("checked")) {
                $('#switch0').prop('checked', false);
                $('#switch2').prop('checked', false);
                $('#switch3').prop('checked', false);

                console.log('sim')
            } else {
               
                console.log('nao')
            }
        });
        
        if ($("#switch1").is(":checked")) {
            racios[0]="novo"
            
            
        }else{
            racios[0]=""
        }
        
        
        localStorage.setItem('racio', JSON.stringify(racios));
        //var isChecked = $('#chkSelect').attr('checked') ? true : false;



    });
    
    // Fazer o display das  notícias menos vistas desta semana nas Principais notícias
    $('#switch2').click(function () {

          $('#switch2').change(function () {
            if ($(this).prop("checked")) {
                $('#switch0').prop('checked', false);
                $('#switch1').prop('checked', false);
                $('#switch3').prop('checked', false);

                console.log('sim')
            } else {
               
                console.log('nao')
            }
        });
        
        if ($("#switch2").is(":checked")) {
            racios[0]="decrescente"
             
            
        }else{
            racios[0]=""
        }
        
        localStorage.setItem('racio', JSON.stringify(racios));
        //var isChecked = $('#chkSelect').attr('checked') ? true : false;



    });
    
    // Fazer o display das notícias mais antigas nas Principais notícias
    $('#switch3').click(function () {

          $('#switch3').change(function () {
            if ($(this).prop("checked")) {
                $('#switch0').prop('checked', false);
                $('#switch1').prop('checked', false);
                $('#switch2').prop('checked', false);

                console.log('sim')
            } else {
               
                console.log('nao')
            }
        });
        
        if ($("#switch3").is(":checked")) {
            racios[0]="antigo"
            
            
        }else{
            racios[0]=""
        }
        
         
        localStorage.setItem('racio', JSON.stringify(racios));
        //var isChecked = $('#chkSelect').attr('checked') ? true : false;



    });
    
    // Fazer o display das notícias mais antigas nas Principais notícias
    $('#switch4').click(function () {
        
        // Variaveis data
        var data1 = new Date($('#data1').val()).getTime();
        var data2 = new Date($('#data2').val()).getTime();
        
        if ( data1 > data2 || isNaN == true || isNaN(data2) == true){
            
             $('#switch4').prop('checked', false);
            alert("Tens de escolher uma data para cada caixa e a primeira caixa tem de ser menor que a segunda!");
            
        }
        else{
            if ($("#switch4").is(":checked")) {
            
            racios[1]= $('#data1').val();
            racios[2]= $('#data2').val();
            $("#data1").prop('disabled', true);
            $("#data2").prop('disabled', true);
             
            
        }else{
             
             racios[1]= "";
             racios[2]=  "";
             
             $('#data1').val(racios[1])
             $('#data2').val(racios[2])
             
             $("#data1").prop('disabled', false);
             $("#data2").prop('disabled', false);
        }
        
        localStorage.setItem('racio', JSON.stringify(racios));
        //var isChecked = $('#chkSelect').attr('checked') ? true : false;
        }



    });

    
});
