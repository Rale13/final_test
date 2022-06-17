/// <reference types="Cypress" />
import {createPage} from '../page_objects/createPage'
const faker = require('@faker-js/faker')

describe('create POM', () => {

    const createCredentials = {
        validName: faker.random.word(),
        validDescription: faker.random.word(),
        validImage: faker.image.avatar(),
        invalidImage: faker.image.nature(240, 150, true),
    }


    beforeEach('visit create page', () => {
        cy.loginViaBackend();
        cy.visit('/');
        createPage.createBtn.click();
        cy.url().should('include', '/create');
    })

    it('wrong format image', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('wrongFormat')

        createPage.create(
            createCredentials.validName,
            createCredentials.validDescription,
            createCredentials.invalidImage
        )
        createPage.errorMesage.should('be.visible')
        .and('have.text', 'Wrong format of image')

        cy.wait('@wrongFormat').then(interception => {
        expect(interception.response.statusCode).eq(422)

        })
    })

    it('add additional image input field', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('additionalFileds')

        createPage.addImageBtn.click();
        createPage.allGalleryInputButtonParents.should('have.length', 2)

    })

    it('move input fields', () => {
        createPage.imageInput.type(createCredentials.validImage);
        createPage.addImageBtn.click();
        createPage.downBtn.click();
    })

    it('remove image input field', () => {
        createPage.addImageBtn.click();
        createPage.trashBtn.click();
    })

    it('create gallery', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')


        let galleryId;
        createPage.create(
            createCredentials.validName,
            createCredentials.validDescription,
            createCredentials.validImage
        )
        cy.url().should('not.include', '/create');

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id;

            expect(interception.response.body.title).eq(createCredentials.validName)
            cy.visit(`/galleries/${galleryId}`);
            //cy.visit('galleries/'+ galleryId)
            cy.get('h1').should('have.text', createCredentials.validName)
        })
    })
})