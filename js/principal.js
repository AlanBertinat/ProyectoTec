$(document).ready(function(){
    logueado = 1;
    //Muestra divisa de uf. (1er Funcionalidad)
    $.getJSON('https://mindicador.cl/api', function(data) {
        var dato = data;
        if (dato != null){
            $("#tblcodigo").text(dato.uf.codigo);
            $("#tblfecha").text(dato.uf.fecha);
            $("#tblnombre").text(dato.uf.nombre);
            $("#tblum").text(dato.uf.unidad_medida);
            $("#tblvalor").text(dato.uf.valor);
            $("#txtapi2").val("");
        }
        else{
            $("#msj").text('Error al consumir la API!');
        }
    });

    //Muestra divisa segun lo desee el usuario (2da Funcionalidad).
    $("#btndivisa1").click(function(){
        var busc = $("#txtapi2").val();
        $.getJSON('https://mindicador.cl/api/' + busc , function(data) {
            var dato = data;
            if (dato != null){
                $("#tblcodigo1").text(dato.codigo);
                $("#tblfecha1").text(dato.serie[0].fecha);
                $("#tblnombre1").text(dato.nombre);
                $("#tblum1").text(dato.unidad_medida);
                $("#tblvalor1").text(dato.serie[0].valor);
                $("#txtapi2").val("");
            }
            else{
                $("#msj").text('Error al consumir la API ');
            }
        });
    });

    //Usando Api de usuario random (3er Funcionalidad).
    $.getJSON('https://randomuser.me/api/', function(randomusers) {
        var dato =  randomusers.results[0];
        if (dato != null){
            $("#tblnom").text(dato.name.first);
            $("#tblnom2").text(dato.name.last);
            $("#tblnomenclatura").text(dato.name.title);
            $("#tblimg").append('<img src = '+ dato.picture.medium + '></img>');
        }
        else{
            $("#msj").text('Error al consumir la API');
        }
    });

    //Usando api de mercado libre (4ta Funcionalidad).
    $("#btnbusqueda").click(function(){
    var busqueda =  $("#busquedaml").val();
        $.getJSON('https://api.mercadolibre.com/sites/MLU/search?q=valor_busqueda/'+ busqueda , function(datos) {
            var dato =  datos;
            var table = $('#tblmercadolibre');
            for(var i=0 ; i< dato.results.length; i++){
                if(i < 3){
                    if (dato != null) {
                        table.append( '<tr><td>' + dato.results[i].title + '</td>' + '<td>' + dato.results[i].currency_id + '</td>'
                        + '<td>' + dato.results[i].price + '</td>' +
                        '<td> <img src = '+ dato.results[i].thumbnail + '></img>' + '</td></tr>' );
                    }
                    else{
                        $("#msj").text("No hay mas datos para mostrar");
                    }
                }
                else {
                    return;
                }
        }
        });
    });
});
