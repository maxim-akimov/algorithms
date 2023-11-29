it('"Элемент корректно добавляется по индексу', () => {
  cy.visit('http://localhost:3000/list');

  cy.get('input[name=value]').type(25);
  cy.get('input[name=index]').type(2);
  cy.contains('button', 'Добавить по индексу').click()

  cy.get('[class*=circle_content]').eq(2).as('currentElement');

  cy.get('@currentElement')
    .children('[class*=circle_head]')
    .children('[class*=circle_content]')
    .children('[class*=circle_changing], [class*=circle_small]')
    .contains(25);
  cy.wait(500);

  cy.get('[class*=circle_content]').eq(3).as('currentElement');
  cy.wait(500);

  cy.get('@currentElement').children('[class*=circle_default]');
});