it('Элементы A и B корректно последовательно добавляются в очередь', () => {
  cy.visit('http://localhost:3000/queue');
  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('[class*=circle_content]').first().as('firstElement');

  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').contains('tail');
  cy.get('@firstElement').children('[class*=circle_index]').contains('0');
  cy.get('@firstElement').children('[class*=circle_changing]');
  cy.wait(500);
  cy.get('@firstElement').children('[class*=circle_default]');

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();

  cy.get('[class*=circle_content]').eq(1).as('secondElement');

  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').not('tail');

  cy.get('@secondElement').contains('b');
  cy.get('@secondElement').contains('tail');
  cy.get('@secondElement').children('[class*=circle_index]').contains('1');
  cy.get('@secondElement').children('[class*=circle_changing]');
  cy.wait(500);
  cy.get('@secondElement').children('[class*=circle_default]');
});