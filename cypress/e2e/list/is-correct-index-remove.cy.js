it('"Элемент корректно удаляется по индексу', () => {
  cy.visit('http://localhost:3000/list');

  cy.get('input[name=index]').type(2);
  cy.contains('button', 'Удалить по индексу').click();

  cy.get('[class*=circle_content]').eq(0).children('[class*=circle_changing]');
  cy.wait(500);

  cy.get('[class*=circle_content]').eq(1).children('[class*=circle_changing]');
  cy.wait(500);

  cy.get('[class*=circle_content]').eq(2).as('currentElement');

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