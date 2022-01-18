/// <reference types="cypress" />

describe('Work with elements', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
    })
    it('Text', () =>{
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () =>{
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')        
        
        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () =>{
        cy.get('#formNome')
        .type('Cypress Test')
        .should('value', 'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
        .type('teste 123')
        .should('value', 'teste 123')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
        .type('teste 321')
        .should('value', 'teste 321')

        cy.get('#elementosForm\\:sugestoes')
        .clear()
        .type('Erro{selectall}acerto')
        .should('value', 'acerto')

    })

    it('RadioButton', () =>{
        cy.get('#formSexoMasc')
        .click()
        .should('be.checked')
        cy.get('#formSexoFem').should('not.be.checked')

    })

    it('Checkbox', () =>{
        cy.get('#formComidaPizza')
        .click()
        .should('be.checked', true)

        cy.get('[name=formComidaFavorita]')
        .click({multiple:true})

        cy.get('#formComidaPizza')
        .should('not.be.checked', true)
    })

    it('ComboBox', () =>{

        cy.get('[data-test="dataEscolaridade"]')
        .select('2o grau completo')
        .should('have.value', '2graucomp')

        cy.get('[data-test="dataEscolaridade"] option')
        .should('have.length', 8)
        cy.get('[data-test="dataEscolaridade"] option').then($arr => {
            const values = []
            $arr.each(function(){
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })

    })

    it.only('ComboBox Multiple', () =>{
        cy.get('[data-testid="dataEsportes"]').select(['natacao', 'Corrida'])
        
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida'])
            expect($el.val()).to.have.length(2)
        })

        cy.get('[data-testid="dataEsportes"]').invoke('val').should('eql', ['natacao', 'Corrida'])
    })


})
