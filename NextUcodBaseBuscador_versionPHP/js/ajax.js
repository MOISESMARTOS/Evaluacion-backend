var itemMostrado = [],
    ciudad,
    tipos;

function mostrarTodos(event){
  event.preventDefault();
  $(".colContenido").html(itemMostrado);
}
//llamado a cargar datos
function datos(){
  $.ajax({
    data: "",
    url: "./php/lib.php",
    type: "post",
    dataType: "json",
    success: function(response){
      tituloContenido = response.tituloContenido;
      ciudad = response.ciudades;
      tipos = response.tipos;
      filtrosInit(ciudad, tipos);
      var long = Object.keys(response);
      for (var i = 0; i < long.length; i++) {
        itemMostrado[i] = response[i];
      }
    }
  });
}

//Cargar items del filtrado
function filtrosInit(city, type){
var filtro1 = city;
var filtro2 = type;
  $('#selectCiudad').append('<option value="'+filtro1[0]+'">'+filtro1[0]+'</option>',
                            '<option value="'+filtro1[1]+'">'+filtro1[1]+'</option>',
                            '<option value="'+filtro1[2]+'">'+filtro1[2]+'</option>',
                            '<option value="'+filtro1[3]+'">'+filtro1[3]+'</option>',
                            '<option value="'+filtro1[4]+'">'+filtro1[4]+'</option>',
                          );

  $('#selectTipo').append('<option value="'+filtro2[0]+'">'+filtro2[0]+'</option>',
                         '<option value="'+filtro2[1]+'">'+filtro2[1]+'</option>',
                         '<option value="'+filtro2[2]+'">'+filtro2[2]+'</option>',
                       );

  $("select").material_select('update');
}

//enviar datos de filtrado
function envio_de_datos(){
  var ciudad = $('#selectCiudad').val();
  var tipo = $('#selectTipo').val();
  var rango = $('#rangoPrecio').val();
  var filtro= 'ciudad='+ciudad +'&tipo='+tipo+'&precio='+rango;
  $.ajax({
      type: "post",
      url: "./php/buscador.php",
      data: filtro,
      dataType: "json",
      success:  function (response) {
        if(response!=""){
          $(".colContenido").html(response);
        }else {
          $(".colContenido").html('<div class="tituloContenido card"><h5>No se encuentran resultados de la búsqueda!</h5><div class="divider"></div><button type="button" name="todos" class="btn-flat waves-effect" id="mostrarTodos">Mostrar Todos</button></div>');
        }
      }
    });
  return false;
}

$(function(){
  datos();
  $('#mostrarTodos').click(mostrarTodos);
})
