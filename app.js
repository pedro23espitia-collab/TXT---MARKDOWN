(() => {
  const inputArchivo = document.getElementById('inputArchivo');
  const dropzone = document.getElementById('dropzone');
  const nombreArchivo = document.getElementById('nombreArchivo');
  const entradaTexto = document.getElementById('entradaTexto');
  const salidaMarkdown = document.getElementById('salidaMarkdown');
  const btnCopiar = document.getElementById('btnCopiar');
  const btnDescargar = document.getElementById('btnDescargar');
  const btnLimpiar = document.getElementById('btnLimpiar');
  const metricCaracteres = document.getElementById('metricCaracteres');
  const metricLineas = document.getElementById('metricLineas');
  const estado = document.getElementById('estado');
  const detalleDiferencias = document.getElementById('detalleDiferencias');
  const mensaje = document.getElementById('mensaje');

  let nombreBase = 'archivo';

  function contarLineas(texto) {
    return texto.split('\n').length;
  }

  function actualizarSalidaDesdeEntrada() {
    const entrada = entradaTexto.value;
    salidaMarkdown.value = entrada;
    actualizarVerificacion();
  }

  function actualizarVerificacion() {
    const entrada = entradaTexto.value;
    const salida = salidaMarkdown.value;

    const charsEntrada = entrada.length;
    const charsSalida = salida.length;
    const lineasEntrada = contarLineas(entrada);
    const lineasSalida = contarLineas(salida);

    metricCaracteres.textContent = `${charsEntrada} vs ${charsSalida}`;
    metricLineas.textContent = `${lineasEntrada} vs ${lineasSalida}`;

    const esIdentico = entrada === salida;

    if (esIdentico) {
      estado.textContent = '✅ IDÉNTICO';
      detalleDiferencias.textContent = 'Sin diferencias detectadas.';
      return;
    }

    estado.textContent = '❌ DIFERENTE';
    const fallas = [];
    if (charsEntrada !== charsSalida) fallas.push('caracteres');
    if (lineasEntrada !== lineasSalida) fallas.push('líneas');
    if (fallas.length === 0) fallas.push('contenido exacto');
    detalleDiferencias.textContent = `Falla en: ${fallas.join(' y ')}.`;
  }

  function setMensaje(texto) {
    mensaje.textContent = texto;
  }

  function procesarTexto(texto, archivoNombre = null) {
    entradaTexto.value = texto;
    salidaMarkdown.value = texto;
    if (archivoNombre) {
      const sinExtension = archivoNombre.replace(/\.[^.]+$/, '');
      nombreBase = sinExtension || 'archivo';
      nombreArchivo.textContent = `Archivo cargado: ${archivoNombre}`;
    }
    actualizarVerificacion();
    setMensaje('Texto cargado sin cambios.');
  }

  function leerArchivo(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.txt')) {
      setMensaje('Error: selecciona un archivo con extensión .txt');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      procesarTexto(String(reader.result), file.name);
    };
    reader.onerror = () => {
      setMensaje('No se pudo leer el archivo.');
    };
    reader.readAsText(file, 'UTF-8');
  }

  inputArchivo.addEventListener('change', (event) => {
    const [file] = event.target.files;
    leerArchivo(file);
  });

  entradaTexto.addEventListener('input', actualizarSalidaDesdeEntrada);

  dropzone.addEventListener('click', () => inputArchivo.click());
  dropzone.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      inputArchivo.click();
    }
  });

  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('dragover');
    const [file] = event.dataTransfer.files;
    leerArchivo(file);
  });

  btnCopiar.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(salidaMarkdown.value);
      setMensaje('Markdown copiado exactamente al portapapeles.');
    } catch {
      setMensaje('No se pudo copiar (permiso de portapapeles denegado).');
    }
  });

  btnDescargar.addEventListener('click', () => {
    const contenido = salidaMarkdown.value;
    const blob = new Blob([contenido], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `${nombreBase}.md`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
    setMensaje('Archivo .md descargado con el contenido exacto.');
  });

  btnLimpiar.addEventListener('click', () => {
    inputArchivo.value = '';
    entradaTexto.value = '';
    salidaMarkdown.value = '';
    nombreArchivo.textContent = 'Ningún archivo cargado.';
    nombreBase = 'archivo';
    actualizarVerificacion();
    setMensaje('Campos limpiados.');
  });

  actualizarVerificacion();
})();
