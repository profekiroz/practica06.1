// JavaScript Document

$(document).ready(function(e){
	document.addEventListener("deviceready",function(){
		
		
var db = openDatabase("Test", "1.0","Test",65535);



	$('#Crear').bind("click",function(event){
		
		db.transaction(function(ejecutar){
			var SQL="CREATE TABLE Clientes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(64) NOT NULL, apellido VARCHAR(100))";
	
			ejecutar.executeSql(SQL, undefined, function(){
				
		alert("Tabla creada");
				
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
			
		//Insertar cliente
			
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
	
	//Listado
	
$("#listar").bind ("click", function (event)
{
  db.transaction (function (ejecutar) 
  {
    var sql = "SELECT * FROM Clientes";

    ejecutar.executeSql (sql, undefined, function (ejecutar, resultado)
    {
      var a_html = "<ul>";
      if (resultado.rows.length)
      {
        for (var i = 0; i < resultado.rows.length; i++) 
        {
          var fila = resultado.rows.item(i);
          var v_nombre = fila.nombre;
          var v_apellido = fila.apellido;
		  var v_id = fila.id;
          a_html += "<li data-icon=false id=" + v_id + " >";						
		  a_html += v_nombre + "&nbsp;" + v_apellido;
		  a_html += "<\a>";
		  a_html +="<\li>";
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
        var $ul = $contenido.find ("ul");
        $ul.listview ();
		
		$("li").bind ("swiperight", function (event)
        {
          var id_borrar = $(this).attr ("id");
          if (!id_borrar) return;
          
          $(this).remove ();
          
          db.transaction (function (ejecutar) 
          {
            var SQL = "DELETE FROM Clientes WHERE id=?";
            ejecutar.executeSql (SQL, [id_borrar], function ()
            { 
              alert ("Cliente Borrado");
            }, error);//ejecutar
          });// transaction
        });// swipe right
		
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