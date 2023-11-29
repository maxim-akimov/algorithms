it('Дефолтный список рендерится корректно', () => {
  cy.visit('http://localhost:3000/list');

  cy.get('[class*=circle_content]').should('have.length', 4).each(($el, i) => {
    if (i === 0) {
      cy.wrap($el).contains('head');
    }

    if (i === 4) {
      cy.wrap($el).contains('head');
    }

    cy.wrap($el.children('[class*=circle_index]')).contains(i);
    cy.wrap($el.children('[class*=circle_default]'));
    cy.wrap($el.children('[class*=circle_letter]')).should('not.be.empty');
  })
});