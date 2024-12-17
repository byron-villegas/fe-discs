describe('Entrar en la pagina principal', () => {
  it('Validar que el titulo sea Discs', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.title().should('eq', 'Discs');
    cy.wait(2000);
  });
  it('Validar que contenga la seccion categorias', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.xpath('*//app-home-categories').should('exist');
    cy.xpath('*//app-home-categories/main/h2').should('have.text', 'CATEGORIAS');
    cy.wait(2000);
  });
  it('Validar que la seccion categorias contenga sus opciones correspondientes', () => {
    const categoriesOptions = ['VINILOS', 'CDS', 'CASSETTES']

    cy.visit('/');
    cy.wait(2000);

    categoriesOptions.forEach(option => {
      cy.xpath(`*//app-home-categories/main/div/div/a/h3/strong[text()='${option}']`).should('exist');
      cy.wait(2000);
    });
  });
  it('Validar que contenga la seccion discos favoritos', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.xpath('*//app-home-favorite-discs').should('exist');
    cy.xpath('*//app-home-favorite-discs/div/h2/strong').should('have.text', 'NUESTROS DISCOS FAVORITOS');
    cy.wait(2000);
  });
  it('Validar que la seccion discos favoritos contenga discos', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div').children().should('have.length.greaterThan', 0);
    cy.wait(2000);
  });
});