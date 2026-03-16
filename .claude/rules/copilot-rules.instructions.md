# Reglas del Proyecto (Instrucciones para el Agente)

- **PROHIBIDO USAR TERMINAL PARA EDITAR EL INTERIOR DE ARCHIVOS:** Nunca uses comandos de terminal o scripts (como `sed`, `awk`, `echo` o redirecciones `>`, `>>`) para modificar el código o contenido dentro de los archivos.
- **OBLIGATORIO USAR HERRAMIENTAS NATIVAS PARA CÓDIGO:** Para toda manipulación de texto y código interno debes usar estricta y únicamente tus herramientas nativas (`read_file`, `replace_string_in_file`, `grep_search`).
- **COMANDOS DE SISTEMA PERMITIDOS:** SÍ puedes usar la terminal para administrar la estructura del sistema, por ejemplo: copiar (`cp`), mover/renombrar (`mv`), eliminar (`rm`), crear archivos nuevos vacíos (`touch`) o carpetas (`mkdir`).
- **PROCESOS Y COMANDOS LIBRES:** SÍ puedes usar la terminal para instalar dependencias (`npm`, `npx`, `pnpm`), levantar servidores, correr scripts, interactuar con `git` y **para correr cualquier comando que el usuario solicite explícitamente.**
