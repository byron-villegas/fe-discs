describe('Visualizo seccion discos favoritos', () => {
    it('Valido que el primer disco posea sus caracteristicas', () => {
        cy.visit('/');
        cy.wait(2000);
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[1]/a/div/img').should('be.visible');
        cy.wait(2000);
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/a/small/strong').should('exist');
        cy.wait(2000);
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/a/small/strong').should('not.be.empty');
        cy.wait(2000);
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/small[1]').should('exist');
        cy.wait(2000);
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/small[1]').should('not.be.empty');
        cy.wait(2000);
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/small[2]').should('exist');
        cy.wait(2000);
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/small[2]').should('not.be.empty');
        cy.wait(2000);
    });
});

describe('Selecciono el primer disco', () => {
    it('Valido las caracteristicas del disco seleccionado', () => {
        cy.visit('/');
        cy.wait(2000);

        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/a/small/strong').invoke('text').then(text => { return text }).as('discName');
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/small[1]').invoke('text').then(text => { return text }).as('discAuthor');
        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div/div[1]/div/div[2]/small[2]').invoke('text').then(text => { return text }).as('discCreatedYear');

        cy.xpath('*//app-home-favorite-discs/div/app-disc-list/div/div').children().first().click();
        cy.wait(2000);

        cy.xpath('*//app-disc-view/div[2]/div/div[1]/div[1]/div/div[1]/img').should('exist');
        cy.wait(2000);
        cy.xpath('*//app-disc-view/div[2]/div/div[1]/div[1]/div/div[1]/img').should('be.visible');
        cy.wait(2000);

        cy.xpath('*//app-disc-view/div[2]/div/div[1]/div[2]/div[2]/img').click();
        cy.wait(2000);
        cy.xpath('*//app-disc-view/div[2]/div/div[1]/div[1]/div/div[1]/img').should('not.be.visible');
        cy.wait(2000);
        cy.xpath('*//app-disc-view/div[2]/div/div[1]/div[1]/div/div[2]/img').should('be.visible');
        cy.wait(2000);

        cy.xpath('*//app-disc-view/div[2]/div/div[2]/small').should('exist');
        cy.wait(2000);
        cy.xpath('*//app-disc-view/div[2]/div/div[2]/small').should('not.be.empty');
        cy.wait(2000);

        cy.xpath('*//app-disc-view/div[2]/div/div[2]/ngx-barcode').should('exist');
        cy.wait(2000);
        
        cy.url().then(url => {
            const sku = url.split('disc/')[1];

            cy.xpath('*//app-disc-view/div[2]/div/div[2]/span[2]').should('contain.text', sku);
            cy.wait(2000);
        });

        cy.xpath('*//app-disc-view/div[2]/div/div[2]/h3/strong').invoke('text').then(title => {
            cy.title().should('eq', title + ' – Discs');
            cy.wait(2000);

            cy.get('@discName').then(discName => {
                cy.xpath('*//app-disc-view/div[2]/div/div[2]/h3/strong').should('contain.text', discName);
                cy.wait(2000);
            });

            cy.get('@discAuthor').then(discAuthor => {
                cy.xpath('*//app-disc-view/div[2]/div/div[2]/h3/strong').should('contain.text', discAuthor);
                cy.wait(2000);
                cy.xpath('*//app-disc-view/div[2]/div/div[2]/span[3]').should('contain.text', discAuthor);
                cy.wait(2000);
            });
            cy.get('@discCreatedYear').then(discCreatedYear => {
                cy.xpath('*//app-disc-view/div[2]/div/div[2]/span[5]').should('contain.text', discCreatedYear);
                cy.wait(2000);
            });
        });

        cy.xpath('*//app-disc-view/div[2]/div/div[2]/qrcode').should('exist');
        cy.wait(2000);
    });
})