// JavaScript Document

$(document).ready(function(e){
var db=OpendataBase("test", "1.0","test",65535);
document.addEventListener("deviceready", function(){
	$('#crear').bind("Click",function(event){
		db.transaction(function(ejecutar){
			var SQL="CREATE TABLE Clientes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(64) NOT NULL, apellido VARCHAR(100))"
	
			ejecutar.executeSQL(SQL, undefined, function(){
				navigator.notification.alert("Tabla Creada");
			},error);
		});//ejecutar
		
	});//crear
	
	$('#Eliminar').bind("Click",function(event){
		if (!Navigator.notification.confirm("Borrar tabla?",""))
		return;
		db.transaction(function(ejecutar){
			var SQL = "DROP TABLE Clientes";
			ejecutar.executeSQL(SQL, undefined, function(){
				navigator.notification.alert("Tabla borrada");
			},error);
			});//ejecutar	
	});
	},false);//ready

});//document