---
path: /ejercicios-algoritmos
date: 2019-07-01
title: Ejercicios de Algoritmos y Estructuras de Datos
tags: ['algoritmos', 'javascript', 'hackerrank']
excerpt: Notas sobre ejercicios de algoritmos y estructuras de datos vistos en HackerRank y otras fuentes. Se irán agregando mas a esta nota conforme vaya resolviendo ejercicios.
image: ./fractal.jpg
---
#### 📗Índice 

- [Plus Minus](#plus-minus)
- [Staircase](#staircase)
- [Mini Max Sum](#mini-max-sum)
- [Birthday Cake Candles](#birthday-cake-candles)
- [Time Conversion](#time-conversion)
- [Grading Students](#grading-students)
- [Sock Merchant](#sock-merchant)
- [Counting Valleys](#counting-valleys)
- [Reverse String](#reverse-string)
- [Palíndromos](#palíndromos)
- [Reverse Integer](#reverse-integer)
- [Max Chars](#max-chars)
- [Anagrams](#anagrams)
- [FizzBuzz](#fizzbuzz-múltiplos)
- [Array Chunks](#array-chunks)
- [Capitalize Words](#capitalize-words)

### Plus Minus

>Dado un arreglo de enteros, calcular las fracciones de sus elementos que sean positivos, negativos o ceros. Imprimir el valor decimal de cada fracción en una nueva línea

La solución en JavaScript fue la siguiente:

```javascript
function main() {
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    let pos = 0;
    let negs = 0;
    let zeroes = 0;
    for(var i = 0; i < n; i++){
        if(arr[i]>0){pos++;}
        else if (arr[i]===0){zeroes++;}
        else{negs++;}
    }
    console.log(pos/n+'\n'+negs/n+'\n'+zeroes/n);
}

```

- Se obtiene el número total de elementos leyendo la primer línea
- Se convierte la entrada de la línea de números separados por espacios a un arreglo para poder trabajar mejor con ellos. Utilizamos la función [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) en conjunto con la función [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) para obtener el arreglo de enteros.
- Se declaran 3 variables contadores para los positivos, negativos y ceros y se procede a contabilizar

### Staircase

Considere una escalera de tamaño _n = 4_

```
   #
  ##
 ###
####
```
>Observe que la base y la altura son iguales a _n_, y que la imagen es dibujada utilizando caracteres `#` y espacios. La última línea no contiene ningún espacio. Deberá escribir una función que imprima una escalera de tamaño _n_.

La solución en JavaScript es la siguiente:

```javascript
function main() {
    var n = parseInt(readLine());
    let spaces = n-1;
    let hashes = n - spaces;
    let output = [];
    for(var i = 0; i < n; i++){
        for(var index1 = 0; index1 < spaces; index1++){output.push(' ');}
        for(var index2 = 0; index2 < hashes; index2++){output.push('#');}
        if(i < n-1){output.push('\n');}
        spaces--;
        hashes++;
    }
    var res = output.join('');
    console.log(res);
}
```
- Se obtiene el tamaño de la escalera `n`
- Se calcula el total de espacios `spaces` a imprimir en la primer línea restando `n - 1`
- Se calcula el total de hashes a imprimir en la primer línea restando `n - spaces`. Se declara un arreglo vacío para almacenar el resultado.
- Repetiremos las siguientes instrucciones en relación al tamaño de la escalera
    - Insertamos un caracter _espacio_ en el arreglo de resultado tantas veces como total de espacios tengamos
    - Insertamos un caracter _hash_ en el arreglo de resultado tantas veces como total de hashes tengamos
    - Insertamos un caracter de salto de línea `\n` en todas excepto en la última repetición
    - Decrementamos el número de espacios e incrementamos el número de hashes
    
- Unimos los caracteres del arreglo en una cadena e imprimimos en consola


### Mini-Max Sum

> Dados 5 números enteros positivos, encontrar los valores mínimo y máximo que pueden ser calculados al sumar exactamente 4 de los 5. Posteriormente imprimir los valores mínimo y máximo en una sola línea.

La solución ideada en JavaScript es la siguiente:

```javascript
function miniMaxSum(arr) {
    let total = 0
    arr = arr.sort()
    for (let i = 0; i < arr.length; i++) {
        total += arr[i]
    }
    const max = total - arr[0]
    const min = total - arr[arr.length-1]
    console.log(`${min} ${max}`)
}
```
- Se [ordena el arreglo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) de forma ascendente
- Se calcula la suma de todos los elementos del arreglo y se almacena en una variable
- Se calcula el máximo restando el número menor (primer elemento del arreglo) del total
- Se calcula el mínimo restando el número mayor (último elemento del arreglo) del total
- Se imprime el resultado

### Birthday Cake Candles

> Se colocarán velas en un  pastel del cumpleaños a razón de una vela por cada año del total de la edad del cumpleañero. Las velas tienen diferente longitud y, al soplar las velas, sólo las de mayor longitud se lograrán apagar. Se deberá encontrar cuántas velas se pueden apagar exitosamente al soplar una vez.
>
>Las velas estarán representadas por un arreglo de enteros.

La solución ideada en JavaScript es la siguiente:

```javascript
function birthdayCakeCandles(ar) {
    const max = Math.max(...ar)
    return ar.filter(x => x === max).length
}
```

- Se [calcula el valor máximo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) utilizando [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) como argumentos de la función
- Se [crea un nuevo arreglo filtrando](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) los elementos que sean iguales al valor máximo calculado previamente
- Se retorna la [longitud](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) del arreglo con elementos filtrados

### Time conversion

> Dada una hora en formato de 12 horas AM/PM, convertirla a formato militar (24 horas). Nota: la media noche es a las 12:00:00AM en formato de 12 horas y las 00:00:00 en formato de 24 horas. El mediodía es a las 12:00:00PM en formato de 12 horas y las 12:00:00 en formato de 24 horas.

La solución ideada en JavaScript es la siguiente:

```javascript
function timeConversion(s) {
    const amPM = s.substring(s.length - 2, s.length)
    let hrs = s.substring(0, 2)
    console.log(hrs)
    if (amPM === 'AM') {
        if (hrs === '12') hrs = '00'
        return (hrs + s.substring(2, s.length - 2))
    }
    else {
        if (hrs !== '12') hrs = parseInt(hrs) + 12
        return ('' + hrs + s.substring(2, s.length - 2))
    }
}
```

- Almacenamos en variables los primeros y últimos dos caracteres de la hora de entrada usando la función [substring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring) los primeros indican las horas y los últimos si es horario matutino o vespertino
- Si es horario matutino y si las horas son las doce, las reemplazamos por las `00`. Posteriormente retornamos la subcadena con el valor de las horas, minutos y segundos
- Si es horario vespertino y si las horas son diferentes de las `12`, calculamos el valor de las horas convirtiéndolas a número y sumando 12. Finalmente retornamos una cadena con el valor de las horas, minutos y segundos

### Grading Students

>Una universidad tiene ciertas políticas de aprobar materias:
>- Cada estudiante recibe una calificación dentro de un rango de 0 a 100
>- Cualquier calificación menor a 40 es reprobatoria
>
>Sam es un profesor de esa universidad y le gusta redondear la calificación de sus estudiantes de acuerdo a las siguientes reglas:
>
>- Si la diferencia entre la calificación y el siguiente múltiplo de 5 es menor a 3, redondear hacia arriba la calificación hasta el siguiente múltiplo de 5
>- Si la calificación es menor a 38, no se redondea y el resultado será reprobatorio
>
> Por ejemplo una calificación de 84 se redondea a 85 pero una de 29 no.

La solución ideada en JavaScript es la siguiente:

```javascript
function gradingStudents(grades) {
    let finalGrades = []
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] < 38) finalGrades.push(grades[i])
        else {
            const nextDividendOf5 = Math.ceil(grades[i] / 5) * 5
            if (nextDividendOf5 - grades[i] < 3) finalGrades.push(nextDividendOf5)
            else finalGrades.push(grades[i])
        }
    }
    return finalGrades
}
```
- Se declara un arreglo vacío para almacenar el resultado y se procede a comparar cada elemento
- Si el elemento a comparar es menor a 38, se inserta en el arreglo resultado, de lo contrario:
- Se procede a calcular el siguiente número divisible entre 5, dividiendo el elemento entre 5 y redondeando al siguiente entero más grande usando la función [Math.ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil), y posteriormente multiplicando por 5
- Con el siguiente número divisible entre 5 comparamos si la diferencia entre éste y el elemento es menor a 3, si lo es entonces insertamos el siguiente número divisible entre 5 al arreglo de resultados
- En caso contrario que la diferencia entre el siguiente divisible entre 5 y el elemento sea mayor a 5, se inserta el elemento en el arreglo de resultados y al finalizar las iteraciones se retorna el arreglo

### Sock Merchant
> Un vendedor de calcetines tiene una pila de ellos que debe ordenar en pares de acuerdo a su color. Dado un arreglo de enteros que representa el color de cada calcetín, determinar cuántos pares de calcetines con el mismo color existen.
>
>Por ejemplo, hay `n = 7` calcetines con colores `ar = [1, 2, 3, 2, 1, 3, 2]`. Existe un par de color `1` y otro de color `2`. También hay tres calcetines sin par, uno de cada color. El número de pares es `2`.

Se propone la siguiente solución:

```javascript
function sockMerchant(n, ar) {
    let sockMap = {}
    let result = 0
    for (let sock of ar) {
        sockMap[sock] ? sockMap[sock]++ : sockMap[sock] = 1
    }
    for (let sock in sockMap) {
        if (sockMap[sock] > 1) {
            result = result + Math.floor(sockMap[sock] / 2)
        }
    }
    return result
}
```
- Declaramos un objeto vacío `sockMap` donde crearemos un mapa de cada color de calcetines.
- Declaramos una variable donde almacenaremos el resultado y la inicializaremos en 0
- Crearemos el mapa de colores de calcetines iterando el arreglo. Si la llave del color en cuestión ya existe, incrementaremos el número de sus ocurrencias en uno, de lo contrario crearemos la llave y la inicializaremos con el valor 1.
- Posteriormente iteraremos nuestro mapa de colores de calcetines, y:
  - Si el valor del color es mayor a 1:
    - Dividimos el valor del color entre dos y redondeamos hacia abajo el resultado usando [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) y este valor se lo sumamos a nuestra variable `result`

### Counting Valleys
> Un montañista toma nota de la topografía en sus salidas. Durante su última salida recorrió exactamente `n` pasos. Por cada paso que recorrió anotó si era un paso hacia arriba con `U` o si era un paso hacia abajo con `D`. Las salidas del montañista siempre inician y terminan a nivel del mar y cada paso hacia arriba o hacia abajo representa un cambio de unidad de `1` en la altitud.
>
>- Una montaña es una secuencia de pasos consecutivos por arriba del nivel del mar, iniciando con un paso arriba del nivel del mar y terminando con un paso abajo, a nivel del mar.
>
>- De forma análoga, un valle es una secuencia de pasos consecutivos por debajo del nivel del mar, iniciando con un paso debajo del nivel del mar y terminando con un paso arriba, a nivel del mar.
>
>Dada una secuencia de pasos hacia arriba y hacia abajo de una de sus salidas, determinar el número de valles que recorrió.
>
>Por ejemplo, si los pasos son `s = [DDUUUUDD]`, primero entra a un valle a `2` unidades de profundidad. Después escala una montaña con `2` unidades de altura y finalmente regresa a nivel del mar y finaliza su trayecto.
>
>Explicación gráfica:
>Si representamos el nivel del mar con `_`, un paso hacia arriba con `/` y un paso hacia abajo con `\`, el trayecto del montañista puede representarse como:

```
_/\      _
   \    /
    \/\/
```
>En esta salida, el montañista entró y salió de `1` valle


Se propone la siguiente solución:

```javascript
function countingValleys(n, s) {
  const steps = [...s]
  let level = 0
  let valleys = 0
  for (let step of steps) {
      if (step === 'D') level--
      else if (step === 'U') {
          level++
          if (level === 0) valleys++
      }
  }
  return valleys
}
```
- Declaramos la constante `steps` y, dado que el formato de los pasos `s` es una cadena, utilizamos el operador spread para convertirlo en un arreglo. También declaramos las variables `level` y `valleys` para contabilizar el nivel de altitud y el número de valles encontrados.
- Recorremos nuestro arreglo de pasos y:
  - Si el paso es hacia abajo `D`, decrementamos el nivel una unidad
  - Si el paso es hacia arriba `U` incrementamos el nivel una unidad y verificamos si el nivel es 0, esto significa que le montañista ha salido del valle, por lo que incrementamos el contador `valleys`

### Reverse String

>Dada una cadena, retornar una cadena de caracteres en orden inverso a la original.

Se implementaron tres soluciones en JavaScript. La primera es: 
```javascript
function reverse (str) {
  return [...str].reverse().join('')
}
```
- Se utiliza el [operador spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) para generar un arreglo con los caracteres de la cadena `str`
- Utilizamos el método [Array.prototype.reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) para invertir el orden del arreglo (**Nota:** esto puede considerarse "trampa" o una solución muy sencilla por lo que se genera otra propuesta de solución)
- Finalmente aplicamos el método [Array.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) para crear una nueva cadena concatenando cada caracter con el separador de "caracter vacío" `''`

La segunda propuesta de solución es la siguiente:
```javascript
function reverse (str) {
  let reversed = ''
  for (let character of str) {
      reversed = character + reversed
  }
  return reversed
}
```
- Para esta solución se declara la cadena vacía `reversed` donde almacenaremos el resultado
- Usando un bucle [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) iteramos sobre los caracteres de la cadena `str` y almacenamos el caracter actual en la variable `reversed` para después concatenarle el resto de la misma variable

La tercer propuesta de solución es la siguiente:
```javascript
function reverse (str) {
  return [...str].reduce((prev, current) => current + prev)
}
```
- Nuevamente utilizamos el operador spread para generar un arreglo con los caracteres de `str`
- Utilizamos la función [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) para generar un valor único con base en el arreglo anterior, usando como reducer una [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) en la que retornamos la concatenación del valor actual con el valor anterior del arreglo

### Palíndromos

> Dada una cadena, retornar `true` si la cadena es palíndromo o `false` si no lo es. Un palíndromo es una palabra o frase que se lee igual de adelante hacia atrás que de atrás hacia adelante.
>
> **Nota:** se deberán tomar en cuenta espacios y signos de puntación al determinar si la cadena es un palíndromo. Ejemplos:
>
> palindrome("abba") === true
>
> palindrome("abcdefg") === false

Se proponen dos soluciones en JavaScript. La primera es: 

```javascript
function palindrome (str) {
  return [...str].every((char, i) => {
    return char === str[str.length - i - 1]
  })
}
```
- En esta solución transformamos la cadena `str` en un arreglo y utilizamos el método [Array.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Every) para comparar el primer caracter con el último y probar si son iguales, en la siguiente iteración se comparará el segundo con el antepenúltimo y así sucesivamente. **Nota:** Esta solución no es la más óptima pues se hacen más comparaciones de las necesarias para determinar si la cadena es un palíndromo.

Para la siguiente solución me basé en el ejercicio anterior [Reverse String](#reverse-string) para implementarla:

```javascript
function palindrome (str) {
  let reversed = [...str].reduce((previo, actual) => actual + previo)
  return reversed === str
}
```
- Se almacena en una variable la cadena invertida y se compara con la original, retornando el valor booleano resultado de la comparación

### Reverse Integer

> Dado un entero, retornar el entero que es el valor invertido de sus números. Por ejemplo:
>
> reverseInt(15) === 51
>
> reverseInt(981) === 189
>
> reverseInt(500) === 5
>
> reverseInt(-15) === -51
>
> reverseInt(-90) === -9

La primer solución que hice es la siguiente:

```javascript
function reverseInt (n) {
  let result = n.toString().split('').reverse()
  if (result.indexOf('-') > -1) {
    result.pop()
    return parseInt(result.join('')) * -1
  }
  return parseInt(result.join(''))
}
```
- Primero almacenamos en un Array el valor de los números invertidos
- Buscamos en el arreglo el caracter `-` que nos indica si es un número negativo. Si lo encontramos significa que el caracter estará al final del arreglo y lo sacamos usando el método [Array.pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop). Posteriormente convertimos el arreglo a cadena, la cadena a número entero con el método [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), lo multiplicamos por `-1` y retornamos el resultado
- En caso de que no sea un número negativo, convertimos el arreglo a cadena, la cadena a entero y retornamos el resultado

Otra solución más óptima es la siguiente:

```javascript
function reverseInt(n) {
    let reversed = n.toString().split('').reverse().join('')
    return parseInt(reversed) * Math.sign(n)
}
```
- Aquí almacenamos en una cadena el número invertido, transformando el original a cadena, luego a un Array para poder usar la función reverse() y finalmente juntando sus elementos con `join('')`
- Posteriormente transformamos la cadena a entero y utlizamos la función [Math.sign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) para multiplicar el número invertido por el signo del número original.

### Max Chars
> Dada una cadena, retornar el caracter más usado dentro de dicha cadena. Por ejemplo:
>
>  maxChar("abcccccccd") === "c"
>
>  maxChar("apple 1231111") === "1"

Este algoritmo puede aplicarse para resolver diferentes tipos de problemas, como el contar el caracter más usado en una cadena, determinar si una palabra A es [anagrama](https://es.wikipedia.org/wiki/Anagrama) de la palabra B o verificar si una cadena tiene caracteres repetidos.

La solución en JavaScript es la siguiente:

```javascript
function maxChar (str) {
  let charMap = {}
  let maxChar = ''
  let max = 0

  for (const char of str) {
    charMap[char] ? charMap[char]++ : charMap[char] = 1
  }

  for (let char in charMap) {
    if (charMap[char] > max) {
      max = charMap[char]
      maxChar = char
    }
  }
  return maxChar
}
```
- Creamos el objeto `charMap` que utilizaremos como mapa de caracteres para almacenar las ocurrencias de un mismo caracter dentro de la cadena a analizar.
- Iteramos con un [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) los caracteres de la cadena y creamos las propiedades (o llaves) de nuestro mapa de caracteres mediante un operador ternario: si ya existe la llave y se encuentra de nuevo la incrementamos en 1, de lo contrario la inicializamos en 1.
- Posteriormente declaramos dos variables auxiliares `max` y `maxChar` y utilizamos un [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) para iterar las llaves de nuestro mapa de caracteres, almacenando el valor máximo de cada llave y el caracter en nuestras variables auxiliares y finalmente devolveremos el caracter que haya tenido más ocurrencias.
- **Nota:** podemos recordar el uso del for...of VS el uso del for...in recordando el [mnemónico](https://es.wikipedia.org/wiki/Mnem%C3%B3nico) `'o'f -> not 'o'bjects, 'i'n -> not 'i'terables`

Basándonos en el algoritmo anterior para crear mapas de caracteres, podemos resolver el problema de determinar si dos palabras son anagramas.

Antes de ver este ejercicio, vamos a refactorizar nuestra función para poder reutilizarla haciendo referencia a ella:

```javascript
const getCharMap = string1 => {
  let map = {}
  for (let char of string1) {
    map[char] ? map[char]++ : map[char] = 1
  }
  return map
}
```

Adicionalmente crearemos una función para "sanitizar" o reemplazar espacios y caracteres especiales en una cadena, con objeto de tener un resultado correcto al momento de comparar dos cadenas:

```javascript
const sanitizeString = dirtyStr => (
  dirtyStr.toLowerCase().replace(/[^a-z\d]/g, '')
)
```
- En esta función tomamos la cadena inicial, la convertimos a minúsculas y utilizamos el método replace con la [expresión regular](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags) `/[^a-z\d]/g` para reemplazar las ocurrencias con el caracter vacío `''`

Ya que tenemos este par de funciones procederemos a resolver el problema de determinar si dos palabras son anagramas.

### Anagrams

>Un anagrama es una palabra o frase que resulta de la transposición de letras de otra palabra o frase. Dicho de otra forma, una palabra es anagrama de otra si las dos tienen las mismas letras, con el mismo número de apariciones, pero en un orden diferente.
>
> Dadas dos cadenas, determinar si son anagramas retornando un valor booleano.

Se propone la siguiente solucion en JavaScript:

```javascript
const areAnagrams = (string1, string2) => {
  const string1Map = getCharMap(sanitizeString(string1))
  const string2Map = getCharMap(sanitizeString(string2))

  if (string1Map.length !== string2Map.length) return false
  else {
    for (let char in string1Map) {
      if (string1Map[char] !== string2Map[char]) return false
    }
    return true
  }
}
```

- Tomamos las funciones anteriores `getCharMap` y `sanitizeString` para limpiar las cadenas de caracteres especiales y generar su mapa de caracteres
- Comparamos la longitud de los mapas de caracteres; si tienen longitud diferente significa que no son anagramas
- Iteramos sobre cada caracter del mapa de la cadena 1 y lo comparamos con el mapa de la cadena 2; si todas las llaves del mapa 1 tienen el mismo valor en el mapa 2 significa que sí son anagramas

Otra propuesta de solución en la que no ocupamos mapa de caracteres (pero sí nuestra función para limpiar cadenas) es:

```javascript
const anagrams = (stringA, stringB) => {
  const cleanA = [...sanitizeString(stringA)].sort().join()
  const cleanB = [...sanitizeString(stringB)].sort().join()
  if (cleanA === cleanB) return true
  else return false
}
```
- Esta solución radica en el uso del método [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) el cual, por defecto, ordena un arreglo convirtiéndolo a string y de acuerdo a los valores de su código UTF-16 (lo cual resulta en orden alfabético).
- Creamos una constante por cada cadena, en ella utilizamos nuestra función `sanitizeString()` para limpiar nuestra cadena de caracteres especiales, en conjunto con el operador spread para convertir el resultado a arreglo; posteriormente usamos el método `sort()` para ordenar alfabéticamente el arreglo y posteriormente el método `join()` para convertir el arreglo a cadena.
- Finalmente comparamos ambas cadenas, si son iguales significa que sí son anagramas.

### FizzBuzz (múltiplos)
>Escribir un programa que imrpima en pantalla los números de 1 a n. Para los números múltilplos de 3 en vez de imprimir el número imprimir la cadena `fizz`; para los números múltilplos de 5 en vez de imprimir el número imprimir la cadena `buzz`; finalmente para los números que sean múltiplos de ambos 3 y 5 imprimir la cadena `fizzbuzz`.

La propuesta de solución en JavaScript es la siguiente:

```javascript
function fizzBuzz (n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) console.log('fizzbuzz')
    else if (i % 3 === 0) console.log('fizz')
    else if (i % 5 === 0) console.log('buzz')
    else console.log(i)
  }
}
```
- Recorremos con un bucle for los números desde 1 hasta n y, utilizando el operador aritmético [modulo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()) (o residuo), verificamos:
  - Si el número actual modulo 3 y modulo 5 son iguales a 0. imprimimos `fizzbuzz`
  - Si el número actual modulo 3 es igual a 0. imprimimos `fizz`
  - Si el número actual modulo 5 es igual a 0. imprimimos `buzz`
  - De lo contrario imprimimos el número

### Array Chunks
>Dado un arreglo y un tamaño (chunk), dividir el arreglo en múltiples subarreglos donde cada subarreglo es de la longitud del tamaño (o chunk) especificado. Por ejemplo:
> 
>chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
> 
>chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
> 
>chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
>
>chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
>
>chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

Se proponen dos soluciones en JavaScript; la primera es:

```javascript
function chunk (array, size) {
  const chunked = []
  for (let element of array) {
    const last = chunked[chunked.length - 1]
    if (!last || last.length === size) {
      chunked.push([element])
    } else {
      last.push(element)
    }
  }
  return chunked
}
```
- Nuestra función recibirá como parámetros el arreglo original a dividir `array` y el tamaño deseado de los subarreglos (o chunks) `size`
- Creamos un arreglo vacío `chunked` donde almacenaremos nuestros subarreglos.
- Iteramos sobre el arreglo original y, por cada elemento:
  - Creamos un arreglo `last` donde obtenendremos el último elemento del arreglo de subarreglos `chunked` y evaluamos:
  - Si el último elemento no existe o si su tamaño es igual al tamaño deseado `size`:
    - Insertamos a `chunked` un nuevo subarreglo con el elemento actual del arreglo original
  - De lo contrario insertamos el elemento actual en el arreglo `last`

Otra solución basada en el uso del método [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) es:
```javascript
const chunk = (array, size) => {
  const chunked = []
  let index = 0
  while (index < array.length) {
    chunked.push(array.slice(index, size + index))
    index += size
  }
  return chunked
}
```
- Creamos un arreglo vacío `chunked` donde almacenaremos nuestros subarreglos.
- Creamos una variable `index` inicializada en 0
- Mientras `index` sea menor a la longitud del arreglo original:
  - Insertaremos en `chunked` un subarreglo del original de longitud `size`
  - Sumaremos `size` a `index`, controlando así la porción del subarreglo a insertar y el bucle while

### Capitalize Words

> Escribir una función que acepte una cadena. La función deberá convertir a mayúsculas la primer letra de cada palabra de dicha cadena y después regresar la cadena con las respectivas mayúsculas. Por ejemploL:
>
>capitalize('a short sentence') --> 'A Short Sentence'
>
>capitalize('a lazy fox') --> 'A Lazy Fox'
>
>capitalize('look, it is working!') --> 'Look, It Is Working!'

La primer solución que obtuve fue:

```javascript
function capitalize (str) {
  let result = str[0].toUpperCase()
  let rest = str.slice(1)
  let space = rest.indexOf(' ')
  while (space > -1) {
    result += rest[space + 1].toUpperCase()
    rest = rest.slice(space + 1)
    space = rest.indexOf(' ')
  }
  return result + rest
}
```
- Declaramos una variable `result` en la que almacenaremos el resultado y la inicializaamos con el primer caracter de la cadena convertido a mayúscula usando el método [toUpperCase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
- Posteriormente declaramos una variable donde almacenaremos el resto de la cadena usando la función slice
- Declaramos otra variable donde almacenaremos el índice de donde se encuentre el caracter espacio `' '` dentro del resto de la cadena
- Analizamos el resto de la cadena y mientras siga existiendo un caractere espacio:
  - Convertimos el caracter siguiente del espacio en mayúscula y lo concatenamos a `result`
  - Almacenamos el resto de la cadena un caracter después de donde encontramos el espacio y hasta el final
  - Buscamos en el nuevo resto por el caracter espacio
- Cuando ya no encontremos un caracter espacio, concatenamos nuestro resultado con el resto

Otra solución más legible es:

```javascript
const capitalize = str => {
  const words = []
  for (let word of str.split(' ')) {
    words.push(word[0].toUpperCase() + word.slice(1))
  }
  return words.join(' ')
}
```
- Declaramos un arreglo vacío `words` donde almacenaremos las palabras encontradas
- Separamos la cadena original por cada caracter espacio `' '` obteniendo así cada palabra
- Iteramos sobre las palabras encontradas y:
  - Agregamos a nuestro arreglo el primer caracter de la palabra convertido a mayúsculas y el resto de la palabra
- Finalmente convertimos nuestro arreglo de palabras en una cadena uniéndolo por el caracter espacio