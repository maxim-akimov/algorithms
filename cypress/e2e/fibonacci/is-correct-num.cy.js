import { CIRCLE_CONTENT_SELECTOR, CIRCLE_DEFAULT_SELECTOR } from "../containts/constaints";

it('Вывод числа Фибоначчи происходит корректно', () => {
  cy.visit('/fibonacci');
  cy.get('input').type(5);
  cy.get('button').contains('Рассчитать').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).last().as('lastElement');
  cy.get('@lastElement').contains('1');
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);
  cy.wait(500);

  cy.get('@lastElement').contains('1');
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);
  cy.wait(500);

  cy.get('@lastElement').contains('2');
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);
  cy.wait(500);

  cy.get('@lastElement').contains('3');
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);
  cy.wait(500);

  cy.get('@lastElement').contains('5');
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);
  cy.wait(500);
});