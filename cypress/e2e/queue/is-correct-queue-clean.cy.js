it('Первый элемент (A) корректно удаляется из очереди', () => {
  cy.visit('http://localhost:3000/queue');

  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();

  cy.wait(500)

  cy.contains('button', 'Очистить').click();
  cy.wait(500)

  cy.get('[class*=circle_content]').each(($el, i) => {
    cy.wrap($el.children('[class*=circle_circle]')
      .children('[class*=circle_letter]')).should('be.empty');
  })
});