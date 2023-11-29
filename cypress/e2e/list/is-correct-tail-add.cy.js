it('"Элемент корректно добавляется в tail', () => {
  cy.visit('http://localhost:3000/list');

  cy.get('input[name=value]').type(15);
  cy.contains('button', 'Добавить в tail').click()

  cy.get('[class*=circle_content]').eq(3).as('currentElement');

  cy.get('@currentElement')
    .children('[class*=circle_head]')
    .children('[class*=circle_content]')
    .children('[class*=circle_changing], [class*=circle_small]')
    .contains(15);
  cy.wait(500);

  cy.get('[class*=circle_content]').eq(4).as('currentElement');
  cy.get('@currentElement').children('[class*=circle_modified]');
  cy.get('@currentElement').contains('tail');
  cy.wait(500);

  cy.get('@currentElement').children('[class*=circle_default]');
});