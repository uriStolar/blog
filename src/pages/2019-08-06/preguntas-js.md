---
path: /preguntas-javascript
date: 2019-08-08
title: Preguntas y Respuestas de JS
tags: ['preguntas', 'respuestas', 'javascript']
excerpt: Preguntas y respuestas sobre temas y conceptos de JavaScript a manera de preparación para entrevistas laborales
image: ./brackets.png
---
## 0.1. ¿Qué es hoisting?

>En JavaScript cada declaración de función o variable es llevada hasta arriba de su scope actual, lo cual es llamado `hoisting`.

## 0.2 ¿Cuál es la diferencia entre `var`, `let` y `const`?

La principal diferencia radica en el scope de cada una de ellas. El término `scope` hace referencia a su alcance de uso (o su disponibilidad para usarse).

`var` tiene:
- Scope global (cuando se declara fuera de una función): esto implica que cualquier variable declarada con `var` fuera de una función está disponible para usarse en toda el objeto `window` o el script donde reside.
- Scope de función o local (cuando se declara dentro de una función): esto implica que únicamente está disponible para su uso dentro de la función que la declaró.
- Adicionalmente, las variables declaradas con `var` pueden ser redeclaradas y su valor puede actualizarse
- El hoisting de var sucede hasta arriba de su scope y son inicializadas con el valor `undefined`

`let` tiene:

- Scope de bloque (de código): el cual es definido por estar dentro de los caracteres `{` y `}` lo que implica que las variables declaradas con let únicamente están disponibles dentro del bloque de código en el que se declararon.
- Adicionalmente, las variables declaradas con `let` pueden actualizar su valor, pero no pueden ser redeclaradas (aunque dos variables declaradas con `let` pueden llamarse igual siempre y cuando no estén en el mismo bloque de código, ergo no serán la misma variable).
- El hoisting de let sucede hasta arriba de su scope pero **NO** son inicializadas

`const` tiene:

- Scope de bloque 
- Las variables declaradas con `const` deben ser inicializadas al momento de su declaración, y no pueden actualizar su valor, ni redeclararse
- Este comportamiento es diferente cuando se trata de objetos declarados con `const`, dado que el objeto como tal no podrá actualizar su valor, pero sus propiedades **SI** podrán

## 1. ¿Cuál es la diferencia entre `undefined` y `not defined`?

Si se intenta usar una variable que no existe y no ha sido declarada, JavaScript arrojará el error `var name is not defined` y el script detendrá su ejecución. Pero si se utiliza ´typeof variable_no_declarada´ éste retornará `undefined`.

Antes de abundar en el tema, hay que entender la diferencia entre declaración y definición.

Podemos decir que `var x` es una declaración porque todavía no se ha definido el valor que almacenará `x`. Pero su existencia ya se declaró, así como la necesidad de asignar memoria.

```javascript
var x;            //declarando x
console.log(x)    //undefined
```

Aquí `var x = 1` es ambas: declaración y definición (también se le puede llamar inicialización). En el ejemplo anterior, la declaración y asignación del valor suceden en la misma línea.

La asignación sucede en orden, de manera que cuando intentamos acceder a una variable que ha sido declarada, pero no ha sido definida, obtenemos el resultado `undefined`.

```javascript
var x;    //declaración
console.log(typeof x === undefined)   //true
```

Si una variable no ha sido ni declarada ni definida, cuando intentemos hacer referencia a dicha variable, obtendremos `not defined`.

```javascript
console.log(y)    //ReferenceError: y is not defined
```

## 2. ¿Cuál es el resultado del siguiente código?

```javascript
var y = 1

if (function f(){}) {
  y += typeof f
}

console.log(y)
```

El resultado será `1undefined`. 

El condicional `if` es evaluado utilizando `eval`, por lo que `eval (function f(){})` retorna el valor `function f(){}` el cual es `true`, por lo que dentro del bloque del `if`, `typeof f` retorna `undefined`porque el bloque del `if` ejecuta su código en tiempo de ejecución, y la condición del `if` es evaluada también durante tiempo de ejecución.

```javascript
var k = 1

if (1) {
  eval(function foo(){})
  k += typeof foo
}

console.log(k)
```

El código anterior también imprimirá `1undefined`.

```javascript
var k = 1

if (1) {
  function foo(){}
  k += typeof foo
}

console.log(k)
```

El código anterior imprimirá `1function`.

## ¿Cuál es la desventaja de crear métodos privados en JavaScript?

Una de las desventajas de crear métodos privados en JavaScript es que son ineficientes en cuanto al uso de memoria, puesto que cada nueva instancia de la clase tendrá su copia única de dicho método.

```javascript
var Empleado = function (nombre, compania, salario) {
  this.nombre = nombre || ''
  this.compania = compania || ''
  this.salario = salario || 5000

  // Metodo privado
  var incrementarSalario = function () {
    this.salario += 1000
  }

  // Metodo publico
  this.mostrarSalarioIncrementado = function () {
    incrementarSalario()
    console.log(this.salario)
  }
}

var emp1 = new Empleado('John', 'HBO', 3000)
var emp2 = new Empleado('Daenerys', 'HBO', 2000)
var emp3 = new Empleado('Bran', 'HBO', 5500)
```

Cada variable de instancia `emp1`, `emp2` y `emp3` tendrá su propia copia del método privado `incrementarSalario`.

## 4. ¿Qué es una "closure"?

Una closure (o cerradura) es una función definida dentro de otra función (llamada función padre), y tiene acceso a las variables que han sido declaradas y definidas en el scope de su función padre.

La closure tiene acceso a las variables en tres diferentes scopes:

- Variables declaradas en su propia scope
- Variables declaradas en la scope de su función padre
- Variables declaradas en el espacio de nombres global

```javascript
let globalVar = 'abc';

// Funcion padre auto invocada
(function outerFunction (outerArg) { //Inicio del scope padre
  let outerFuncVar = 'x'; //Variable declarada dentro del scope de outerFunc

// Funcion closure auto invocada
  (function innerFunction (innerArg) {
    let innerFuncVar = 'z';

    console.log(`
      outerArg = ${outerArg}
      outerFuncVar = ${outerFuncVar}
      innerArg = ${innerArg}
      innerFuncVar = ${innerFuncVar}
      globalVar = ${globalVar}`)
  })('y')
})('w')
```

`innerFunction` es una closure definida dentro de `outerFunction` por lo que tiene acceso a todas las variables declaradas y definidas dentro del scope de `outerFunction`, así como a todas las variables definidas en el espacio de nombres global.

La salida del código anterior será:

```
outerArg = w
outerFuncVar = x
innerArg = y
innerFuncVar = z
globalVar = abc
```
## 5. Escribir una función `multip` que produzca la siguiente salida al invocarse:

```javascript
console.log(multip(2)(3)(4)) // 24
console.log(multip(4)(5)(6)) // 120
```

La solución es la siguiente:

```javascript
function multip (a) {
  return function (b) {
    return function (c) {
      return a * b * c
    }
  }
}
```

La función `multip` retorna una función anónima, que a su vez retorna otra función anónima que retorna la multiplicación de los argumentos de cada función.

Como se mencionó anteriormente, una función definida dentro de otra tendrá acceso a las variables de la función padre, y

- Una función es una instancia del tipo `Object`
- Una función puede tener propiedades y tiene un enlace a su método constructor
- Una función puede ser almacenada como una variable
- Una función puede ser pasada como parámetro a otra función
- Una función puede ser retornada por otra función

## 6. ¿Cómo vaciar un arreglo?

Teniendo el arreglo

```javascript
let arr = ['a', 'b', 'c', 'd', 'e']
```

Opción 1:

```
arr = []
```

Este método actualiza el valor de la variable `arr` a un arreglo vacío y se recomienda sólo si no existen referencias previas a la variable `arr` dado que si existen referencias previas, éstas no se actualizarán. Por ejemplo:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e']
let otroArr = arr
arr = []
console.log(otroArr) // ['a', 'b', 'c', 'd', 'e']
```

Opción 2:

```javascript
arr.length = 0
```

Esta opción actualiza el arreglo estableciendo su longitud a 0. Se recomienda este método si existen referencias a la variable `arr` y se desean actualizar todas las referencias. Por ejemplo:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e']
let otroArr = arr
arr.length = 0
console.log(otroArr) // []
```

Opción 3:

```javascript
arr.splice(0, arr.length)
```

Esta forma de vaciar el arreglo también actualizará todas las referencias al mismo

Opción 4:

```javascript
while (arr.length) {
  arr.pop()
}
```

Este método no se recomienda.

## 7. ¿Cómo verificar si un objeto es un arreglo?

Podemos verificar si un valor determinado es un arreglo usando el método [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) disponible en ES6 o superior

```javascript
let arr = ['a', 'b', 'c', 'd', 'e']`
```
La mejor forma de verificar si un objeto es instancia de una clase particular es usando el método `Object.prototype.toString`. Tomando como ejemplo 

## 8. ¿Cuál es el resultado del siguiente código?

```javascript
let salida = (function (x) {
  delete x
  return x
})(0)

console.log(salida)
```

El resultado será `0` dado que la instrucción `delete` funciona únicamente para propiedades de objetos y en este caso `x` es una variable local.

## 9. ¿Cuál es el resultado del siguiente código?

```javascript
let x = 1
let salida = (function () {
  delete x
  return x
})()

console.log(salida)
```
El resultado será `1` porque x no es una propiedad de un objeto, sino una variable global.

## 10. ¿Cuál es el resultado del siguiente código?

```javascript
let x = {foo: 'bar'}
let salida = (function () {
  delete x.foo
  return x.foo
})()

console.log(salida)
```
El resultado será `undefined`. En este caso el operador `delete` eliminará la propiedad `foo` del objeto `x`. Posteriormente se intentará referenciar a la propiedad eliminada, por ende el resultado `undefined`.

## 11. ¿Cuál es el resultado del siguiente código?

```javascript
let Empleado = {
  empresa: 'HBO'
}

let emp1 = Object.create(Empleado)
delete emp1.empresa

console.log(emp1.empresa)
```

El resultado será `HBO`. Aquí `emp1` tiene a `empresa` como propiedad de su **prototype**. El operador `delete` no elimina propiedades de prototype.

El objeto `emp1` no tiene a empresa como propiedad propia (lo podemos verificar con un `console.log(emp1.hasOwnProperty('empresa')) // false`).

Aunque si podríamos eliminar la propiedad `empresa` directamente del objeto `Empleado` utilizando `delete Employee.company` o también del objeto `emp1` utilizando `delete emp1.__proto__.empresa`

## 12. ¿Cuál es el resultado del siguiente código?

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7]
delete arr[2]

console.log(arr.length)
```

El resultado será 7 dado que el operador `delete` elimina el elemento del arreglo, pero no modifica su longitud. Esto es cierto incluso cuando se eliminan todos los elementos del mismo.

En algunos ambientes como Google Chrome o node, si intentamos imprimir en consola el arreglo, nos mostrará algo como `[ 1, 2, <1 empty item>, 4, 5, 6, 7 ]`


## 13. ¿Cuál es el resultado del siguiente código?

```javascript
let bar = true
console.log(bar + 0)
console.log(bar + 'xyz')
console.log(bar + true)
console.log(bar + false)
```

El resultado será `1, "truexyz", 2, 1` esto por cómo se comporta el operador de adición. Como guía general tenemos:

- Number + Number = Addition
- Boolean + Number = Addition
- Boolean + Number = Addition
- Number + String = Concatenation
- String + Boolean = Concatenation
- String + String = Concatenation

## 14. ¿Cuál es el resultado del siguiente código?

```javascript
let z = 1, y = z = typeof y
console.log(y)
```

El resultado será `undefined`. Esto es por la [regla de asociatividad](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence#Associativity) en la precedencia de operadores (en particular para el operador asignación, el cual tiene asociatividad de derecha a izquierda).

Lo que sucede en el código anterior es que primeramente se evalúa el `typeof y`, el cual en ese momento es `undefined`. Posteriormente se asigna a `z` el valor `undefined`, y luego dicho valor a `y`. Finalmente se declara e inicializa `z = 1`.

## 15. ¿Cuál es el resultado del siguiente código?

```javascript
// NFE o Named Function Expression
var oks = function bye () { return 12; };
typeof bye();  
```

El resultado es un `Reference Error`. Para que el código funcione lo podemos reescribir de varias formas: 

```javascript
var oks = function () { return 12; };
typeof bye();  
```

o como 

```javascript
function oks () { return 12; };
typeof bye();  
```

Lo cual nos retornará el valor de `number`.

La definición de una función sólo puede tener una variable de referencia como nombre. En el segundo bloque de código la variable `oks` hace referencia a una función anónima, y en el tercer bloque, la definición de la función es su propio nombre.

## 16. ¿Cuál es la diferencia entre las siguientes declaraciones de funciones?

```javascript
let oks = function () {
  // codigo
}
```

```javascript
function bye () {
  // codigo
}
```

La principal diferencia es que la función `oks` es definida en tiempo de ejecución mientras que la función `bye` es definida en tiempo de análisis. Para entender mejor veamos el siguiente ejemplo:

- Declaración de función en tiempo de ejecución

```html
<script>
  oks(); //Llamar a la función oks arrojará un error
  let oks = function () {
    console.log('Hola mundo')
  }
</script>
```

- Declaración de función en tiempo de análisis

```html
<script>
  bye(); //Llamar a la función bye no arrojará un error
  function bye () {
    console.log('Hola mundo')
  }
</script>
```

Una ventaja de la primer forma de declarar funciones es que se pueden declarar con base en cierta condición, no así de la segunda forma.

## 17. ¿Cuál es el resultado del siguiente código?

```javascript
var salario = '$10000';

(function () {
  console.log(`El salario original es de ${salario}`)
  var salario = '$15000'
  console.log(`El nuevo salario es de ${salario}`)
})()
```

El resultado para `salario` sería primero `undefined` y luego `$15000` esto debido al hoisting para variables declaradas con `var` (explicado al inicio de esta publicación).

## 18. ¿Cómo calcular la longitud de un arreglo asociativo en JavaScript?

Suponiendo el siguiente arreglo asociativo:

```javascript
let assoc = {
  A: 1,
  B: 2
}

assoc['C'] = 3
```

Podemos calcular su longitud utilizando el método [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) (disponible a partir de ES6) de la siguiente manera:

```javascript
console.log(Object.keys(assoc).length)
```