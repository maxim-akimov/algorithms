it('"Элемент корректно добавляется в head', () => {
  cy.visit('http://localhost:3000/list');

  cy.get('input[name=value]').type(10);
  cy.contains('button', 'Добавить в head').click()

  cy.get('[class*=circle_content]').eq(0).as('currentElement');

  cy.get('@currentElement')
    .children('[class*=circle_head]')
    .children('[class*=circle_content]')
    .children('[class*=circle_changing], [class*=circle_small]')
    .contains(10);
  cy.wait(500);

  cy.get('@currentElement').children('[class*=circle_modified]')
});