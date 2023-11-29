it('Вывод числа Фибоначчи происходит корректно', () => {
  cy.visit('http://localhost:3000/fibonacci');
  cy.get('input').type(5);
  cy.get('button').contains('Рассчитать').click();

  cy.get('[class*=circle_content]').last().as('lastElement');
  cy.get('@lastElement').contains('1');
  cy.get('@lastElement').children('[class*=circle_default]');
  cy.wait(500);

  cy.get('@lastElement').contains('1');
  cy.get('@lastElement').children('[class*=circle_default]');
  cy.wait(500);

  cy.get('@lastElement').contains('2');
  cy.get('@lastElement').children('[class*=circle_default]');
  cy.wait(500);

  cy.get('@lastElement').contains('3');
  cy.get('@lastElement').children('[class*=circle_default]');
  cy.wait(500);

  cy.get('@lastElement').contains('5');
  cy.get('@lastElement').children('[class*=circle_default]');
  cy.wait(500);
});