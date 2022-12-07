---
path: /react-custom-hooks
date: 2022-12-06
title: React Custom Hooks
tags: ['react', 'hooks', 'custom', 'localStorage', 'useEffect', 'useState']
excerpt: Compendio de custom hooks para React ⚛️🪝
image: ./hooks.png
---
# useLocalStorageState

Este custom hook sirve para crear una variable de estado que persista su valor en el `localStorage` del browser, aunque bien se podría implementar usando [AsyncStorage](https://github.com/react-native-async-storage/async-storage), [React Native KeyChain](https://github.com/oblador/react-native-keychain), [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) o alguna otra librería de almacenamiento

```javascript
  function useLocalStorageState(
    key,
    defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
  ) {
    const [state, setState] = React.useState(() => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })

    const prevKeyRef = React.useRef(key)

    React.useEffect(() => {
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey)
      }
      prevKeyRef.current = key
      window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])

    return [state, setState]
  }
```
Este custom hook recibe como parámetros la llave del valor que queremos guardar, el valor por defecto para inicializar la variable de estado a guardar, y opcionalmente un objeto con una propiedad `serialize` que debe ser nuestra función encargada de serializar el dato a guardar, y análogamente, una propiedad `deserialize` que debe ser nuestra función encargada de desserializar el dato. Como defecto se utiliza `JSON.stringify` y `JSON.parse` para estas.

Se crea el estado utilizando [lazy initializing](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates) del hook `useState` para aumentar un poco el desempeño por las operaciones de i/o en el `localStorage`.

Posteriormente se utiliza el hook `useEffect` para observar cambios en el state, comparando el estado previo con el actual y guardando dichos cambios en el `localStorage`.

Finalmente se retorna un array con el state persistido en localStorage y su función correspondiente para setearlo/establecerlo.
