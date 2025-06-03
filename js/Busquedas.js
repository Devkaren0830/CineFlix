import { peliculas } from "./InfoPelis.js";

// Función para mostrar solo los elementos que coincidan con el término de búsqueda

const filtrarPeliculas = (term) => {
    const section = document.getElementById('general');
    const peliculas = section.getElementsByTagName('div');
    console.log(peliculas);
    const button = document.getElementById('button')
    console.log(button);
    for (const pelicula of peliculas) {

        if (pelicula.querySelector('h4')) {
            const titulo = pelicula.querySelector('h4').textContent.toLowerCase();
            if (titulo.includes(term.toLowerCase())) {
                pelicula.style.display = 'flex';
            } else {
                pelicula.style.display = 'none';
            }
        }
    }
};


// Agregar el evento de escucha al campo de búsqueda
export function buscarElemento() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (event) => {
        const term = event.target.value;
        filtrarPeliculas(term);
    });
}
