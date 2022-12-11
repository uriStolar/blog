---
path: /preguntas-javascript
date: 2019-08-06
title: Preguntas y Respuestas de JS
tags: ['desarrollo de software', 'javascript']
excerpt: 🇶 & 🇦's sobre temas y conceptos de JavaScript a manera de preparación para entrevistas laborales
image: ./js-questions.png
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


## Preguntas teóricas

- ¿Cuál es la diferencia entre `null`, `undefined` y `undeclared` y cómo revisar dichos valores?
> - `undefined` es una variable que ha sido declarada pero no tiene asignado un valor, también puede ser un tipo de variable `typeof variable === undefined`
> - `null` puede ser el valor asignado a una variable para representar ausencia de un valor, también es un tipo de objeto `typeof null // object`
> - `undeclared` indica que una variable no ha sido declarada, al hacer referencia a ella se arrojará un `ReferenceError: variable is not defined`

- ¿Cuál es la diferencia entre los operadores `==` y `===`?
> La diferencia es que el operador `==` no compara el tipo de dato de los elementos a comparar y el `===` si. Por ejemplo:

```javascript
0 == false // true, auto type coercion
0 === false // false, diferente tipo
1 == "1" // true, auto type coercion
1 === "1" // false, diferente tipo
```

- ¿Qué herramientas del lenguaje JavaScript se pueden utilizar para iterar sobre las propiedades de un objeto y los elementos de un arreglo?
> Para iterar sobre las propiedades de un objeto podemos utilizar el bucle `for...in` y para iterar sobre los elementos de un arreglo podemos utilizar el bucle `for...of`

- ¿Cuál es la diferencia entre el bucle `Array.forEach()` y el método `Array.map()`?
> El bucle `forEach()` ejecuta una función una vez por cada elemento de un arreglo (mutándolo), pero no entrega un valor de retorno.
>
> El método `map()` crea un nuevo arreglo con el resultado de llamar una función en cada elemento del arreglo a mapear y retorna el nuevo arreglo (del mismo tamaño que el original).

- Menciona un uso común de una función anónima
> En operaciones asíncronas, las `callback` suelen ser funciones anónimas

- ¿Cuál es la diferencia entre native objects y host objects?
> Un native object es un objeto definido por alguna especificación de ECMAScript (Object, Date, Math, parseInt, eval, String.indexOf, String.replace, etc).
>
> Un objeto host es cualquier objeto que no sea un objeto nativo, como WebAPIs (XMLHttpRequest, setTimeout, getElementsByTagName, window, document, location, history, etc.).

- ¿Cuál es la diferencia entre `Function.apply` y `Function.call`?
> Ambas permiten especificar un valor de `this` para la función a invocar, pero la diferencia es que `apply` te permite invocar a la función con sus argumentos especificados como un `a`rreglo y `call` requiere que los argumentos sean listados específicamente (separados por `c`omas).

- ¿Cuál es la diferencia entre `function Person()`, `var person = Person()` y `var person = new Person()`?
> `function Person()` es una declaración de una función.
>
> `var person = Person()` retorna el valor de la función `Person()` y se lo asigna a la variable `person`
>
> `var person = new Person()` crea una instancia basada en la función `Person()` por lo que `person` es un objeto.

- ¿Cuál es la diferencia entre `function foo(){}` y `var foo = function(){}`?
> La primera es una declaración de función, la cual es evaluada en la scope que la contiene y la segunda es una expresión función, la cual crea una función anónima (aunque podría tener un nombre) y la asigna a la variable `foo`


- ¿Dónde se deben poner los scripts de JS en una página web?
> Depende, pero por lo general convienen poner todos los scripts en un solo archivo minificado, puesto que se realizará una sola petición para obtener el archivo vs múltiples. En el caso de JS en línea (in-line) es recomendable ponerlo hasta abajo de la etiqueta body de cierre, de esta manera no bloqueará el render de la página.

- ¿Qué es un objeto JavaScript?
> Es una colección de datos que contienen propiedades (asociación entre pares llave-valor) y métodos. Cada elemento en un documento es un objeto manipulable gracias al DOM.

- ¿Qué es event bubbling y event capturing?
> Ambos son métodos de propagación de eventos en la API del DOM HTML. El event bubbling ocasiona que todos los eventos en los nodos hijo sean pasados a los nodos padre. En el event capturing el elemento exterior captura el evento y lo propaga hacia los elementos internos.

- ¿Qué es `this` en JavaScript y cómo ha cambiado el uso de `this` a partir de ES6?
> This es una palabra reservada que hace referencia al objeto  dueño del método.
>
>Su uso ha cambiado en particular con la implementación de las [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) las cuales no tienen su propio valor de `this` sino que hacen referencia al valor de `this` dentro del contexto de ejecución que la contiene.

- ¿Qué es una closure?
> Una función declarada dentro de otra función y que tiene acceso a su propia scope y a la de su función padre

- ¿Qué es el global namespace o espacio de nombres global?
> Un espacio de nombres es un "contenedor" para un conjunto de identificadores, funciones, métudos, etc. El espacio de nombres global es el "mas exterior", correspondiente al objeto global.

- Menciona dos paradigmas de programación importantes en JavaScript
> 1. Orientado a Objetos, soportado a través de la herencia por prototipos
> 2. Funcional

- ¿Qué es programación funcional?
> La programación funcional produce programas a través de la composición matemática de funciones y evita compartir su estado, así como mutación de datos y evitar efectos secundarios (funciones puras).

- ¿Qué diferencia hay entre herencia de clases y herencia por prototipos?
> **Herencia por clases:** Las instancias (objetos) heredan de clases (como un plano o descripción de la clase) y crean relaciones sub-clase: taxonomías de jerarquías de clases. Las instancias normalmente se instancian usando funciones contructor con la palabra reservada `new`. La herencia por clases puede o no usar la palabra reservada `class` de ES6.
>
> **Herencia por prototipos:** Las instancias heredan directamente de otros objetos, normalmente a través de funciones que implementan el patrón de diseño factory o usando `Object.create()`. Las instancias pueden estar compuestas de muchos objetos diferentes, permitiendo "herencia selectiva".

- ¿Cómo funciona la herencia por prototipos?
> Un objeto puede apuntar a otro y heredar todas sus propiedades. Todos los objetos en JavaScript tienen un enlace al objeto prototipo y cuando se quiere acceder a la propiedad de un objeto, dicha propiedad no sólo se buscará en el objeto sino también en su prototipo, el prototipo de su prototipo y así sucesivamente hasta que se encuentre o se llegue al fin de la cadena de prototipos.

- ¿Qué es two way data binding (o enlace de datos bidireccional) y el flujo de datos unidireccional y cómo se diferencían?
> El two way data binding significa que los campos en la UI están enlazados dinñamicamente a un modelo de datos de tal forma que cuando la UI cambia, el modelo de datos también cambia, y viceversa. Por ejemplo el framework Angular
>
> El flujo de datos unidireccional significa que el modelo es la única fuente de verdad. Los cambios en la UI mandan un mensaje de cambio de datos en el modelo (o store, en React) generado por el usuario. Únicamente el modelo tiene acceso a cambiar el estado de la aplicación. Esto hace que los datos fluyan en una única dirección. Por ejemplo el framework React.

- ¿Cuáles son los pros y contras de arquitecturas monolíticas vs arquitecturas orientadas a microservicios?
> Una arquitectura monolítica significa que la aplicación está escrita como una unidad de código con cohesión, cuyos componentes están diseñados para trabajar en conjunto, compartiendo el mismo espacio de memoria y recursos.
>
> **Pros de arq. monolítica:** Su mayor ventaja es que la mayoría de aplicaciones típicamente tienen un gran número de responsabilidades compartidas, como generación de bitácoras (logging), establecer límites de consumo (rate limitting) y funciones de seguridad, como auditorías y protección contra DOS.
>
> **Contras de arq. monolítica:** Los servicios monolíticos tienden a estar altamente acoplados y a medida que la aplicación evoluciona, se vuelve dificil aislar los servicios con objeto de brindarles indenendencia en cuanto a escalabilidad o mantenibilidad. También son mas difíciles de entender porque normalmente tienen muchas dependencias y efectos secundarios que no son tan obvios cuando se observa un servicio o controlador particular.
>
>
> **Pros de arq. microservicios:** Normalmente están mejor organizadas puesto que cada microservicio tiene un trabajo específico y no le debería de afectar el trabajo de los otros componentes. Están bajamente acoplados y son más fáciles de componer y reconfigurar para diferentes propósitos. También suelen tener mejor desempeño dependiendo de cómo estén organizados puesto que es posible (y común) que estén aislados y se puedan escalar independientemente del resto de la aplicación.
>
> **Contras de arq. microservicios:** Mientras se desarrolla una arquitectura de microservicios probablemente se vislumbren temas o asuntos que no estaban considerados originalmente en la etapa de diseño. También se crea un esfuerzo adicional para separar los módulos de acuerdo a responsabilidades, o encapsular responsabilidades compartidas en otra capa de servicio por la cual haya que rutear todo el tráfico. Normalmente los microservicios se despliegan en su propia VM o contenedor, causando mas trabajo en administrar dicha virtualización u orquestación de cluster contenedores.

- ¿Qué es la programación asíncrona y porqué es importante en JavaScript?
> La programación síncrona significa que,  exceptuando condicionales y llamadas a funciones, el código es ejecutado secuencialmente de arriba hacia abajo, generando bloqueos en tareas de larga ejecución, como peticiones a red o lectura/escrituda a disco.
>
> La programación asíncrona significa que la ejecución se realiza en un **bucle de eventos (event loop)**. Cuando se realiza una operación bloqueante (como las mencionadas anteriormente) la petición inicia y el código sigue ejecutándose sin generar bloqueos. Cuando la respuesta a la petición está lista, se genera una interrupción lo cual ocasiona que se ejecute un manejador de eventos (event handler), donde el flujo de control continúa. De esta forma, un único hilo de un programa puede manejar muchas operaciones concurrentes.
>
> Las UI son asíncronas por naturaleza, lo que significa que el servidor trabaja de la misma manera, esperando la respuesta de la red en un bucle y aceptando más peticiones entrantes mientras que se atiende la primera.
>
> Esto es importante en JavaScript porque incrementa el desempeño en el servidor y es un comportamiento "natural" en el código del cliente.