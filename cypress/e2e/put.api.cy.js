/// <reference types="cypress" />



describe ('Atualizar Dispositivo test PUT', () => {

    const dataatual = new Date().toISOString().slice(0, 16)


    it ('Atualizar dispositivo especifico', () => {
        
        const body_cadastro = {
            "name": "Celular do Bruno QA",
            "data": {
               "year": 2022,
               "price": 100.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
                      "owner": "QAZANDO"
            }
         }  

         const body_update = {
            "name": "Celular do Bruno QA - UPDATE",
            "data": {
               "year": 2024,
               "price": 1999.99,
               "CPU model": "Intel PUT",
               "Hard disk size": "3 PUT",
                      "owner": "PUT ALTERANDO QAZANDO"
            }
         }  

            cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro
        }).as('postdeviceresult')
        
        // Pegando o resulto do cadastro
         cy.get('@postdeviceresult').then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal('Celular do Bruno QA')
        
            //PUT METHOD
        cy.request({
            method: 'PUT',
            url: `/objects/${response_post.body.id}`,
            failOnStatusCode: false,
            body:body_update
            }).as('putdeviceresult')
         
        // validacoes do PUT

        cy.get('@putdeviceresult').then((response_put) => {
            expect(response_put.status).equal(200)
            expect(response_put.body.name).equal('Celular do Bruno QA - UPDATE')
            expect(response_put.body.data.owner).equal('PUT ALTERANDO QAZANDO')
            expect(response_put.body.data['CPU model']).equal('Intel PUT')
            expect(response_put.body.data['Hard disk size']).equal('3 PUT')

            // buscando pela data e horario .slice + posicoes
            expect(response_post.body.createdAt).not.empty
            expect(response_post.body.createdAt.slice(0, 16)).equal(dataatual)

       
        })
        
    })

        })
    })