/// <reference types="Cypress" />

import {allGalleries} from '../page_objects/allGaleries'

describe('create POM', () => {

    let filterText = "Test galerija"

    beforeEach('visit login page', () => {
        cy.visit('/')
        cy.get('.cell').should('have.length', 10);
    })

    it('check pagination', () => {
        allGalleries.loadMoreBtn;
        cy.get('.cell').should('have.length', 20);
    })

    it('find specific gallery by name and open it', () => {
        allGalleries.findGallery(filterText);
        cy.get('.cell').should('have.length', 1);
        allGalleries.galleryTitle;
    })

    it('get all galleries title', () => {
        cy.get(allGalleries.title);
        allGalleries.title.should('have.text', 'All Galleries')
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