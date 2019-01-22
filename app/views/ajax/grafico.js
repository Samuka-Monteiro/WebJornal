$(document).ready(function () {
    
    
     $.ajax({
        type: 'GET',
        url: 'app/findG/',
        
        success: function (data) {
            
            var date = new Date().toDateString()

            
            var dados=[]
            data.forEach(function (row) {
              
                
                
                if ( (dataRegisto(row.created_at).substring(0,2)) 
                    <= (date.substring(date.lastIndexOf(' ')-2, date.lastIndexOf(' '))) 
                    && (dataRegisto(row.created_at).substring(0,2)) 
                    >=  ((date.substring(date.lastIndexOf(' ')-2, date.lastIndexOf(' '))) -7)
                ) {
                    console.log(dataRegisto(row.created_at))
                    dados.push(row)
                     //console.log(row.update_at)
                } 
            })
            
          
          grafico(dados)


        }
    });
});

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
var titulos=[]
var numViews=[]

function grafico(data){
    console.log(data)
    
    
    if (data.length<7) {
        $("#descricao").html(' Comparação das 7 noticias mais vistas da semana atravez de um Doughnut Chart.')
        for (var i = 0; i < data.length; i++) {
            titulos.push(data[i].titulo)
            numViews.push(data[i].num_visualizacao)
        }

        var ctxD = document.getElementById("doughnutChart").getContext('2d');
        var myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
                
                labels:  titulos,
                datasets: [
                    {
                        data: numViews,
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360","#ff5722","#4caf50" ],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774","#ff7043","#66bb6a"]
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
    } else{
        
        $("#descricao").html(' Comparação das noticias mais vistas da semana atravez de um Doughnut Chart.')
        
        var dataSort=[]
        dataSort=data.sort(compare)
        console.log(dataSort)
        
        var dadosGrafico=[]
        for(var i=dataSort.length-1;i>= dataSort.length-7; i--){
            dadosGrafico.push(dataSort[i])
        }
        
        
        for (var i = 0; i < dadosGrafico.length; i++) {
            titulos.push(data[i].titulo)
            numViews.push(data[i].num_visualizacao)
        }

        var ctxD = document.getElementById("doughnutChart").getContext('2d');
        var myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
                
                labels:  titulos,
                datasets: [
                    {
                        data: numViews,
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360","#ff5722","#4caf50" ],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774","#ff7043","#66bb6a"]
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
        
    }
    
}

 function compare(a, b) {
          // Use toUpperCase() to ignore character casing
          const genreA = parseInt(a.num_visualizacao);
          const genreB = parseInt(b.num_visualizacao);
        
          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        }