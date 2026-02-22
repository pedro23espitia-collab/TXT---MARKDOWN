# TXT → MARKDOWN (sin cambios)

Aplicación web offline (HTML, CSS y JavaScript vanilla) para convertir un archivo `.txt` en `.md` **sin modificar el contenido**.

## Características

- 100% local: no sube archivos ni usa servidor.
- Entrada por archivo `.txt` (selector o drag & drop) o pegando texto.
- Salida Markdown con el texto idéntico.
- Botones de **copiar**, **descargar `.md`** y **limpiar**.
- Verificación visual de integridad:
  - caracteres entrada vs salida,
  - líneas entrada vs salida,
  - estado `✅ IDÉNTICO` o `❌ DIFERENTE`.

## Instalación y ejecución

1. Descarga o clona este repositorio.
2. Abre `index.html` directamente en tu navegador.
3. No se requieren dependencias ni instalación adicional.

## Uso

1. Carga un `.txt` o pega texto en **“O pega el texto aquí”**.
2. Revisa el panel de verificación.
3. Usa:
   - **Copiar Markdown** para copiar al portapapeles.
   - **Descargar .md** para guardar el archivo con el mismo contenido.
   - **Limpiar** para reiniciar.

## Garantías de integridad

La app mantiene el contenido exactamente igual:

- No aplica trim.
- No normaliza espacios, tabs ni saltos de línea.
- No agrega encabezados, metadata ni bloques de código.
- El archivo descargado usa nombre base del archivo original (`mi_texto.txt` → `mi_texto.md`) y codificación UTF-8.

## Pruebas manuales sugeridas

1. **Igualdad exacta:** pegar texto y verificar estado `✅ IDÉNTICO`.
2. **Acentos y ñ:** `Canción, piñata, acción`.
3. **Emojis:** `😀🚀✨`.
4. **Tabs y espacios:** incluir `\t` y espacios al final de línea.
5. **Líneas vacías múltiples:** varias líneas en blanco intermedias y finales.
6. **Descarga:** abrir `.md` descargado y comparar contra entrada.
7. **Copiado:** pegar en otro editor y verificar coincidencia exacta.
