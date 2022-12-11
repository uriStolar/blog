---
path: /node-debugger
date: 2019-07-08
title: Node Debugger
tags: ['desarrollo de software', 'node']
excerpt: Cómo utilizar el debugger integrado de NodeJS (no, no es el console.log())
image: ./debug.png
---
## 🚫🐞 Depurando Node

Recientemente investigué cómo utilizar el debugger de NodeJS y lo condenso en los siguientes pasos: 

>Para este ejemplo tendremos hipotéticamente una función llamada `miFuncion` dentro de un archivo `index.js`

1. En la función a depurar, agregar la sentencia `debugger` en el punto de interés
2. Llamar a la función manualmente, por ejemplo `miFuncion()`
3. En la terminal, ejecutar el archivo de node utilizando el comando `inspect`, por ejemplo `node inspect index` (no es necesario especificar la extensión del archivo si es .js)
4. Continuar la ejecución del archivo, presionando <kbd>c</kbd> y después <kbd>ENTER</kbd>
5. Para ejecutar una sesión [REPL (Read - Eval - Print - Loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) tecleamos <kbd>repl</kbd> y después <kbd>ENTER</kbd>. En este punto podemos analizar el valor de las variables de nuestro interés tecleando su nombre.
6. Para salir de la sesión REPL, presionamos <kbd>CTRL + C</kbd> lo cual nos lleva al debugger, en donde podemos continuar la ejecución o salir del debugger.
