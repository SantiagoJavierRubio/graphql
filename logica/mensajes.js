import { mensajes } from '../persistencia/daos/firebase.js'
import normalizar from '../utils/normalizacion.js'

export const emitMessages = async (socket) => {
    const msjs = await mensajes.getAll()
    return socket.emit('messageBoard', normalizar(msjs))
}

export const saveNewMessage = async (msg) => {
    await mensajes.save(msg)
}