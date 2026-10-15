export const CONTRAST_KEY = "ds-contrast";

/** Script inline para o <head>: aplica o contraste salvo antes da pintura (sem flash). */
export const contrastScript = `try{if(localStorage.getItem("${CONTRAST_KEY}")==="high")document.documentElement.dataset.contrast="high"}catch(e){}`;
