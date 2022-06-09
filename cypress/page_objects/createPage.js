class CreatePage {
    
    get createBtn() {
       return cy.get('a[href="/create"]');
    }

    get titleInput() {
        return cy.get('#title');
    }

    get descriptionInput() {
        return cy.get('#description');
    }

    get imageInput() {
        return cy.get('input[type="url"]');
    }

    get submitBtn() {
        return cy.get('button').eq(3);
    }

    create(title, description, image) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput.type(image);
        this.submitBtn.click();
    }

}

export const createPage = new CreatePage;