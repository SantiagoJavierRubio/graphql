import passport from 'passport'
import * as passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy
import {checkPassword, encrypt} from '../utils/passwordEncryption.js'
import Usuario from '../persistencia/Modelos/usuario.js'

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        Usuario.findOne({ email: username }, (err, user) => {
            if(err) return done(err)
            if(!user) return done(null, false)
            if(!checkPassword(user.password, password)) return done(null, false)
            return done(null, user)
        })
    }
))
passport.use('register', new LocalStrategy(
    (username, password, done) => {
        Usuario.findOne({ email: username }, (err, user) => {
            if(err) return done(err)
            if(user) return done(null, false)
            const newUser = {
                email: username,
                password: encrypt(password)
            }
            Usuario.create(newUser, (err, userWithId) => {
                if(err) return done(err)
                return done(null, userWithId)
            })
        })
    }
))
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    Usuario.findById(id, done)
})