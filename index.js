// Server setup
import express from 'express'
import { Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'
import MongoStore  from 'connect-mongo'
import apiRoutes from './rutas/api.js'
import userRoutes from './rutas/users.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://RodrigoCabrera:Hockeyrestapuma1@cluster0-shard-00-00.obp4y.mongodb.net:27017,cluster0-shard-00-01.obp4y.mongodb.net:27017,cluster0-shard-00-02.obp4y.mongodb.net:27017/coderhouse?ssl=true&replicaSet=atlas-9tzx2f-shard-0&authSource=admin&retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 'eunsecreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*10
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// Workaround porque no funcionaba __dirname al trabajar en módulos (creo)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// HBS setup
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts"
}))
app.set('views', './views')
app.set('view engine', 'hbs')

// Request handlers
const checkAuth = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}
app.get('/', checkAuth, (req, res) => {
    res.render('main.hbs', {username: req.user.email})
})
app.get('/login', (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('main.hbs', {username: req.user.email})
    }
    res.render('login.hbs')
})
app.get('/register', (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('main.hbs', {username: req.user.email})
    }
    res.render('register.hbs')
})
app.get('/logout', checkAuth, (req, res) => {
    res.render('logout.hbs', {username: req.user.email})
    req.logout()
})

app.use('/api', apiRoutes)
app.use('/users', userRoutes)

// DAOs import
import { mensajes } from './daos/firebase.js'

// Socket handlers
import normalizar from './utils/normalizacion.js'

io.on('connection', async socket => {
    console.log(`User connected with socket id: ${socket.id}`)
    const msjs = await mensajes.getAll()
    socket.emit('messageBoard', normalizar(msjs))
    socket.on('userMessage', async (msg) => {
        await mensajes.save(msg)
        const msjs = await mensajes.getAll()
        socket.emit('messageBoard', normalizar(msjs))
    })
})

const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://RodrigoCabrera:Hockeyrestapuma1@cluster0-shard-00-00.obp4y.mongodb.net:27017,cluster0-shard-00-01.obp4y.mongodb.net:27017,cluster0-shard-00-02.obp4y.mongodb.net:27017/coderhouse?ssl=true&replicaSet=atlas-9tzx2f-shard-0&authSource=admin&retryWrites=true&w=majority',)
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (err) => {
    console.error(`Server error: ${err}`)
})