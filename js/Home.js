import { construirRegistros } from "./carts.js";
import { registros } from "./api.js";

let construir = new construirRegistros();
construir.construirCarts();
construir.obtener_registros();
// Para hacerlo global y accesible desde onclick, lo asignas al objeto window
window.construir = construir;
window.registros = registros;