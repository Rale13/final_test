class DeleteBoard {

get organizationWraper() {
    return cy.get('.vs-c-my-organizations-item-wrapper')
}

get myOrganization() {
        return this.organizationWraper.get('.vs-c-my-organization__content').eq(0)

}

get boardsModal() {
    return cy.get(".vs-c-modal__body");
}

get okBtn() {
    return this.boardsModal.find("button").last();
}

get boardWraper() {
    return cy.get('.vs-c-organization__section')
}

get myBoard() {
    return this.boardWraper.get('.vs-c-organization-boards__item')
}

get boardSettings() {
    return cy.get('ul[class="vs-c-list"]');
}

get configBtn() {
    return this.boardSettings.get('li').last();
}

get deleteBtn() {
    return cy.get('button[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]')
}

get modalDialog() {
    return cy.get('.vs-c-modal');
}

get yesBtn() {
    return this.modalDialog.find('button').eq(2);
}

delete() {
    cy.wait(4000);
    deleteBoard.myOrganization.click();
    deleteBoard.okBtn.click();
    deleteBoard.myBoard.click();
    cy.wait(4000);
    deleteBoard.configBtn.click();
    deleteBoard.deleteBtn.click();
    deleteBoard.yesBtn.click();
}


}

export const deleteBoard = new DeleteBoard();