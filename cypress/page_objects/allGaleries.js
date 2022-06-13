class AllGalleries {

    get loadMoreBtn() {
        cy.get('button').eq(1).click();
    }

    get filterInput() {
        return cy.get('.form-control');
    }

    get filterBtn() {
        return cy.get('button').eq(0).click();
    }

    get title() {
        return cy.get('h1')
    }

    get singleGallery() {
        return cy.get('.cell');
    }

    get galleryTitle() {
        return this.singleGallery.first().find('h2').click();
    }

    get galleryAuthor() {
        return this.singleGallery.first().find('.box-title').eq(1).click();
    }

    getGalleryByIndex(index) {
        return this.singleGallery.eq(index).find('a').first()
    }


    findGallery(filter) {
        this.filterInput.type(filter);
        this.filterBtn.click();
    }

    getSpecificGalleryTitle(title) {
        this.findGallery(title);
        this.galleryTitle.should('have.text', title)
    }

}

export  const allGalleries = new AllGalleries;