import { peliculas } from "./InfoPelis.js";

function category() {
    let elements = document.querySelectorAll('.aCategory[category="todo"]');
    elements.forEach(function (element) {
        element.classList.add('ct_item-active');
    });

    let categoryItems = document.querySelectorAll('.aCategory');

    categoryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            categoryItems.forEach(function (otherItem) {
                otherItem.classList.remove('ct_item-active');
            });
            item.classList.add('ct_item-active');
            genero(item);
        });
    });
}

function genero(term) {
    let elementosEncontrados = [];
    let elementosnoEncontrados = []
    peliculas.forEach(element => {
        let cont = 0;
        let generoPelis = element.genero;
        generoPelis.forEach(gen => {
            if (gen == term.textContent) {
                console.log(element.titulo);
                elementosEncontrados.push(element.titulo)
                cont++;
            }
        })
        if (cont == 0) {
            elementosnoEncontrados.push(element.titulo)
        }
    })


    elementosEncontrados.forEach(ele =>{
        filtrarPeliculas(ele)
    })

    elementosnoEncontrados.forEach(ele =>{
        nofiltrarPeliculas(ele)
    })

    console.log(elementosEncontrados);
    console.log(elementosnoEncontrados);
}

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
            }
        }
    }
};

const nofiltrarPeliculas = (term) => {
    const section = document.getElementById('general');
    const peliculas = section.getElementsByTagName('div');
    const button = document.getElementById('button')
    console.log(button);
    for (const pelicula of peliculas) {

        if (pelicula.querySelector('h4')) {
            const titulo = pelicula.querySelector('h4').textContent.toLowerCase();
            if (titulo.includes(term.toLowerCase())) {
                pelicula.style.display = 'none';
            }
        }
    }
};

category()