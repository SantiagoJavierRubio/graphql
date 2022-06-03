import DBClient from "./db.js";
import admin from 'firebase-admin'
import { firebaseData } from '../../../config.js'

class FirebaseClient extends DBClient {
    constructor() {
        super()
    }

    static admin = admin.initializeApp({
        credential: admin.credential.cert(firebaseData),
        databaseURL: "https://basedeprueba-8e5c0.firebaseio.com"
      });

    async connect() {
        try {
            this.db = admin.firestore()
            this.connected = true
        }
        catch(err) {
            throw new Error(`Error al conectar con Firebase: ${err}`)
        }
    }
    async disconnect() {
        try {
            this.db.terminate()
            this.connected = false
        }
        catch(err) {
            throw new Error(`Error al desconectar con Firebase: ${err}`)
        }
    }
}

export default FirebaseClient