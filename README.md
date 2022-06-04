# Probando la API Rest
Desafío entregable para el curso de backend de Coderhouse

## Para probar el código:

```bash
# Clonar el repositorio
$ git clone https://github.com/cabrerarodrigo/probando-api-rest.git

# Instalar dependencias
$ npm install

# Iniciar el servidor con los diferentes modos de persistencia
$ npm start # --> Por defecto con MongoDB
$ PERSISTENCIA=firebase node index.js # --> FIREBASE
$ PERSISTENCIA=memory node index.js # --> memoria


# Alternativamente se puede usar con nodemon, con los comandos:
$ npm run dev # --> Por defecto con MongoDB
$ npm run dev:firebase # --> firebase
$ npm run dev:memory # --> memoria
```

## Para realizar las pruebas implementadas: 

- Prueba cliente:
    - Visitar http://localhost:8080/pruebas
    - Las pruebas se imprimiran por la consola de ejecución del servidor

- Pruebas con mocha/chia/supertest
```bash
$ npm run test
```