var sitio=document.getElementById("sitio");
var categoria=document.getElementById("categoria");
var data;
var siteId;

const app = document.getElementById('root');
const logo = document.createElement('img');

logo.src = './images/logo.png';

app.appendChild(logo);
//-------------------------Carga inicial de sitios en el selector----------------------
var request = new XMLHttpRequest();
request.open('GET', "https://api.mercadolibre.com/sites", true);
request.onload = function () {
    // Begin accessing JSON data here
    data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        var i=0;
        data.forEach(site => {
            var opcion=document.createElement("option");
            opcion.value=site.id;
            opcion.innerHTML=site.name;
            i++;
            sitio.appendChild(opcion);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "No funciona!";
        document.getElementsByTagName("body").appendChild(errorMessage);
    }
}
request.send();
//----------------------------Carga de categorias segun el sitio elegido----------------
function getCategories() {
    data.forEach(sites => {
        if (sitio.options[sitio.selectedIndex].innerHTML == sites.name){
            siteId = sites.id;
        }
    })
    var request = new XMLHttpRequest();
    request.open('GET', "https://api.mercadolibre.com/sites/" + siteId + "/categories", true);
    request.onload = function () {
        // Begin accessing JSON data here
        data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            var i = 0;
            data.forEach(category => {
                var opcion = document.createElement("option");
                opcion.value = category.id;
                opcion.innerHTML = category.name;
                i++;
                categoria.appendChild(opcion);
            });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "No funciona!";
            document.getElementsByTagName("body").appendChild(errorMessage);
        }
    }
    request.send();
}