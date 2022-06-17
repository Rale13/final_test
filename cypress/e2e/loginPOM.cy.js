/// <reference types="Cypress" />
import {loginPage} from '../page_objects/loginPage'
const faker = require('@faker-js/faker')

describe('login POM', () => {

    const userData = {
    validEmail: 'rale@gmail.com',
    emailWihoutProvider: faker.internet.email('Test', 'Test', 'email'),
    validPass: 'Test1234',
    passwordWithoutNumber: faker.internet.password(20, true, /[A-Z]/),
    shortPassword: faker.internet.password(4),
    }

    beforeEach('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
    })

    it('email without provider', () => { 

        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('invalidLogin')

        cy.visit('/login')
        cy.url().should('include', '/login');
        loginPage.loginHeading.should('be.visible')
        .and('have.text', 'Please login');
        loginPage.login(
            userData.emailWihoutProvider, 
            userData.validPass);

        cy.wait('@invalidLogin').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(401)
        })
        
        cy.url().should('include', '/login');
        loginPage.errorMesage.should('be.visible')
        .and('have.text', 'Bad Credentials')
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })

    it('password without number', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('passWithoutNumber')
        
        cy.visit('/login')
        loginPage.login(
            userData.validEmail, 
            userData.passwordWithoutNumber, 
            )
        cy.url().should('include', '/login');
        loginPage.errorMesage.should('have.text', 'Bad Credentials')
        cy.wait('@passWithoutNumber').then(interception => {
            expect(interception.response.statusCode).eq(401);
        })
    })

    it('login with password that has less than 8 char', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('shortPass')
        
        loginPage.login(
            userData.validEmail, 
            userData.shortPassword, 
            )
        cy.url().should('include', '/login');
        loginPage.errorMesage.should('be.visible')
        .and('have.text', 'Bad Credentials')
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')

        cy.wait('@shortPass').then(interception =>{
            expect(interception.response.statusCode).eq(401);
        })

    })

    it('valid login using POM', () => {

        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('validLogin')

        cy.url().should('include', '/login');
        loginPage.login(userData.validEmail, userData.validPass);
        cy.wait('@validLogin').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })

        cy.url().should('not.include', '/login');
        loginPage.logoutBtn.should('be.visible');
    })

    //zakomentarisano zato sto se u loginu preko POMa radi interception
    //pa je bolje da se taj test koristi
    /*it('valid login via backend', () => {

        cy.loginViaBackend();
        cy.visit('/my-galleries')

    })*/   
})

describe('logout POM', () => {
    it('logout', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/logout'
        }).as('validLogout')

        loginPage.logoutBtn.click();
        cy.wait('@validLogout').then(interception => {
            expect(interception.response.body.message).eq('Successfully logged out')
            expect(interception.response.statusCode).eq(200)
        })
    })
})