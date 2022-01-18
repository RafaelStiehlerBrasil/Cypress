/// <reference types="cypress" />

describe('Desafio', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
    })


    it('Cadastro validando campos obrigatórios', () =>{
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        cy.get('#formNome').type('Rafael')
        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        cy.get('[data-cy="dataSobrenome"]').type('Stiehler')
        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
})