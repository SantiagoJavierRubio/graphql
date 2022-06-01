# Arquitectura en capas - Segunda entrega
Desafío entregable para el curso de backend de Coderhouse

## Para probar el código:

```bash
# Clonar el repositorio
$ git clone https://github.com/cabrerarodrigo/arquitectura_de_capas.git

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

## TO DO:
- Implementación del patrón Repository sobre los DAOs de Mensaje y Productos
- Reimplementación de las rutas de productos para pruebas