/// <reference types="cypress" />

describe('Dinamic tests', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const comida = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    comida.forEach(food => {
        it(`Cadastro com comida ${food}`, () =>{
            cy.get('#formNome').type('Rafael')
            cy.get('[data-cy="dataSobrenome"]').type('Stiehler')
            cy.get(`[name=formSexo][value=M`).click()
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click
            cy.get('[data-test="dataEscolaridade"]').select('superior')
            cy.get('[data-testid="dataEsportes"]').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    
    })

    it.only(`Cadastro multiplas comidas`, () =>{
        cy.get('#formNome').type('Rafael')
        cy.get('[data-cy="dataSobrenome"]').type('Stiehler')
        cy.get(`[name=formSexo][value=M`).click()

        //cy.get(`[name=formComidaFavorita]`).click({multiple:true})
        cy.get(`[name=formComidaFavorita]`).each($el => {
            if($el.val() !=  'vegetariano')
            cy.wrap($el).click()
        })
        
        cy.get('[data-test="dataEscolaridade"]').select('superior')
        cy.get('[data-testid="dataEsportes"]').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        //cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })

})