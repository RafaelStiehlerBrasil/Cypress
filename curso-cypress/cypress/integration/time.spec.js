/// <reference types="cypress" />

describe('Work with time', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () =>{
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '12/01/2022')

        const dt = new Date(2023,3,10,15,23,50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2023')

    })


    it('Goes to the future', () =>{

    })


})