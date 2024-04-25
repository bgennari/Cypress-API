/// <reference types="cypress" />

describe ('Deletar Dispositivo DELETE', () => {


    it ('DELETE dispositivo especifico', () => {
        
        const body = {
            "name": "Celular do Bruno QA",
            "data": {
               "year": 2023,
               "price": 100.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
                      "owner": "QAZANDO"
            }
         }  
            cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postdeviceresult')
        
        // Pegando o resulto do cadastro
         cy.get('@postdeviceresult').then((response_post) => {
            expect(response_post.status).equal(200)
        
            //DELETE METHOD
        cy.request({
            method: 'DELETE',
            url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
            failOnStatusCode: false,
        }).as('deletedeviceresult')
         
        // validacoes do delete

        cy.get('@deletedeviceresult').then((response_del) => {
            expect(response_del.status).equal(200)
            expect(response_del.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
       
        })
        
    })

        })

        it ('DELETE 404 nao existente', () => {
        
            const id_inexistente = '5446bruno'

        //DELETE METHOD
            cy.request({
                method: 'DELETE',
                url: `/objects/${id_inexistente}`,
                failOnStatusCode: false,
            }).as('deletedeviceresult')
             
            // validacoes do delete
    
            cy.get('@deletedeviceresult').then((response_del) => {
                expect(response_del.status).equal(404)
                expect(response_del.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)
           
            })
            
        })
    
        it ('DELETE 405 {ID} is a reserved', () => {

        //DELETE METHOD
            cy.request({
                method: 'DELETE',
                url: '/objects/8',
                failOnStatusCode: false,
            }).as('deletedeviceresult')
             
            // validacoes do delete
    
            cy.get('@deletedeviceresult').then((response_del) => {
                expect(response_del.status).equal(405)
                expect(response_del.body.error).equal('8 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.')
           
            })
            
        })


})