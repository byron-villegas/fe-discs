describe('Entrar en la pagina principal', () => {
  it('Utilizar la barra de búsqueda', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.xpath('//*[@id="navbarSupportedContent"]/div/i').click();
    cy.wait(2000);
    cy.xpath('//*[@id="search"]').type('31 Minutos');
    cy.wait(2000);
    cy.xpath('//*[@id="offcanvasBottom"]/div[2]/div/div/div[1]').should('exist');
    cy.wait(2000);
    cy.xpath('//*[@id="offcanvasBottom"]/div[2]/div/div/div[1]/div[1]/a/div/img').should('exist');
    cy.wait(2000);
    cy.xpath('//*[@id="offcanvasBottom"]/div[2]/div/div/div[1]/div[2]/a/h6').should('exist');
    cy.wait(2000);
    cy.xpath('//*[@id="offcanvasBottom"]/div[2]/div/div/div[1]/div[2]/span[1]').should('exist');
    cy.wait(2000);
    cy.xpath('//*[@id="offcanvasBottom"]/div[2]/div/div/div[1]/div[2]/span[2]').should('exist');
    cy.wait(2000);
    cy.xpath('//*[@id="offcanvasBottom"]/div[2]/div/div/div[1]/div[1]/a').click();
  });
});