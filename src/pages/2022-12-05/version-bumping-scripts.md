---
path: /version-bumping-scripts
date: 2022-12-05
title: Scripts para automatizar el incremento de versión de un proyecto node
tags: ['node', 'npm', 'scripts','version', 'increase', 'bump']
excerpt: Shell scripts FTW! 🐚 📜
image: ./bash.png
---
# Versionamiento y Automatización de su Incremento

Cada proyecto de node debe tener un archivo `package.json` en el que se especifican propiedades del proyecto, entre las cuales está la versión del mismo. Este parámetro usualmente está indicado por tres números separados por puntos, los cuales indican el número mayor, menor y versión de parche, por ejemplo:

```json
{
  name: "myNodeProject",
  version: "1.2.3"
}
```

En este caso:
- El número `1` es el número de versión mayor. Un incremento en este valor indica cambios grandes en el proyecto, posiblemente con incompatibilidad entre versiones del mismo.
- El número `2` es el número de versión menor y un incremento en este número puede indicar nuevas funcionalidades en el proyecto, pero no implican incompatibilidad entre versiones.
- El número `3` es el número de parche de esta versión y suele indicar correcciones de errores o mejoras menores.

Usualmente se tiene que incrementar este número de alguna manera en algún momento del desarrollo del proyecto. 

En un trabajo anterior era frecuente que yo olvidara hacer este incremento de versiones, que usualmente tenía que hacerse en el archivo `package.json` pero bien podría ser en otro archivo, por ejemplo el `app.json` de proyectos de React Native con Expo, o algún otro archivo de texto aunque no fuera necesariamente JSON. Dada esta situación de olvidar hacer este incremento, me decidí a automatizar esta tarea repetitiva e implementé una solución basada en [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), [Husky](https://github.com/typicode/husky) y [AWK](https://en.wikipedia.org/wiki/AWK).

Utilizamos Husky para ejecutar un script de bash cuando se ejecuta un git hook en nuestro proyecto, en este caso el `pre-commit` hook, el cual se activa antes de realizar un commit de git.

El script en cuestión es éste:

```json
{
  "scripts": {
      "versionIncrease": "awk -F'[\"]' -v OFS='\"'  '/\"version\":/{split($4,a,\".\");$4=a[1]\".\"a[2]\".\"a[3]+1};1' ./package.json > ./package2.json && mv ./package2.json ./package.json"
  }
}
```

Se creó ese script en el `package.json` del proyecto, el cual hace lo siguiente: 
1. Usando AWK busca en el archivo `package.json` la línea con la cadena `"version":` y toma el contenido de la línea hasta el caracter `"` y separa su contenido usando el caracter `.`, para después tomar el tercer elemento y sumarle un 1 (asumiendo que el tercer elemento de la versión es un número).
2. Redirige la salida de esta operación al archivo `package2.json` y posteriormente reemplaza el archivo `package.json` con el `package2.json` el cual tiene el incremento de versión.

Adicionalmente se agregó esta línea en el `package.json` para configurar los hooks de husky en el hooksPath de un git submodule que tenía el proyecto padre, pero es un caso muy particular.

```json
  "postinstall": "cd src/submodule-path && git config core.hooksPath ../../.husky",
```

El hook de husy creado es el siguiente:

```bash
  #!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
 
CURDIR=$(pwd)
BASE=$(basename $CURDIR)
if [[ "$BASE" == "submodule-path" ]];
then
  echo "submodule precommit hook:";
  yarn run versionIncrease && yarn lint-staged && git add package.json
else 
  echo "$BASE precommit hook:";
  yarn run anotherCommand && yarn run versionIncrease && yarn lint-staged && git add app.json package.json
fi
```

Este script es el que ejecuta los scripts de AWK especificados en el `pacakge.json`, tiene una condición para identificar si el pre-commit hook está siendo ejecutado en el directorio del proyecto padre, o el del submódulo (pero es un caso muy particular) y dependiendo de esto ejecuta diferentes comandos, aunque al final de ambos se ejecuta el linter del proyecto y **se agregan los cambios generados por los scripts al stage area de git**, para que sean incluidos en el commit actual.
