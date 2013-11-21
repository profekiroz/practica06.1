// JavaScript Document

$(document).ready(function(e){
	document.addEventListener("deviceready",function(){
		
		
var db = openDatabase("Test", "1.0","Test",65535);

alert("Ok");

	$('#Crear').bind("click",function(event){
		alert("crear");
		db.transaction(function(ejecutar){
			var SQL="CREATE TABLE Clientes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(64) NOT NULL, apellido VARCHAR(100))";
	
			ejecutar.executeSql(SQL, undefined, function(){
				alert("Tabla Creada");
			},error);
			});//ejecutar
			});//crear
	
	$('#Eliminar').bind("click",function(event){
	alert("eliminar");
		if (!confirm("Borrar tabla?",""))
		return;
		db.transaction(function(ejecutar){
			var SQL = "DROP TABLE Clientes";
			ejecutar.executeSql(SQL, undefined, function(){
				alert("Tabla borrada");
			},error);
			});//ejecutar		
			});//clic eliminar
			
			$("#Insertar").bind ("click", function (event)
{alert("insertar");
  var v_nombre = $("#Nombre").val ();
  var v_apellido = $("#Apellido").val ();
  
  db.transaction (function (ejecutar) 
  {
    var sql = "INSERT INTO Clientes (nombre, apellido) VALUES (?, ?)";
    ejecutar.executeSql (sql, [v_nombre, v_apellido], function ()
    { 
      alert ("Cliente Agregado");
    }, error);
  });
});
	
$("#listar").bind ("click", function (event)
{
  db.transaction (function (ejecutar) 
  {
    var sql = "SELECT * FROM clientes";

    ejecutar.executeSql (sql, undefined,

    function (ejecutar, resultado)
    {
      var a_html = "<ul>";
      if (resultado.rows.length)
      {
        for (var i = 0; i < resultado.rows.length; i++) 
        {
          var fila = resultado.rows.item (i);
          var v_nombre = fila.nombre;
          var v_apellido = fila.apellido;
          a_html += "<li>" + v_nombre + "&nbsp;" + v_apellido + "</li>";
        }
      }
      else
      {
        a_html += "<li> No hay clientes </li>";
      }
      
      a_html += "</ul>";
      
      $("#listado").unbind ().bind ("pagebeforeshow", function ()
      {
        var $contenido = $("#listado div:jqmData(role=content)");
        $contenido.html (a_html);
        var $ul = $contentenido.find ("ul");
        $ul.listview ();
      });
      
      $.mobile.changePage ($("#listado"));
      
    }, error);
  });	
});	
	function error (transaction, err) 
{
  alert ("Error de Base de Datos : " + err.message);
  return false;
}
	
	},false);//ready

});//document