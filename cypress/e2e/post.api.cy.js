/// <reference types="cypress" />

describe ('Cadastrar Dispositivo POST', () => {

        const dataatual = new Date().toISOString().slice(0, 16)

        const body = {
            "name": "Celular do Bruno",
            "data": {
               "year": 2024,
               "price": 100.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
                      "owner": "QAZANDO"
            }
         }

    it ('POST cadastrar um dispositivo', () => {
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postdeviceresult')

        // validacoes
        cy.get('@postdeviceresult')
        .then((response) => {


            expect(response.status).equal(200)
            expect(response.body.name).equal('Celular do Bruno')
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.data.year).equal(2024)
            expect(response.body.data.price).equal(100.99)
            expect(response.body.data['CPU model']).equal('Intel Core i9')
            expect(response.body.data['Hard disk size']).equal('1 TB')
            expect(response.body.data.owner).equal('QAZANDO')
            
            // buscando pela data e horario .slice + posicoes

            expect(response.body.createdAt.slice(0, 16)).equal(dataatual)

        
        })
    })

    it ('Cadastrar sem dados erro 400', () => {
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: ''
        }).as('postdeviceresult')

        // validacoes
        cy.get('@postdeviceresult')
        .then((response) => {


            expect(response.status).equal(400)
            expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })
    })
})