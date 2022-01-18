import loc from './locators'

Cypress.Commands.add('acessarMenuMovimentacao',() =>{
    cy.get(loc.MENU.MOVIMENTACAO).click()
})

Cypress.Commands.add('inserirMovimentacao',(descricao, valor, interessado) =>{
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type(descricao)
    cy.get(loc.MOVIMENTACAO.VALOR).type(valor)
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type(interessado)
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
})

Cypress.Commands.add('validarSaldo',(conta, saldo) =>{
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_SALDO_CONTA(conta)).should('contain', saldo)
})

Cypress.Commands.add('removerMovimentacao',(movimentacao) =>{
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_EXLUSAO_MOVIMENTACAO(movimentacao)).click()

})

