---
path: /notas-algoritmos-hackerrank
date: 2019-07-01
title: Notas de algoritmos vistos en HackerRank
tags: ['algoritmos', 'hackerrank', 'javascript']
excerpt: Resumen sobre los puntos más importantes referentes a los algoritmos vistos en https://hackerrank.com
---
# Notas de algoritmos vistos en HackerRank 📚

## Problem Solving - Warmup 🔥

### Mini-Max Sum

> Dados 5 números enteros positivos, encontrar los valores mínimo y máximo que pueden ser calculados al sumar exactamente 4 de los 5. Posteriormente imprimir los valores mínimo y máximo en una sola línea.

La solución ideada en JavaScript es la siguiente:

```
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

Las velas estarán representadas por un arreglo de enteros.

La solución ideada en JavaScript es la siguiente:

```
function birthdayCakeCandles(ar) {
    const max = Math.max(...ar)
    return ar.filter(x => x === max).length
}
```

- Se [calcula el valor máximo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) utilizando [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) como argumentos de la función
- Se [crea un nuevo arreglo filtrando](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) los elementos que sean iguales al valor máximo calculado previamente
- Se retorna la [longitud](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) del arreglo con elementos filtrados