// JavaScript Document

$(document).ready(function(e){
	document.addEventListener("deviceready",function(){
		
		
var db=OpendataBase("Test", "1.0","Test",65535);

	$('#Crear').bind("Click",function(event){
		db.transaction(function(ejecutar){
			var SQL="CREATE TABLE Clientes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(64) NOT NULL, apellido VARCHAR(100))"
	
			ejecutar.executeSql(SQL, undefined, function(){
				alert("Tabla Creada");
			},error);
			});//ejecutar
			});//crear
	
	$('#Eliminar').bind("Click",function(event){
		if (!confirm("Borrar tabla?",""))
		return;
		db.transaction(function(ejecutar){
			var SQL = "DROP TABLE Clientes";
			ejecutar.executeSql(SQL, undefined, function(){
				alert("Tabla borrada");
			},error);
			});//ejecutar		
			});
	
	function error (transaction, err) 
{
  alert ("Error de Base de Datos : " + err.message);
  return false;
}
	
	},false);//ready

});//document