var url_string = window.location.href;
var url = new URL(url_string);
var sitio = url.searchParams.get("sitio");
var categoria = url.searchParams.get("categoria");
var filas = url.searchParams.get("filas");
var columnas = url.searchParams.get("columnas");
var seleccion = url.searchParams.get("seleccion");


const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var body = document.getElementsByTagName("body")[0];

// Crea un elemento <table> y un elemento <tbody>
var tabla = document.createElement("table");
var tblBody = document.createElement("tbody");

var request = new XMLHttpRequest();

if (categoria == "") {
    request.open('GET', 'https://api.mercadolibre.com/trends/' + sitio, true);
} else {
    request.open('GET', 'https://api.mercadolibre.com/trends/' + sitio + '/' + categoria, true);
}


request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        // Crea las celdas
        var k = 0;
        for (var i = 0; i < filas; i++) {
            // Crea las filas de la tabla
            var fila = document.createElement("tr");

            for (var j = 0; j < columnas; j++) {

                var celda = document.createElement('td');
                if (seleccion == "nombre") {
                    var textoCelda = document.createTextNode(data[k].keyword);
                } else {
                    var textoCelda = document.createTextNode(data[k].url);
                }

                celda.appendChild(textoCelda);
                fila.appendChild(celda);
                k++;
            }
            // agrega la fila al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(fila);
        }
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
        tabla.setAttribute("align", "center");
        tabla.setAttribute("wodth", "500");
        tabla.setAttribute("height", "500");
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "No funciona!";
        app.appendChild(errorMessage);
    }
}
request.send();




