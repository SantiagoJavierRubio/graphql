# GraphQl
Desafío entregable para el curso de backend de Coderhouse

## Para probar el código:

```bash
# Clonar el repositorio
$ git clone https://github.com/cabrerarodrigo/graphql.git

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

```bash
# Con el servidor iniciado en el modo que se quiera probar:
$ npm run test
```

#### Los reportes para cada uno de los métodos de persistencia se encuentran en el directorio tests/reports