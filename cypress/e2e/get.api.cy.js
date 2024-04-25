/// <reference types="cypress" />

describe ('Buscar dispositivos GET', () => {


        const device_id = '7'

    it ('Buscar dispositivo especifico name', () => {
        cy.request('GET', '/objects/7', {name: 'Apple MacBook Pro 16'})
    })

    it ('Buscar dispositivo especifico', () => {
        cy.request({
            method: 'GET',
            url: `/objects/${device_id}`,
            failOnStatusCode: false
        }).as('getdeviceresult')
            
        //Validacoes
        cy.get('@getdeviceresult')
        .then((response) => {


            expect(response.status).equal(200)
            expect(response.body.id).equal(device_id)
            expect(response.body.name).equal('Apple MacBook Pro 16')
            expect(response.body.data).not.empty
            
            expect(response.body.data.year).not.string
            expect(response.body.data.year).equal(2019)

            expect(response.body.data.price).not.string
            expect(response.body.data.price).equal(1849.99)

            expect(response.body.data['CPU model']).not.empty
            expect(response.body.data['CPU model']).equal('Intel Core i9')
            
            expect(response.body.data['Hard disk size']).not.empty
            expect(response.body.data['Hard disk size']).equal('1 TB')

        })


    })

})