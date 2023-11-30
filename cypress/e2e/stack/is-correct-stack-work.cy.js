import { CIRCLE_CHANGING_SELECTOR, CIRCLE_CONTENT_SELECTOR, CIRCLE_DEFAULT_SELECTOR } from "../containts/constaints";

it('Кнопка Добавить заблокирована, если поле пустое', () => {
  cy.visit('/stack');
  cy.get('input').should('have.value', '');
  cy.contains('button', 'Добавить').should('be.disabled');
});



it('Элементы A и B корректно последовательно добавляются стек', () => {
  cy.visit('/stack');
  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).last().as('lastElement');

  cy.get('@lastElement').contains('a');
  cy.get('@lastElement').contains('head');
  cy.get('@lastElement').contains('tail');
  cy.get('@lastElement').children('[class*=circle_index]').contains('0');
  cy.get('@lastElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).first().as('firstElement');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').not('tail');
  cy.get('@firstElement').children('[class*=circle_index]').contains('0');


  cy.get('@lastElement').contains('b');
  cy.get('@lastElement').contains('tail');
  cy.get('@lastElement').children('[class*=circle_index]').contains('1');
  cy.get('@firstElement').not('head');
  cy.get('@lastElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);
});



it('Последний элемент (В) корректно удаляется из стека', () => {
  cy.visit('/stack');
  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();
  cy.wait(1500);

  cy.contains('button', 'Удалить').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).first().as('firstElement');
  cy.get(CIRCLE_CONTENT_SELECTOR).last().as('lastElement');

  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').not('tail');
  cy.get('@firstElement').children('[class*=circle_index]').contains('0');

  cy.get('@lastElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.get('@lastElement').contains('b');
  cy.get('@lastElement').contains('tail');
  cy.get('@lastElement').not('head');
  cy.wait(500);

  cy.get('@lastElement').contains('a');
  cy.get('@lastElement').contains('head');
  cy.get('@lastElement').contains('tail');
  cy.get('@lastElement').children('[class*=circle_index]').contains('0');
  cy.get('@lastElement').children(CIRCLE_DEFAULT_SELECTOR);
});



it('При нажатии кнопки Очистить, стек очищается корректно', () => {
  cy.visit('/stack');
  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();
  cy.wait(1000);

  cy.get(CIRCLE_CONTENT_SELECTOR).first().as('firstElement');
  cy.get(CIRCLE_CONTENT_SELECTOR).last().as('lastElement');

  cy.get('@firstElement').should('contain', 'a');
  cy.get('@lastElement').should('contain', 'b');

  cy.contains('button', 'Очистить').click();
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).should('have.length', 0)
});