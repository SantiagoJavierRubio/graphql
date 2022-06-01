import {getMessageDAO} from '../persistencia/Modelos/DAOs/Factories/MessageDAOFactory.js'
import normalizar from '../utils/normalizacion.js'

const messageDAO = getMessageDAO()

export const emitMessages = async (socket) => {
    const msjs = await messageDAO.getAll()
    return socket.emit('messageBoard', normalizar(msjs))
}

export const saveNewMessage = async (msg) => {
    await messageDAO.add(msg)
}