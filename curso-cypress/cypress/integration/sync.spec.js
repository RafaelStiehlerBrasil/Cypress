/// <reference types="cypress" />

describe('Sync', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Deve aguardar elemento estar disponível', () =>{
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retrys', () =>{
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
        .should('exist')
        .type('funciona')
    })

    it('Uso do find', () =>{
        cy.get('#buttonList').click()
        
        cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 1')

        cy.get('#lista li span')
        .should('contain', 'Item 2')       
    })

    it('Uso do timeout', () =>{
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', {timeout: 10000})
        .should('exist')     
    })

    it('Should vs Then', () =>{
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span').then($el =>{
            expect($el).to.have.length(1)
        })
    })


})
