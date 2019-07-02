---
path: /notas-algoritmos-hackerrank
date: 2019-07-01
title: Notas de algoritmos vistos en HackerRank
tags: ['algoritmos', 'hackerrank', 'javascript']
excerpt: Resumen sobre los puntos más importantes referentes a los algoritmos vistos en HackerRank
---
# Notas de algoritmos vistos en HackerRank 📚

## Problem Solving - Warmup 🔥

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

## Algorithms - Implementation 📗

### Grading Students

>Una universidad tiene ciertas políticas de aprobar materias:
>- Cada estudiante recibe una calificación dentro de un rango de 0 a 100
>- Cualquier calificación menor a 40 es reprobatoria
>
>Sam es un profesor de esa universidad y le gusta redondear la calificación de sus estudiantes de acuerdo a las siguientes reglas:
>
>- Si la diferencia entre la calificación y el siguiente múltiplo de 5 es menor a 3, redondear hacia arriba la calificación hasta el siguiente múltiplo de 5
>- Si la calificaci'on es menor a 38, no se redondea y el resultado será reprobatorio
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