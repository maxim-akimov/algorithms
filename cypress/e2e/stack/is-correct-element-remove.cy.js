it('Последний элемент (В) корректно удаляется из стека', () => {
  cy.visit('http://localhost:3000/stack');
  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();
  cy.wait(1500);

  cy.contains('button', 'Удалить').click();

  cy.get('[class*=circle_content]').first().as('firstElement');
  cy.get('[class*=circle_content]').last().as('lastElement');

  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').not('tail');
  cy.get('@firstElement').children('[class*=circle_index]').contains('0');

  cy.get('@lastElement').children('[class*=circle_changing]');
  cy.get('@lastElement').contains('b');
  cy.get('@lastElement').contains('tail');
  cy.get('@lastElement').not('head');
  cy.wait(500);

  cy.get('@lastElement').contains('a');
  cy.get('@lastElement').contains('head');
  cy.get('@lastElement').contains('tail');
  cy.get('@lastElement').children('[class*=circle_index]').contains('0');
  cy.get('@lastElement').children('[class*=circle_default]');
});