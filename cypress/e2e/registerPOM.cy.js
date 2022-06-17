/// <reference types="Cypress" />
import {registerPage} from '../page_objects/registerPage'
const faker = require('@faker-js/faker')

describe('register POM', () => {

    const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        validEmail: faker.internet.email(),
        emailWithout: faker.internet.email(),
        emailWihoutProvider: faker.internet.email('Test', 'Test', 'email'),
        validPass: faker.internet.password(),
        passwordWithoutNumber: faker.internet.password(20, true, /[A-Z]/),
        shortPassword: faker.internet.password(4),
    }
    

    beforeEach('visit register page', () => {
        cy.visit('/');
        registerPage.registerBtn.click();
        cy.url().should('include', '/register')
    })

    it('password without number', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('passWithoutNumber')
        
        cy.visit('/register')
        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.validEmail, 
            userData.passwordWithoutNumber, 
            )
        cy.url().should('include', '/register');
        registerPage.errorMesage.should('have.text', 'The password format is invalid.')
        cy.wait('@passWithoutNumber').then(interception => {
            expect(interception.response.statusCode).eq(422);
        })
    })

    it('register with password that has less than 8 char', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('shortPass')
        
        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.validEmail, 
            userData.shortPassword, 
            )
        cy.url().should('include', '/register');
        registerPage.errorMesage.should('be.visible')
        .and('have.text', 'The password must be at least 8 characters.')
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')

        cy.wait('@shortPass').then(interception =>{
            expect(interception.response.statusCode).eq(422);
        })

    })

    it('email without provider', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('emailNoProvider')

        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.emailWihoutProvider, 
            userData.validPass, 
            )

        cy.url().should('include', '/register');
        registerPage.errorMesage.should('be.visible')
        .and('have.text', 'The email must be a valid email address.')

        cy.wait('@emailNoProvider').then(interception => {
            expect(interception.response.statusCode).eq(422);
        })
    })

    it('Check button not checked', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('checkButton')

        registerPage.noCheckBtn(
            userData.firstName, 
            userData.lastName, 
            userData.validEmail, 
            userData.validPass, 
            )
        registerPage.errorMesage.should('be.visible')
        .and('have.text', 'The terms and conditions must be accepted.');
        registerPage.formCheckInput.should('not.be.checked');

        cy.wait('@checkButton').then(interception => {
            expect(interception.response.statusCode).eq(422);
        })
    })

    it('valid registration', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('validRegistration')

        registerPage.register(
            userData.firstName,
            userData.lastName,
            userData.validEmail,
            userData.validPass,
            userData.validPass,
        )

        cy.url().should('not.include', '/register');
        cy.wait('@validRegistration').then(interception => {
            expect(interception.response.statusCode).eq(200);
        })

    })

})