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
- [Reverse String](#reverse-string)
- [Palíndromos](#palíndromos)
- [Reverse Integer](#reverse-integer)
- [Max Chars](#max-chars)

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
  let alReves = [...str].reduce((previo, actual) => actual + previo)
  return alReves === str
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
- Posteriormente declaramos dos variables auxiliares `max` y `maxChar` y utilizamos un (for...in)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in] para iterar las llaves de nuestro mapa de caracteres, almacenando el valor máximo de cada llave y el caracter en nuestras variables auxiliares y finalmente devolveremos el caracter que haya tenido más ocurrencias.
- **Nota:** podemos recordar el uso del for...of VS el uso del for...in recordando el [mnemónico](https://es.wikipedia.org/wiki/Mnem%C3%B3nico) `'o'f -> not 'o'bjects, 'i'n -> not 'i'terables`