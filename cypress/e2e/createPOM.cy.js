/// <reference types="Cypress" />
import {loginPage} from '../page_objects/loginPage'
import {createPage} from '../page_objects/createPage'
const faker = require('@faker-js/faker')

describe('create POM', () => {
    
    const loginCredentials = {
    validEmail: 'rale@gmail.com',
    validPass: 'Test1234'
    }

    const createCredentials = {
        validName: faker.random.word(),
        validDescription: faker.random.word(),
        validImage: faker.image.avatar(),
        invalidImage: faker.image.nature(240, 150, true),
        invalidName: ''
    }
    before('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
        cy.url().should('include', '/login');
        loginPage.login(
            loginCredentials.validEmail, 
            loginCredentials.validPass
            );
        cy.url().should('not.include', '/login');
        createPage.createBtn.click();
        cy.url().should('include', '/create');
    })

    it('create gallery', () => {
        createPage.create(
            createCredentials.validName,
            createCredentials.validDescription,
            createCredentials.validImage
        )
        cy.url().should('not.include', '/create');
    })

    it('wrong format image', () => {
        createPage.create(
            createCredentials.validName,
            createCredentials.validDescription,
            createCredentials.invalidImage
        )
        createPage.errorMesage.should('be.visible')
        .and('have.text', 'Wrong format of image')
    })

    it('add additional image input field', () => {
        createPage.addImageBtn.click();
    })

    //proveriti da li se moze pogoditi tacna lokacija up i down dugmica
    it('move input fields', () => {
        createPage.imageInput.type(createCredentials.validImage);
        createPage.addImageBtn.click();
        createPage.downBtn.click();
    })

    it.only('remove image input field', () => {
        createPage.addImageBtn.click();
        createPage.trashBtn.click();
    })
})