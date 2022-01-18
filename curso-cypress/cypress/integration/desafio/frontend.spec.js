/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import '../../support/commandsMovimentacao'
import buildEnv from '../../support/buildEnv'

describe('Testes backend', () => {
    beforeEach(() => {
        buildEnv()
        cy.login('rafinha_stil@hotmail.com', 'Stila@2021')
        cy.get(loc.MENU.HOME).click
        
    })

    it('Deve inserir conta', () =>{
        cy.route({
            method:'POST',
            url: '/contas',
            response:{id: 3,nome: 'teste 123',visivel: true,usuario_id: 1}
        }).as('Savecontas')

        cy.acessarMenuConta()
        cy.route({
            method:'GET',
            url: '/contas',
            response: [
                {id: 1,nome: 'Carteira',visivel: true,usuario_id: 1},
                {id: 2,nome: 'Banco',visivel: true,usuario_id: 1},
                {id: 3,nome: 'teste 123',visivel: true,usuario_id: 1}
            ]
        }).as('contasSave')
        cy.criarConta('teste 123')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Deve alterar conta', () =>{
        cy.route({
            method:'PUT',
            url: '/contas/**',
            response:{id: 1,nome: 'Conta Alterada',visivel: true,usuario_id: 1}
        }).as('alteracaoConta')

        cy.acessarMenuConta()
        cy.alterarConta('Carteira','Conta Alterada')
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Deve validar conta duplicada', () =>{
        cy.route({
            method:'POST',
            url: '/contas',
            response:{"error": "Já existe uma conta com esse nome!"},
            status:400
        }).as('SaveContaMesmoNome')

        cy.acessarMenuConta()
        cy.criarConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    afterEach(() => {
        cy.resetSystem()
        cy.clearLocalStorage()
    })

})