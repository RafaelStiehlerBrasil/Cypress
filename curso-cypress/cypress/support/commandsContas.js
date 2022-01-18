import loc from './locators'

Cypress.Commands.add('acessarMenuConta',() =>{
    cy.get(loc.MENU.SETINGS).click()
    cy.get(loc.MENU.CONTA).click()
})

Cypress.Commands.add('criarConta',(conta) =>{
    cy.get(loc.CONTA.NOME).type(conta)
    cy.get(loc.CONTA.BTN_SALVAR).click()
})

Cypress.Commands.add('alterarConta',(conta, novoNova) =>{
    cy.xpath(loc.CONTA.FN_BTN_EDITAR(conta)).click()
    cy.get(loc.CONTA.NOME)
    .clear()
    .type(novoNova)
    cy.get(loc.CONTA.BTN_SALVAR).click()
})

Cypress.Commands.add('excluirConta',(conta) =>{
    cy.xpath(loc.CONTA.FN_BTN_EXCLUIR(conta)).click()
})

