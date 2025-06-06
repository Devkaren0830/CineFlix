const API_KEY = 'ebe8a7dd9de9ff2deeefda7565d16289'; // Tu clave API
const BASE_URL = 'https://api.themoviedb.org/3';
export let registros = {
    cargando: true,
    datos: {}
}

/**
 * Función para obtener datos de TMDb de forma genérica.
 * @param {string} endpoint - El endpoint de la API (ej. 'movie/popular', 'tv/top_rated', 'search/movie').
 * @param {object} params - Un objeto con parámetros adicionales para la URL (ej. { page: 2, query: 'Matrix' }).
 * @returns {Promise<object>} Una promesa que se resuelve con los datos JSON o se rechaza con un error.
 */
async function fetchDataFromTMDb(endpoint, params = {}) {
    const urlParams = new URLSearchParams({ // Facilita la construcción de parámetros de URL
        api_key: API_KEY,
        language: 'es-ES',
        ...params // Combina los parámetros pasados con los predeterminados
    });

    const url = `${BASE_URL}/${endpoint}?${urlParams.toString()}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    let res = await fetch(url, options)
    let data = [];
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}, Details: ${res}`);
    }
    console.log(res);

    data = await res.json();

    return data;
}

// --- Ejemplos de uso ---

async function getAllPopularMovies(maxPages = 500) {
    let allMovies = [];
    let currentPage = 1;
    let totalPages = 1; // Inicializar para entrar al bucle

    while (currentPage <= totalPages && currentPage <= maxPages) {
        try {
            const data = await fetchDataFromTMDb('trending/all/day', { page: currentPage });
            console.log(data, ' DATA');

            allMovies = allMovies.concat(data.results);
            totalPages = data.total_pages; // Actualizar el total de páginas
            console.log(`Obtenida página ${currentPage} de ${Math.min(totalPages, maxPages)}`);
            currentPage++;
            // Opcional: Pausa pequeña para no exceder el rate limit
            await new Promise(resolve => setTimeout(resolve, 100)); // Esperar 100ms
        } catch (error) {
            console.error(`Error al obtener la página ${currentPage}:`, error.message);
            break;
        }
    }
    return allMovies;
}

// Usar la función
export async function obtener_peliculas() {
    let movies = await getAllPopularMovies(10) // Puedes especificar cuántas páginas quieres, hasta 500
    console.log(movies);
    registros.cargando = false;
    registros.datos = movies;
}

export async function obtener_trailer(id) {
    let respuesta = await fetchDataFromTMDb(`movie/${id}/videos`);
    console.log(respuesta, ' TRAILER');
}
