/// <reference types="cypress" />

describe('Helpers...', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Wrap...', () =>{
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')
        
        cy.get('#formNome').then($el => {
            cy.wrap($el).type('funciona') 
        })

    })

    it('Its...', () =>{
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('equal', 'User')

        const obj2 = {nome: 'User', idade: 20, endereco: {rua: 'teste'}}
        cy.wrap(obj2).its('endereco').should('property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('equal', 'teste')
        cy.wrap(obj2).its('endereco.rua').should('equal', 'teste')

        cy.title().its('length').should('equal', 20)
    })

    it.only('Invoke...', () =>{
        const getValue = () => 1
        const soma = (a,b) => a + b
        cy.wrap({fn: getValue}).invoke('fn').should('equal', 1)
        cy.wrap({fn: soma}).invoke('fn', 2,2).should('equal', 4)
        cy.get('#formNome').invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'teste 123')
        cy.get('#resultado').invoke('html', '<input type="button" value="teste invoke"/>')
    })

})
