/// <reference types="Cypress" />

import {allGalleries} from '../page_objects/allGaleries'

describe('create POM', () => {

    let filterText = "Test galerija"
    let galleryId;

    beforeEach('visit login page', () => {
        cy.visit('/')
        cy.get('.cell').should('have.length', 10);
    })

    it('check pagination', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=2&term='
        }).as('loadMore')

        allGalleries.loadMoreBtn;
        cy.get('.cell').should('have.length', 20);

        cy.wait('@loadMore').then(interception => {
            expect(interception.response.statusCode).eq(200);
        })
    })

    it('find specific gallery by name and open it', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries/115'
        }).as('specificGallery')
        
        
        allGalleries.findGallery(filterText);
        cy.get('.cell').should('have.length', 1);
        allGalleries.galleryTitle;

        cy.wait('@specificGallery').then(interception => {
            galleryId = interception.response.body.id;
            expect(interception.response.body.title).eq(filterText);
            cy.url().should('include', `/galleries/${galleryId}`)
        })

    })

    it('open first gallery through title', () => {
        allGalleries.galleryTitle;
        cy.url().should('include', '/galleries')
    })

    it('get all galleries from one author', () => {
        allGalleries.galleryAuthor;
        cy.url().should('include', '/authors')
    })

    
})