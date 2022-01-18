/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import '../../support/commandsMovimentacao'

describe('Testes funcionais', () => {
    before(() => {
        cy.login('rafinha_stil@hotmail.com', 'Stila@2021')
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click
    })

    it('Deve inserir conta', () =>{
        cy.acessarMenuConta()
        cy.criarConta('teste 123')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Deve alterar conta', () =>{
        cy.acessarMenuConta()
        cy.alterarConta('Conta para alterar','Conta Alterada')
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Deve validar conta duplicada', () =>{
        cy.acessarMenuConta()
        cy.criarConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'Erro')
    })

    it('Deve exluir conta', () =>{
        cy.acessarMenuConta()
        cy.excluirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'Conta excluída com sucesso!')
    })

    it('Deve inserir movimentação e validar saldo', () =>{
        cy.acessarMenuMovimentacao()
        cy.inserirMovimentacao('teste 123', '100', 'rafael')
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        cy.validarSaldo('Conta para alterar', '100')
    })

    it('Deve remover movimentação', () =>{
        cy.acessarMenuMovimentacao()
        cy.removerMovimentacao('Movimentacao para extrato')
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })

    afterEach(() => {
        cy.resetSystem()
        cy.clearLocalStorage()
    })

})