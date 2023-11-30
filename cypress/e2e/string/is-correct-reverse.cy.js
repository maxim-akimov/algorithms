import { CIRCLE_CHANGING_SELECTOR, CIRCLE_MODIFIED_SELECTOR } from "../containts/constaints";

it('Строка разворачивается корректно, анимации работают корретно', () => {
  cy.visit('/recursion');
  cy.get('input').type('abcd');
  cy.get('button').contains('Развернуть').click();

  cy.get('[class*=circle_content').first().as('firstElement');
  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').children(CIRCLE_CHANGING_SELECTOR);

  cy.get('[class*=circle_content').last().as('lastElement');
  cy.get('@lastElement').contains('d');
  cy.get('@lastElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);

  cy.get('@firstElement').children(CIRCLE_MODIFIED_SELECTOR);
  cy.get('@lastElement').children(CIRCLE_MODIFIED_SELECTOR);

  cy.get('[class*=circle_content').eq(1).as('secondElement');
  cy.get('@secondElement').contains('b');
  cy.get('@secondElement').children(CIRCLE_CHANGING_SELECTOR);

  cy.get('[class*=circle_content').eq(2).as('thirdElement');
  cy.get('@thirdElement').contains('c');
  cy.get('@thirdElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);

  cy.get('@secondElement').contains('c');
  cy.get('@secondElement').children(CIRCLE_MODIFIED_SELECTOR);

  cy.get('@thirdElement').contains('b');
  cy.get('@thirdElement').children(CIRCLE_MODIFIED_SELECTOR);
});