function toggleTema() {
    document.body.classList.toggle("tema-oscuro");
    // Otras acciones para cambiar el tema, como ajustar imágenes de fondo si es necesario
}

/* INICIO - cambio de tema */
const temaToggle = document.getElementById('tema-toggle');
const temaOpciones = document.getElementById('tema-opciones');
let temaOscuro = false;

function toggleModo() {
    temaOpciones.style.display = temaOpciones.style.display === 'block' ? 'none' : 'block';
}

function activarModoOscuro() {
    document.body.classList.add('modo-oscuro');
    cambiarImagenFondo(true);
    temaOpciones.style.display = 'none';
}

function activarModoClaro() {
    document.body.classList.remove('modo-oscuro');
    cambiarImagenFondo(false);
    temaOpciones.style.display = 'none';
}

temaToggle.addEventListener('click', temaToggle);
/* FIN - Cambio de tema */

let intervalId = null;

function cambiarImagenFondo(oscuro) {
    // Definir los paths de las imágenes para ambos modos
    const imagenesClaras = [
        './ficheros/imagenes/icon_fondo_bueno_1.webp',
        './ficheros/imagenes/icon_fondo_bueno_2.webp',
        './ficheros/imagenes/icon_fondo_bueno_3.webp'
    ];
    const imagenesOscuras = [
        './ficheros/imagenes/icon_fondo_malo_1.webp',
        './ficheros/imagenes/icon_fondo_malo_2.webp',
        './ficheros/imagenes/icon_fondo_malo_3.webp'
    ];

    // Seleccionar el arreglo de imágenes según el modo
    let imagenes = oscuro ? imagenesOscuras : imagenesClaras;
    let index = 0;

    // Limpiar el intervalo existente para evitar múltiples ciclos corriendo simultáneamente
    if (intervalId !== null) {
        clearInterval(intervalId);
    }

    // Establecer el intervalo para cambiar imágenes cada 5 segundos
    intervalId = setInterval(() => {
        document.body.style.backgroundImage = `url('${imagenes[index]}')`;
        index = (index + 1) % imagenes.length;
    }, 2000);
}

function activarModoOscuro() {
    document.body.classList.add('modo-oscuro');
    cambiarImagenFondo(true); // Activar rotación de imágenes en modo oscuro
    temaOpciones.style.display = 'none';
}

function activarModoClaro() {
    document.body.classList.remove('modo-oscuro');
    cambiarImagenFondo(false); // Detener la rotación de imágenes específicas del modo oscuro
    temaOpciones.style.display = 'none';
}

// Mapeo de modelos a sus imágenes correspondientes
const modeloImagenes = {
    KNN: {
        resultado: './ficheros/imagenes/modelos_basicos/knn_b_resultado.PNG',
        pred: './ficheros/imagenes/modelos_basicos/knn_b_pred.PNG'
    },
    SVM: {
        resultado: './ficheros/imagenes/modelos_basicos/svm_b_prec.PNG',
        pred: './ficheros/imagenes/modelos_basicos/knn_b_pred.PNG'
    },
    XGBoost: {
        resultado: './ficheros/imagenes/modelos_basicos/xgb_b_resultado.PNG',
        pred: './ficheros/imagenes/modelos_basicos/knn_b_pred.PNG'
    },
    AdaBoost: {
        resultado: './ficheros/imagenes/modelos_basicos/ADABoost.PNG',
        pred: './ficheros/imagenes/modelos_basicos/knn_b_pred.PNG'
    },
    LSTM: {
        resultado: './ficheros/imagenes/modelos_basicos/lstm_b_pred.PNG',
        pred: './ficheros/imagenes/modelos_basicos/knn_b_pred.PNG'
    }
};

function mostrarResultados(modelo) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar los resultados anteriores

    if (modelo === 'todos') {
        Object.keys(modeloImagenes).forEach(m => appendModelo(resultadosDiv, m));
    } else if (modeloImagenes[modelo]) {
        appendModelo(resultadosDiv, modelo);
    }
}

function appendModelo(container, modelo) {
    const modeloDiv = document.createElement('div');
    modeloDiv.className = 'modelo-container';
    const imagenes = modeloImagenes[modelo];
    modeloDiv.innerHTML = `
        <h3>${modelo}</h3>
        <img src="${imagenes.resultado}" alt="Resultado ${modelo}" style="max-width: 100%; height: auto;">
        <img src="${imagenes.pred}" alt="Predicción ${modelo}" style="max-width: 100%; height: auto;">
    `;
    container.appendChild(modeloDiv);
}
