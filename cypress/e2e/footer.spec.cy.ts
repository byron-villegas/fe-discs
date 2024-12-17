describe('Entrar en la pagina principal', () => {
    it('Valiar que posea el brand logo', () => {
        cy.visit('/');
        cy.wait(2000);
        cy.xpath('//*/footer/div/div/img').should('be.visible');
    });
    it('Validar que el brand del footer posea los años seteados correctamente', () => {
        const currentYear = (new Date()).getFullYear();

        cy.visit('/');
        cy.wait(2000);
        cy.xpath(`*//footer/div[1]/div[1]/small[text()='© ${currentYear} – ${currentYear + 1}']`).should('exist');
    });
    it('Validar que el footer contenga las secciones correspondientes', () => {
        const sectionOptions = ['MENÚ', 'ENLACES ÚTILES', 'SOBRE'];

        cy.visit('/');
        cy.wait(2000);

        sectionOptions.forEach(section => {
            cy.xpath(`*//footer/div/div/h5[text()='${section}']`).should('exist');
            cy.wait(2000);
        });
    });
    it('Validar que el footer en la seccion menu posea las siguientes opciones correspondientes', () => {
        const aboutOptions = ['HOME'];

        cy.visit('/');
        cy.wait(2000);

        aboutOptions.forEach(option => {
            cy.xpath(`*//footer/div/div/ul/li/a[text()='${option}']`).should('exist');
            cy.wait(2000);
        });
    });
    it('Validar que el footer en la seccion sobre posea las siguientes opciones correspondientes', () => {
        const aboutOptions = ['QUIENES SOMOS', 'CONTÁCTANOS'];

        cy.visit('/');
        cy.wait(2000);

        aboutOptions.forEach(option => {
            cy.xpath(`*//footer/div/div/ul/li/a[text()='${option}']`).should('exist');
            cy.wait(2000);
        });
    });
    it('Validar que el footer contenga el copyright definido', () => {
        const currentYear = (new Date()).getFullYear();

        cy.visit('/');
        cy.wait(2000);

        cy.xpath(`*//footer/div/p[text()='Copyright © ${currentYear}. Todos los derechos reservados. Desarrollado por Byron Villegas Moya']`).should('exist');
        cy.wait(2000);
    });
});