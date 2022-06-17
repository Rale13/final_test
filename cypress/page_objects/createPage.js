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

    get addImageBtn() {
        return cy.get('button').eq(-3);
    }

    get galleryInputParent() {
        return cy.get('.form-group').eq(2);
    }

    get galleryInputButtonsParent() {
        return this.galleryInputParent.get('.input-group-append').first();
    }

    get allGalleryInputButtonParents() {
        return this.galleryInputParent.get('.input-group-append')
    }

    get trashBtn() {
        return this.galleryInputButtonsParent.get('.input-buttons').first();
    }

    get upBtn() {
        return this.galleryInputButtonsParent.get('.input-buttons').eq(1);
    }

    get downBtn() {
        return this.galleryInputButtonsParent.get('.input-buttons').eq(2);
    }

    get errorMesage() {
        return cy.get('p[class="alert alert-danger"]')
    }

    create(title, description, image) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput.type(image);
        this.submitBtn.click();
    }

}

export const createPage = new CreatePage;