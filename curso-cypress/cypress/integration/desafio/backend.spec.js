/// <reference types="cypress" />
describe('Testes backend', () => {
    let token
    let dataAtual
    before(() => {
        cy.getToken('rafinha_stil@hotmail.com','Stila@2021').then(tkn => {
            token = tkn
        })
    })

    beforeEach(() => {
        cy.resetRest(token)
    })


    it('Deve inserir conta', () =>{
        cy.request({
            method: 'POST',
            headers:{Authorization: `JWT ${token}`},
            url: '/contas',
            body:{
                nome: "teste novo 12"
            }
        }).as('response')
            
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'teste novo 12')
            
        })    
        
    })

    it('Deve alterar conta', () =>{
        cy.getIdConta(token, 'Conta para alterar').then(contaID => {
            cy.request({
                method: 'PUT',
                headers:{Authorization: `JWT ${token}`},
                url: `/contas/${contaID}`,
                body:{
                    nome: "conta alterada via rest"
                }
            }).as('response')
            cy.get('@response').its('status').should('equal', 200)
        })
        
    })

    it('Deve validar conta duplicada', () =>{
        cy.request({
            method: 'POST',
            headers:{Authorization: `JWT ${token}`},
            url: '/contas',
            body:{
                nome: "Conta mesmo nome"
            },
            failOnStatusCode:false
        }).as('response')
            
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).equal('Já existe uma conta com esse nome!')
        })    
    })

    it('Deve exluir conta', () =>{
        cy.getIdConta(token, 'Conta para alterar').then(contaID => {
            cy.request({
                method: 'DELETE',
                headers:{Authorization: `JWT ${token}`},
                url: `/contas/${contaID}`,
            }).as('response')
            cy.get('@response').its('status').should('equal', 204)
        })
    })

    it('Deve inserir movimentação', () =>{
        cy.getDataAtual().then(ret =>{dataAtual=ret})

        cy.getIdConta(token, 'Conta para movimentacoes').then(contaID => {
            cy.request({
                method: 'POST',
                headers:{Authorization: `JWT ${token}`},
                url: `/transacoes`,
                body:{
                    conta_id: contaID,
                    data_pagamento: dataAtual,
                    data_transacao: dataAtual,
                    descricao: "teste qa",
                    envolvido: "rafael",
                    status: true,
                    tipo: "REC",
                    valor: "200"
                }
            }).as('response')
            cy.get('@response').its('status').should('equal', 201)
            cy.get('@response').its('body.id').should('exist')
        })
    })

    it('Deve validar saldo', () =>{
        cy.request({
            method: 'GET',
            headers:{Authorization: `JWT ${token}`},
            url: '/saldo',
        })
        .then(res => {
            let saldoConta =null
            res.body.forEach(c =>{
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).equal('534.00')
        })
    })

})