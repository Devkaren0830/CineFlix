import { buscarElemento } from "./Busquedas.js";
import { peliculas } from "./InfoPelis.js";
// importar elementos que complementan
// JavaScript
// seccion de peliculas
const section = document.getElementById('peliculas');
const crear = () => {
    const divGeneral = document.createElement('div');
    divGeneral.id = 'divGeneral';

    const button = document.createElement('button')
    button.id = 'button'

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

    const h1 = document.createElement('h4');
    h1.id = 'h4';

    const descripcion = document.createElement('p');
    descripcion.id = 'description';

    const leermas = document.createElement('button')
    leermas.id = 'leermas';
    leermas.textContent = 'Leer Más';

    const div2 = document.createElement('div')
    div2.id = 'div2'

    div2.appendChild(descripcion);
    div2.appendChild(leermas)

    div.appendChild(h1);
    div.appendChild(div2);

    divGeneral.appendChild(img)
    divGeneral.appendChild(div);
    divGeneral.appendChild(buttonLook)

    button.appendChild(divGeneral)

    section.appendChild(button)

    let key = 0;
    let array = [div, divGeneral, img, h1, descripcion, section, leermas, div2, buttonLook, key];
    return array
}

let matriz = [];
let i = 0;
peliculas.forEach(element => {
    let array = crear();
    array[2].src = element.imagen;
    array[3].textContent = element.titulo;
    array[4].textContent = element.descripcion;
    array[9] = element.trailer;
    console.log(array[9]);
    matriz.push(array)
    i++;
})

leerMasyMenos()
btnLookT();
buscarElemento();
function leerMasyMenos() {
    matriz.forEach(elemento => {
        elemento[6].addEventListener('click', () => {
            if (elemento[6].textContent == 'Leer Más') {
                elemento[7].style = 'flex-direction: column;'
                elemento[4].style = 'overflow: visible; width: 100%; white-space: wrap; '; // Cambia el overflow para que se muestre todo el texto
                elemento[6].textContent = 'Leer Menos'
                elemento[6].style = 'display: block; text-align: start;'; // Oculta el botón "Leer más" después de expandir el texto
            } else {
                elemento[4].style = 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'
                elemento[7].style = 'flex-direction: wrap;'
                elemento[6].textContent = 'Leer Más'
            }
        });
    })
}

// button look
export function btnLookT() {
    matriz.forEach(elemento => {
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

// trabajo hecho por Daniela osorio Alejandro osorio y karen López