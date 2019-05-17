var url_string = window.location.href;
var url = new URL(url_string);
var pais = url.searchParams.get("pais");
var categoria = url.searchParams.get("categoria");
var filas = url.searchParams.get("filas");
var columnas = url.searchParams.get("columnas");


const app = document.getElementById('root');
const logo = document.createElement('img');

logo.src = './images/logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var body = document.getElementsByTagName("body")[0];

// Crea un elemento <table> y un elemento <tbody>
var tabla = document.createElement("table");
var tblBody = document.createElement("tbody");

var request = new XMLHttpRequest();
request.open('GET', 'https://api.mercadolibre.com/trends/' + pais + '/' + categoria, true);

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        // Crea las celdas
        var k = 0;
        for (var i = 0; i < filas; i++) {
            // Crea las hileras de la tabla
            var fila = document.createElement("tr");

            for (var j = 0; j < columnas; j++) {

                const card = document.createElement('div');
                card.setAttribute('class', 'card');
                const h1 = document.createElement('h1');
                h1.textContent = data[k].keyword;
                const p = document.createElement('p');
                p.textContent = data[k].url;
                container.appendChild(card);
                card.appendChild(h1);
                card.appendChild(p);
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
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "No funciona!";
        app.appendChild(errorMessage);
    }
}
request.send();




