# Loggers y GZIP
Desafío entregable para el curso de backend de Coderhouse

## Para probar el código:

```bash
# Clonar el repositorio
$ git clone https://github.com/cabrerarodrigo/loggers.git

# Instalar dependencias
$ npm install

# Instalar librerías para realizar las pruebas (en caso de no tenerlas)
$ npm i -g pm2
$ npm i -g artillery
$ npm i -g 0x
```

### GZIP
```bash
# Iniciar el servidor sin GZIP
$ pm2 start index.js --name=sinGZIP --watch
# Iniciar el servidor con GZIP
$ pm2 start index.js --name=conGZIP --watch -- --puerto=5050 --gzip=true

# Finalizar pruebas
$ pm2 stop all
```

### Profiling

#### Sin consola
```bash
# Iniciar el profiling de node
$ node --prof index.js
# (renombrar el archivo creado a "sin_consola.log")

# En otra terminal iniciar artillery
$ artillery quick --count 20 -n 50 "http://localhost:8080/info" > sin_consola.txt

# Decodificar el profiling
$ node --prof-process sin-consola.log > prof_sin_consola.txt
```
#### Con consola
```bash
# Iniciar el profiling de node
$ node --prof index.js --puerto=5000 --consola=true
# (renombrar el archivo creado a "con_consola.log")

# En otra terminal iniciar artillery
$ artillery quick --count 20 -n 50 "http://localhost:5000/info" > con_consola.txt

# Decodificar el profiling
$ node --prof-process sin-consola.log > prof_con_consola.txt
```

### Con autocannon y 0x
```bash
# Con node inspect
$ node --inspect index.js
$ npm run test
# Con 0x
$ npm start0x
$ npm run test
```