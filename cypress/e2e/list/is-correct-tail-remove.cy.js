it('"Элемент корректно удаляется из tail', () => {
  cy.visit('http://localhost:3000/list');

  cy.contains('button', 'Удалить из tail').click()

  cy.get('[class*=circle_content]').eq(3).as('currentElement');

  cy.get('@currentElement')
    .children('[class*=circle_changing]');
  cy.wait(500);

  cy.get('@currentElement')
    .children('[class*=circle_tail]')
    .children('[class*=circle_content]')
    .children('[class*=circle_changing], [class*=circle_small]')
  cy.wait(500);

  cy.get('[class*=circle_content]').should("have.length", 3);
});