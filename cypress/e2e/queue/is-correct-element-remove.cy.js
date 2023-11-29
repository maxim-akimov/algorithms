it('Первый элемент (A) корректно удаляется из очереди', () => {
  cy.visit('http://localhost:3000/queue');

  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();
  cy.wait(1500)

  cy.contains('button', 'Удалить').click();

  cy.get('[class*=circle_content]').first().as('firstElement');

  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').children('[class*=circle_index]').contains('0');
  cy.get('@firstElement').children('[class*=circle_changing]');
  cy.wait(500);
  cy.get('@firstElement').children('[class*=circle_default]');
  cy.get('@firstElement').not('a');

  cy.get('[class*=circle_content]').eq(1).as('secondElement');
  cy.get('@secondElement').contains('head');
});