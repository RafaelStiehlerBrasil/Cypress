const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },

    MESSAGE: '.toast-message', 

    MENU: {
        HOME: '[data-test="menu-home"]',
        SETINGS: '[data-test="menu-settings"]',
        CONTA: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',
        EXTRATO: '[data-test="menu-extrato"]',
        SAIR: '[href="/logout"]'
    },

    CONTA: {
        NOME: '[data-test="nome"]',
        BTN_SALVAR: '.btn',
        FN_BTN_EDITAR: (conta)=>`//table//td[contains(.,'${conta}')]/..//i[@class='far fa-edit']`,
        FN_BTN_EXCLUIR: (conta)=>`//table//td[contains(.,'${conta}')]/..//i[@class='far fa-trash-alt']`
    },

    SALDO: {
        FN_SALDO_CONTA: (nome)=>`//td[contains(.,'${nome}')]/../td[2]`    
    },

    EXTRATO: {
        FN_EXLUSAO_MOVIMENTACAO: (movimentacao)=>`//li[contains(.,'${movimentacao}')]//i[@class='far fa-trash-alt']`
    },
    
    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    }


}

export default locators;