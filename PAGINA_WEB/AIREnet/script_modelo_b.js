function mostrarResultados(modelo) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar los resultados anteriores

    if (modelo === 'todos') {
        ['KNN', 'SVM', 'XGBoost', 'AdaBoost', 'LSTM'].forEach(m => appendModelo(resultadosDiv, m));
    } else {
        appendModelo(resultadosDiv, modelo);
    }
}

function appendModelo(container, modelo) {
    const modeloDiv = document.createElement('div');
    modeloDiv.className = 'modelo-container';
    modeloDiv.innerHTML = `
        <h3>${modelo}</h3>
        <div class="modelo-img" style="background-image: url('./ficheros/imagenes/icono.png');"></div>
    `;
    container.appendChild(modeloDiv);
}
