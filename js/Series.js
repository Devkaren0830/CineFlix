// import { buscarElemento } from "../Busquedas.js";
import { seriesInfo } from "./InfoSeries.js";
const series = document.getElementById('series');

const crearSeries = (serieData) => {
    const divGeneral = document.createElement('div');
    divGeneral.id = 'divGeneral';

    const button = document.createElement('button');
    button.id = 'button';

    const buttonLook = document.createElement('button')
    buttonLook.id = 'buttonLook'
    const h4Look = document.createElement('h4');
    h4Look.id = 'h4Look';
    h4Look.textContent = "Ver trailer"
    buttonLook.appendChild(h4Look)

    const div = document.createElement('div');
    div.id = 'div';

    const img = document.createElement('img');
    img.id = 'img2';
    img.src = serieData.imagen; // Concatenar el 'poster_path' con la base URL de las imágenes

    const h1 = document.createElement('h4');
    h1.id = 'h4';
    h1.textContent = serieData.titulo; // Asigna el nombre de la serie desde los datos obtenidos de la API

    const descripcion = document.createElement('p');
    descripcion.id = 'description';
    descripcion.textContent = serieData.descripcion; // Asigna la descripción de la serie desde los datos obtenidos de la API

    const leermas = document.createElement('button');
    leermas.id = 'leermas';
    leermas.textContent = 'Leer Más';

    const div2 = document.createElement('div');
    div2.id = 'div2';

    div2.appendChild(descripcion);
    div2.appendChild(leermas);

    div.appendChild(h1);
    div.appendChild(div2);

    divGeneral.appendChild(img);
    divGeneral.appendChild(div);
    divGeneral.appendChild(buttonLook)

    button.appendChild(divGeneral);

    series.appendChild(button);
    let key = serieData.trailer;
    let array = [div, divGeneral, img, h1, descripcion, series, leermas, div2, buttonLook, key];
    return array
};

let matriz2 = [];
let i = 0;
seriesInfo.forEach(element => {
    let array = crearSeries(element);
    console.log(array[9]);
    matriz2.push(array)
    i++;
})

btnLookT()
leerMasyMenos2();
// buscarElemento();

console.log(matriz2);
function leerMasyMenos2() {
    matriz2
        .forEach(elemento => {
            elemento[6].addEventListener('click', () => {
                console.log(elemento[6].textContent);
                if (elemento[6].textContent == 'Leer Más') {
                    elemento[7].style = 'flex-direction: column;'
                    elemento[4].style = 'overflow: visible; width: 100%; white-space: wrap; '; // Cambia el overflow para que se muestre todo el texto
                    elemento[6].textContent = 'Leer Menos'
                    elemento[6].style = 'display: block; text-align: start;'; // Oculta el botón "Leer más" después de expandir el texto
                } else if (elemento[6].textContent == "Leer Menos") {
                    elemento[4].style = 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'
                    elemento[7].style = 'flex-direction: wrap;'
                    elemento[6].textContent = 'Leer Más'
                }
            });
        })
}

// button look
export function btnLookT() {
    matriz2.forEach(elemento => {
        elemento[8].addEventListener('click', () => {
            openModal(elemento[9]);
        });
    });
}

function openModal(videoId) {
    const modal = createModal(videoId);
    document.body.appendChild(modal);
}

function createModal(videoId) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', closeModal);

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('frameborder', 0);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);
    modal.appendChild(modalContent);

    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// trailer
const cardTrailer = () => {
    const divGeneral = document.createElement('div');
    divGeneral.id = 'divGeneralTrailer';

    const div = document.createElement('div');
    div.id = 'divDescriptionTrailerPeli';

    const button = document.createElement('button')
    button.id = 'buttonTrailer'
    button.textContent = "X"

    const iframe = document.createElement('iframe');
    iframe.id = "iframeP";
    iframe.src = `https://www.youtube.com/embed/iFl1cFggFb8`

    const div2 = document.createElement('div');
    div2.id = 'divTrailer';

    const descripcion = document.createElement('p');
    descripcion.id = 'description';

    div.appendChild(button)
    div.appendChild(iframe)

    div2.appendChild(descripcion);

    divGeneral.appendChild(div)
    divGeneral.appendChild(div2);
    const main = document.querySelector('main')
    main.appendChild(divGeneral);
    return divGeneral;
}
// Trailer
cardTrailer();