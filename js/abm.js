var logueado = 0;

//Registro de usuario en localStorage

$(document).ready(function(){


function SiCargo(){
    if(logueado == 1){
      $("#DivInicioSesion").hide();
      $("#divabm").fadeIn(1000);
    }
    else {
      $("#divabm").hide();
      $("#DivInicioSesion").fadeIn();
    }
}
$(window).on("load", SiCargo);

function habilitar(){
   $("#menu-toggle").attr('href','../index/ptllPrincipal.html'); 
}

$("#btnRegistrarse").click(function(){
      var nom = $("#txtNombre").val();
      var user = $("#txtUsuario").val();
      var con = $("#txtContraseña").val();
      if((nom == "") || ( user == "") || ( con == "" )){
          $("#lblmsjRegistroo").text("Complete todos los campos");
          $("#lblmsjRegistroo").show();
          setTimeout(showTooltip, 1000);
      }
      else{
      if(localStorage.length == 0){
        var usuario = usuarios(user,nom,con);
        localStorage.setItem(usuario.usuario,JSON.stringify(usuario));
        $("#lblmsjRegistroo").text("Bienvenido/a  " + usuario.usuario);
        $("#lblmsjRegistroo").show();
        setTimeout(showTooltip, 1000);
        Limpiarcampos();
      }
      else {
        for(var i=0; i < localStorage.length ; i ++){
            if(localStorage.key(i) == user){
                $("#lblmsjRegistroo").text("Este usuario ya existe");
                $("#lblmsjRegistroo").show();
                setTimeout(showTooltip, 1000);
                Limpiarcampos();
                return;
            }
            else{
            var usuario = usuarios(user,nom,con);

            localStorage.setItem(usuario.usuario,JSON.stringify(usuario));

            $("#lblmsjRegistroo").text("Bienvenido/a  " + usuario.usuario);
            $("#lblmsjRegistroo").show();
            setTimeout(showTooltip, 1000);
            $("#menu-toggle").attr("disabled", false);
            Limpiarcampos();
            return;
            }
        }
        }
      }
});
function usuarios(user,nom,con)
  {
      return{
          usuario : user,
          nombre : nom,
          contraseña : con
        }
}

//Muestra y oculta alertas (De la pantalla de registro de usuario)
function showTooltip()
  {
       $("#lblmsjRegistroo").show("slow");
       setTimeout(hideTooltip, 3000);
}
function hideTooltip()
  {
   $("#lblmsjRegistroo").hide("slow");
}

//Funcionalidad de Inicio de sesión
$("#btnIngresar").click(function(){
        var user =  $("#user").val();
        var con = $("#pas").val();
        var userguardado = JSON.parse(localStorage.getItem(user));
        if(localStorage.length > 0){
        if ((user == "") || (con == "")){
            $("#lblmsjlogin").text("complete todos los campos");
            $("#lblmsjlogin").show();
            setTimeout(showTooltipa, 1000);
        }
        else if ((userguardado.usuario == user) && (userguardado.contraseña == con)){
            habilitar();
            SiCargo();
            logueado = 1;
        }
        else {
            Limpiarcampos();
            $("#lblmsjlogin").text("Usuario o contraseña incorrecto");
            $("#lblmsjlogin").show();
            setTimeout(showTooltipa, 1000);
        }
      }else
      {

        $("#lblmsjlogin").text("Aun no existen usuario registrados!");
            $("#lblmsjlogin").show();
            setTimeout(showTooltipa, 1000);
            Limpiarcampos();
      }
});

//Muestra y oculta alertas del inicio de sesion!
function showTooltipa()
{
     $("#lblmsjlogin").show("slow");
     setTimeout(hideTooltipa, 3000);
}
function hideTooltipa()
{
 $("#lblmsjlogin").hide("slow");
}

//Funcionalidad de Modificación y eliminación de usuarios

//Busco usuario guardado en local Storage
$("#btnBuscarU").click(function(){

    var usuario = $("#mostraru").val();
    var userguardado = JSON.parse(localStorage.getItem(usuario));

    if (userguardado != null){
        $("#mostrarn").val( userguardado.nombre);
        $("#mostrarc").val( userguardado.contraseña);
        $("#btnBaja").attr("disabled", false);
        $("#btnModificar").attr("disabled", false);
    }
    else {
        LimpiarCamposABM();
        $("#lblmsjabm").text("usuario Buscado no existe!");
        $("#lblmsjabm").show();
        setTimeout(showTooltipp, 1000);
    }
});
//Elminio usuario guardado en local Storage
$("#btnBaja").click(function(){
    var usuario = $("#mostraru").val();
        localStorage.removeItem(usuario);
        $("#lblmsjabm").text("Usuario eliminado con éxito!");
        $("#lblmsjabm").show();
        setTimeout(showTooltipp, 1000);
        LimpiarCamposABM();
});

//Modifico usuario creado
  $("#btnModificar").click(function(){
    var userb = $("#mostraru").val();
    var userguardado = JSON.parse(localStorage.getItem(userb));
    if(userguardado.usuario == userb){
        var user = userb;
        var nom = $("#mostrarn").val();
        var con = $("#mostrarc").val();
        localStorage.removeItem(userguardado);
        var usuario = usuarios(user,nom,con);

        localStorage.setItem(usuario.usuario,JSON.stringify(usuario));

        $("#lblmsjabm").text( usuario.usuario + " Modificado con éxito");
        $("#lblmsjabm").show();
        setTimeout(showTooltipp, 1000);
        LimpiarCamposABM();
    }
  });
});

//Muestra y oculta alertas de abm y inicio de sesion!
function showTooltipp()
{
  $("#lblmsjabm").show("slow");
  setTimeout(hideTooltipp, 3000);
}
function hideTooltipp()
{
  $("#lblmsjabm").hide("slow");
}

//Borrar todos los campos..
function LimpiarCamposABM(){
    $("#mostraru").val("");
    $("#mostrarn").val("");
    $("#mostrarc").val("");
}
function Limpiarcampos(){
    $("#txtNombre").val("");
    $("#txtUsuario").val("");
    $("#txtContraseña").val("");
    $("#user").val("");
    $("#pas").val("");
}
