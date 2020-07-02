

function muestra_imagen(archivo,ancho,alto){
	xWidth ('ampliacion',ancho + 6)
	xHeight ('ampliacion',alto + 6 + 20)
	xWidth ('c1',ancho)
	xHeight ('c1',alto)
	xWidth ('cerrarampliacion',ancho)
	
	
	xInnerHtml('c1','<img src="' + archivo + '" width="' + ancho + '" height="' + alto + '" border="0">')	
	xShow('ampliacion');
}

function cerrar_ampliacion(){
	xHide('ampliacion');
	
}

window.onload = function(){
}