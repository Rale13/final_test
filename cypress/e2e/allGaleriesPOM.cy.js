/// <reference types="Cypress" />

import {allGalleries} from '../page_objects/allGaleries'

describe('create POM', () => {

    let filterText = "Test galerija"

    before('visit login page', () => {
        cy.visit('/')
        cy.get('.cell').should('have.length', 10);
    })

    it('check pagination', () => {
        allGalleries.pagination;
        cy.get('.cell').should('have.length', 10);
    })

    it('find specific gallery', () => {
        allGalleries.findGallery(filterText);
        cy.get('.cell').should('have.length', 1);
        
    
    })
})