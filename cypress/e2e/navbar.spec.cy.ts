describe('Entrar en la pagina principal', () => {
    it('Valiar que posea el brand logo', () => {
        cy.visit('/');
        cy.wait(2000);

        cy.xpath('//*/nav/div/a/img').should('be.visible')

        cy.wait(2000);
    });
    it('Validar que el nav contenga las opciones correspondientes', () => {
        const navbarOptions = ['HOME', 'QUIENES SOMOS', 'CONTÁCTANOS'];

        cy.visit('/');
        cy.wait(2000);

        navbarOptions.forEach(option => {
            cy.xpath(`//*/nav/div/div/ul/li/a/strong[text()='${option}']`).should('exist');
            cy.wait(2000);
        });
    });
    it('Validar que el nav al momento de entrar a la pagina posea la opcion HOME activada', () => {
        const option = 'HOME';

        cy.visit('/');
        cy.wait(2000);

        cy.xpath(`//*/nav/div/div/ul/li/a/strong[text()='${option}']`).parent().should('have.class', 'active');
        cy.wait(2000);
    });
});
describe('Entrar en la pagina quienes somos', () => {
    it('Validar que el nav al momento de entrar a la pagina posea la opcion QUIENES SOMOS activada', () => {
        const option = 'QUIENES SOMOS';

        cy.visit('/#/about-us');
        cy.wait(2000);

        cy.xpath(`//*/nav/div/div/ul/li/a/strong[text()='${option}']`).parent().should('have.class', 'active');
        cy.wait(2000);
    });
    it('Validar que el nav al momento de entrar a la pagina el titulo sea quienes somos', () => {
        cy.visit('/#/about-us');
        cy.wait(2000);
        cy.title().should('eq', 'Quienes Somos – Discs');
        cy.wait(2000);
    });
});

describe('Entrar en la pagina contactanos', () => {
    it('Validar que el nav al momento de entrar a la pagina posea la opcion CONTÁCTANOS activada', () => {
        const option = 'CONTÁCTANOS';

        cy.visit('/#/contact-us');
        cy.wait(2000);

        cy.xpath(`//*/nav/div/div/ul/li/a/strong[text()='${option}']`).parent().should('have.class', 'active');
        cy.wait(2000);
    });
    it('Validar que el nav al momento de entrar a la pagina el titulo sea quienes somos', () => {
        cy.visit('/#/contact-us');
        cy.wait(2000);
        cy.title().should('eq', 'Contáctanos – Discs');
        cy.wait(2000);
    });
});