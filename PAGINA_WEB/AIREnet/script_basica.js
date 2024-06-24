/* Función para cambiar a la página del modo avanzado */ 
document.getElementById('avanzado').addEventListener('click', function() {
    window.location.href = './avanzada.html'; // Redirige al usuario a avanzada.html
});

/* INICIO - cambio de tema */
const temaToggle = document.getElementById('tema-toggle');
const temaOpciones = document.getElementById('tema-opciones');
let temaOscuro = false;

function toggleModo() {
    temaOpciones.style.display = temaOpciones.style.display === 'block' ? 'none' : 'block';
}

function actualizarGraficos(temaOscuro) {
    const colorTexto = temaOscuro ? '#fff' : '#000';
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.options.scales.x.ticks.color = colorTexto;
        instance.options.scales.y.ticks.color = colorTexto;
        instance.options.scales.x.title.color = colorTexto;
        instance.options.scales.y.title.color = colorTexto;
        instance.update();
    });
}

function activarModoOscuro() {
    document.body.classList.add('modo-oscuro');
    cambiarImagenFondo(true);
    actualizarGraficos(true); // Asegúrate de que esta línea esté ejecutando correctamente
    temaOpciones.style.display = 'none';
}

function activarModoClaro() {
    document.body.classList.remove('modo-oscuro');
    cambiarImagenFondo(false);
    actualizarGraficos(false); // Asegúrate de que esta línea esté ejecutando correctamente
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
    }, 3000);
}

function activarModoOscuro() {
    document.body.classList.add('modo-oscuro');
    cambiarImagenFondo(true); // Activar rotación de imágenes en modo oscuro
    actualizarGraficos(true); // Actualizar los gráficos para el tema oscuro
    temaOpciones.style.display = 'none';
}

function activarModoClaro() {
    document.body.classList.remove('modo-oscuro');
    cambiarImagenFondo(false); // Detener la rotación de imágenes específicas del modo oscuro
    actualizarGraficos(false); // Revertir los gráficos al tema claro
    temaOpciones.style.display = 'none';
}

// Función para alternar el color de los botones de modo
function toggleColor(button) {
    document.querySelectorAll('#modo button').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// Función para mostrar las estaciones según la opción seleccionada en el combobox
function showStations() {
    const combo1 = document.getElementById("combo1").value;
    const listaEstacionesDiv = document.getElementById('combo1-list');
    if (combo1 === "stations") {
        listaEstacionesDiv.style.display = 'block';
        fetch('./ficheros/datos.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                const sheetName = workbook.Sheets[workbook.SheetNames[0]];
                const parsedData = XLSX.utils.sheet_to_json(sheetName);

                listaEstacionesDiv.innerHTML = ''; // Limpiar lista existente

                // Crear una lista ul para mostrar los nombres de las estaciones
                const ul = document.createElement('ul');
                parsedData.forEach(row => {
                    // Extraer los nombres de las estaciones
                    const stationNames = row['properties.name'];
                    const stationHref = row['properties._links.self.href'];
                    
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = stationNames;
                    a.href = stationHref;
                    a.target = "_blank";
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                listaEstacionesDiv.appendChild(ul);
            });
    } else {
        listaEstacionesDiv.style.display = 'none';
    }
}

// Función para mostrar los contaminantes según la opción seleccionada en el combobox
function showPollutants() {
    const combo2 = document.getElementById("combo2").value;
    const listaParamsDiv = document.getElementById('combo2-list');
    if (combo2 === "pollutants") {
        listaParamsDiv.style.display = 'block';
        fetch('./ficheros/datos_params.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                const sheetName = workbook.Sheets[workbook.SheetNames[0]];
                const parsedData = XLSX.utils.sheet_to_json(sheetName);

                // Extraer los nombres de los contaminantes
                const paramNames = parsedData.map(row => row['name']);
                listaParamsDiv.innerHTML = ''; // Limpiar lista existente

                // Crear una lista ul para mostrar los nombres de los contaminantes
                const ul = document.createElement('ul');
                paramNames.forEach(paramName => {
                    const li = document.createElement('li');
                    li.textContent = paramName;
                    ul.appendChild(li);
                });
                listaParamsDiv.appendChild(ul);
            });
    } else {
        listaParamsDiv.style.display = 'none';
    }
}

// Función para cargar y mostrar gráficos
function loadCharts() {
    // Gráfico 1: Distribución de Estaciones por Municipio
    fetch('./ficheros/datos.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetName = workbook.Sheets[workbook.SheetNames[0]];
            const parsedData = XLSX.utils.sheet_to_json(sheetName);

            const municipalities = parsedData.map(row => row['properties.location.municipality']);
            const uniqueMunicipalities = [...new Set(municipalities)];
            const stationCounts = uniqueMunicipalities.map(municipality => municipalities.filter(m => m === municipality).length);

            const ctx1 = document.getElementById('canvas1').getContext('2d');
            new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: uniqueMunicipalities,
                    datasets: [{
                        label: 'Distribución de Estaciones por Comunidad Autónoma',
                        data: stationCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });

    // Gráfico 2: Distribución de Estaciones por Comunidad Autónoma
    fetch('./ficheros/datos.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetName = workbook.Sheets[workbook.SheetNames[0]];
            const parsedData = XLSX.utils.sheet_to_json(sheetName);

            const counties = parsedData.map(row => row['properties.location.county']);
            const uniqueCounties = [...new Set(counties)];
            const stationCounts = uniqueCounties.map(county => counties.filter(c => c === county).length);

            const ctx2 = document.getElementById('canvas2').getContext('2d');
            new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: uniqueCounties,
                    datasets: [{
                        label: 'Distribución de Estaciones por Provincias',
                        data: stationCounts,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                maxRotation: 90,
                                minRotation_: 90,
                                font: {
                                    size: 10
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
}

// Función para cargar y mostrar el mapa con marcadores
function loadMap() {
    const platform = new H.service.Platform({
        apikey: "h684CJN32gzCbKvavdp6j7d7qNN7JrcdJkU0XOpI4ZU"
    });

    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(document.getElementById('mapa'),
        defaultLayers.vector.normal.map, {
        center: { lat: 42.51824807424149, lng: -2.61947521199466 },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    window.addEventListener('resize', () => map.getViewPort().resize());

    fetch('ficheros/geodata.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetName = workbook.Sheets[workbook.SheetNames[0]];
            const parsedData = XLSX.utils.sheet_to_json(sheetName);

            parsedData.forEach(row => {
                const latitude = parseFloat(row.latitude);
                const longitude = parseFloat(row.longitude);
                const name = row['name']; // Nombre de la estación

                var icon_l = new H.map.Icon('./ficheros/imagenes/icon_localization.png', { size: { w: 80, h: 80 } });
                const marker = new H.map.Marker({ lat: latitude, lng: longitude }, { icon: icon_l });
                marker.setData(name);

                map.addObject(marker); // Añadir el marcador al mapa
            });
        });
}

// Llamar a las funciones de carga cuando se carga la página
window.onload = function () {
    loadMap();
    loadCharts();
};