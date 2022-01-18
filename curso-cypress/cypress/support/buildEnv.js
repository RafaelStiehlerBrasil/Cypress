const buildEnv=() =>{
    cy.server()

    cy.route({
        method:'POST',
        url: '/signin',
        response:{id:1000,nome: 'usuario fake',token: 'Uma String muito grande que nao deveria ser aceito'
        }
    }).as('signin')

    cy.server()
    cy.route({
        method:'GET',
        url: '/saldo',
        response: [
            {conta_id:999,conta: 'Carteira',saldo: '100.00'},
            {conta_id:9909,conta: 'Banco',saldo: '1000000.00'}
        ]
    }).as('saldo')

    cy.route({
        method:'GET',
        url: '/contas',
        response: [
            {id: 1,nome: 'Carteira',visivel: true,usuario_id: 1},
            {id: 2,nome: 'Banco',visivel: true,usuario_id: 1}
        ]
    }).as('contas')



}

export default buildEnv