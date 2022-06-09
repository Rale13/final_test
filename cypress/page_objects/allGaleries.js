class AllGalleries {

    get pagination() {
        cy.get('button').eq(1).click();
    }

    get filterInput() {
        return cy.get('.form-control');
    }

    get filterBtn() {
        return cy.get('button').eq(0).click();
    }

    findGallery(filter) {
        this.filterInput.type(filter);
        this.filterBtn.click();
    }

}

export  const allGalleries = new AllGalleries;