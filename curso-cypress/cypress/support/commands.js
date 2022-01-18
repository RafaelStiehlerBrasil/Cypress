import loc from './locators'

Cypress.Commands.add('clickAlert',(locator, message) =>{
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, password) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(password)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('logout', () => {
    cy.get(loc.MENU.SETINGS).click()
    cy.get(loc.MENU.SAIR).click()
    cy.get(loc.MESSAGE).should('contain', 'Até Logo')
})

Cypress.Commands.add('resetSystem', (user, password) => {
    cy.get(loc.MENU.SETINGS).click()
    cy.get(loc.MENU.RESET).click()
})


Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body:{
            email: user,
            redirecionar: false,
            senha: password
        }

    }).its('body.token').should('not.be.empty')
    .then(token =>{
        return token
    })
})

Cypress.Commands.add('resetRest', (token) => {
    cy.request({
        method: 'GET',
        headers:{Authorization: `JWT ${token}`},
        url: '/reset',
    }).its('status').should('equal', 200)
})


Cypress.Commands.add('getIdConta', (token, nomeConta) => {
    cy.request({
        method: 'GET',
        headers:{Authorization: `JWT ${token}`},
        url: 'contas',
        qd:{
            nome: nomeConta
        }
    }).then(res => {
        return res.body[0].id
    })

})


Cypress.Commands.add('getDataAtual', () => {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual = dia + '/' + mes + '/' + ano;
    return dataAtual;
})
