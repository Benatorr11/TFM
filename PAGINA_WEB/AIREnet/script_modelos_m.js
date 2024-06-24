// Mapeo de modelos a sus imágenes correspondientes
const modeloImagenes = {
    KNN: './ficheros/imagenes/modelos_mejoraddos/knn_m_res.PNG',
    SVM: './ficheros/imagenes/modelos_mejoraddos/',
    XGBoost: './ficheros/imagenes/modelos_mejoraddos/',
    AdaBoost: './ficheros/imagenes/modelos_mejoraddos/ada_mej.PNG',
    LSTM: './ficheros/imagenes/modelos_mejoraddos/lstm.webp'
};

function mostrarResultados(modelo) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar los resultados anteriores

    if (modelo === 'todos') {
        ['KNN - mejorado', 'SVM - mejorado', 'XGBoost - mejorado', 'AdaBoost - mejorado', 'LSTM - mejorado'].forEach(m => appendModelo(resultadosDiv, m));
    } else {
        appendModelo(resultadosDiv, modelo);
    }
}

function appendModelo(container, modelo) {
    const modeloDiv = document.createElement('div');
    modeloDiv.className = 'modelo-container';
    // Definir rutas de imágenes específicas para cada modelo
    const imagenUrl = `./ficheros/imagenes/${modelo.toLowerCase()}.webp`;
    modeloDiv.innerHTML = `
        <h3>${modelo}</h3>
        <div class="modelo-img" style="background-image: url('${imagenUrl}');"></div>
    `;
    container.appendChild(modeloDiv);
}
