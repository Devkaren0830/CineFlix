import { registros, obtener_peliculas, obtener_trailer } from './api.js'

export class construirRegistros {
    carta;
    async construirCarts() {
        // limpiar carta
        document.querySelector('#loader-backdrop').style.display = 'flex';
        await obtener_peliculas();
        document.querySelector('#loader-backdrop').style.display = 'none';
        this.carta = document.querySelector('#general').innerHTML;
        document.querySelector('#general').innerHTML = '';
        console.log(this.carta);

    }

    obtener_registros() {
        const intervaloID = setInterval(() => {
            if (!registros.cargando) {
                clearInterval(intervaloID); // Detiene el setInterval
                this.carts(registros.datos);
                console.log("setInterval se ha detenido.");
            }
        }, 2000);
    }

    detenerInterval(interval) {
        clearInterval(interval)
    }

    carts(registros_2, click = false) {
        delete registros.buscados;
        let html = '';
        click ?
            document.querySelector('#loader-backdrop').style.display = 'block'
            : '';
        registros_2.forEach((element, pos) => {
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
                replaceAll('{idx}', element.idx);
        });
        document.querySelector('#general').innerHTML = html;
        setTimeout(() => {
            document.querySelector('#loader-backdrop').style.display = 'none';
        }, 1000);
    }

    async consultar_trailer(element) {
        console.log(element);
        let pos = element.closest('.movie-card').
            getAttribute('idx'); // ¡Así es correcto!
        console.log(pos);
        let id = registros.datos[pos].id;
        console.log(registros.datos[pos]);
        console.log(id, ' ID');
        let r = await obtener_trailer(id);
        console.log('Trailer ', r);
        document.querySelector('.modal').style.display = 'block';
        document.querySelector('iframe').src = 'https://www.youtube.com/embed/' + r.results[0].key;
    }

    cerrar_modal() {
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('iframe').src = '';
    }

    buscar_peliculas_series(tipo) {
        document.querySelector('#loader-backdrop').style.display = 'flex';
        let array = [];
        let type = tipo == 1 ? 'movie' : 'tv';
        registros.datos.forEach(element => {
            if (element.media_type == type) {
                array.push(element);
            }
        });
        registros.buscados = array;
        this.carts(array);
        setTimeout(() => {
            document.querySelector('#loader-backdrop').style.display = 'none';
        }, 1000);
    }

    buscador(buscar) {
        buscar = buscar.value;
        let array = [];
        let r = registros.datos;
        if (registros.buscados) {
            r = registros.buscados;
        }
        r.forEach(element => {
            let string = JSON.stringify(element);
            if (string.toLowerCase().includes(buscar.toLowerCase())) {
                array.push(element);
            }
        });
        this.carts(array);
    }
}