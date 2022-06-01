import UserFirebaseDAO from '../Users/usersFirebase.js'
import UserMongoDAO from '../Users/usersMongo.js'
import UserMemDAO from '../Users/usersMem.js'
import { variables } from '../../../../config.js'

const getUserDAO = () => {
    let userDAO

    switch(variables.TIPO_PERSISTENCIA) {
        case 'firebase':
            userDAO = new UserFirebaseDAO()
            break
        case 'mongo':
            userDAO = new UserMongoDAO()
            break
        case 'memory':
        default:
            userDAO = new UserMemDAO()
    }

    return userDAO
}

export default getUserDAO