import { construirRegistros } from "./carts.js";
import { registros } from "./api.js";

let construir = new construirRegistros();
construir.construirCarts();
construir.obtener_registros();
