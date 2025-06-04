import { registros, obtener_peliculas } from './api.js'

export class construirRegistros {
    carta;
    construirCarts() {
        // limpiar carta
        obtener_peliculas();
        this.carta = document.querySelector('#general').innerHTML;
        document.querySelector('#general').innerHTML = '';
        console.log(this.carta);

    }

    obtener_registros() {
        const intervaloID = setInterval(() => {
            if (!registros.cargando) {
                clearInterval(intervaloID); // Detiene el setInterval
                this.carts();
                console.log("setInterval se ha detenido.");
            }
        }, 2000);
    }

    detenerInterval(interval) {
        clearInterval(interval)
    }

    carts() {
        let html = '';
        registros.datos.forEach((element, pos) => {
            const baseImageUrl = "https://image.tmdb.org/t/p/";
            const tamaño = "w300"; // o el que prefieras
            const posterPath = element.poster_path; // lo que recibes en la API

            const urlCompleta = baseImageUrl + tamaño + posterPath;
            // https://image.tmdb.org/t/p/w300/gL6puhup6PXqrKqItWbGA8LF529.jpg
            let html_1 = this.carta


            html += html_1.replaceAll('{img}', urlCompleta).
                replaceAll('{Nombre}', element.original_title ?
                    element.original_title :
                    element.original_name).
                replaceAll('{idx}', pos);
        });
        document.querySelector('#general').innerHTML = html;
    }

    consultar_traile(element) {

    }
}