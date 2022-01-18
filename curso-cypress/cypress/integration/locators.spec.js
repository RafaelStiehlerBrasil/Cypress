/// <reference types="cypress" />

describe('Work with elements', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
    })

    it('using xpath', () =>{
        cy.xpath('//input[contains(@onclick, \'Francisco\')]').click()
    })

})