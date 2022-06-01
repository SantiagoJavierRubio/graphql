import passport from 'passport'
import * as passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy
import getUserDAO from '../persistencia/Modelos/DAOs/Factories/UserDAOFactory.js'

const userDAO = getUserDAO()

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        userDAO.authorize(username, password)
            .then(user => {
                if(!user) return done(null, false)
                return done(null, user)
            })
            .catch(err => done(err))
        // Usuario.findOne({ email: username }, (err, user) => {
        //     if(err) return done(err)
        //     if(!user) return done(null, false)
        //     if(!checkPassword(user.password, password)) return done(null, false)
        //     return done(null, user)
        // })
    }
))
passport.use('register', new LocalStrategy(
    (username, password, done) => {
        userDAO.register(username, password)
            .then(user => {
                if(!user) return done(null, false)
                return done(null, user)
            })
            .catch(err => done(err))
        // Usuario.findOne({ email: username }, (err, user) => {
        //     if(err) return done(err)
        //     if(user) return done(null, false)
        //     const newUser = {
        //         email: username,
        //         password: encrypt(password)
        //     }
        //     Usuario.create(newUser, (err, userWithId) => {
        //         if(err) return done(err)
        //         return done(null, userWithId)
        //     })
        // })
    }
))
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    userDAO.getUser(id)
    .then(user => {
        done(null, user)
    })
    .catch(err => done(err))
})