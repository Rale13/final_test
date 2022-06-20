class AddBoard {

get myOrganization() {
    return cy.get('a[href="/organizations/18110/boards"]')
}

get boardsModal() {
    return cy.get(".vs-c-modal__body");
}

get okBtn() {
    return this.boardsModal.find("button").last();
}

get addBoardBtn() {
    return cy.get('.vs-c-organization-boards__item--add-new')
}

get boardName() {
    return cy.get('input[type="text"]').eq(1);
}

get createBoardModal() {
    return cy.get('.vs-c-modal')
}

get nextBtn() {
    return this.createBoardModal.get('button').last();
}

get boardType() {
    return this.createBoardModal.get('.vs-c-radio-check').eq(1);
}


board(boardName) {
    this.myOrganization.click();
    this.okBtn.click();
    this.addBoardBtn.click();
    this.boardName.type(boardName);
    this.nextBtn.click();
    this.boardType.click();
    this.nextBtn.click();
    this.nextBtn.click();
    this.nextBtn.click();
    this.nextBtn.click();

}

}

export const addBoard = new AddBoard();