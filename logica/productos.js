import { faker } from '@faker-js/faker'

export const generateMockProducts = (cant) => {
    const fakeProducts = []
    for(let i=0; i<cant; i++){
        fakeProducts.push({
            id: i,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.image()
        })
    }
    return fakeProducts
}