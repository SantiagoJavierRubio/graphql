import log4js from 'log4js'
import { generateMockProducts } from '../logica/productos.js'

export const returnTestProducts = async (req, res) => {
    try {
        const prods = generateMockProducts(5)
        res.json(prods)
    } catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
    }
}