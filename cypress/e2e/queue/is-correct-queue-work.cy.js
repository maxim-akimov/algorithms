import { CIRCLE_CHANGING_SELECTOR, CIRCLE_CONTENT_SELECTOR, CIRCLE_DEFAULT_SELECTOR } from "../containts/constaints";

it('Кнопка Добавить заблокирована, если поле пустое', () => {
  cy.visit('/queue');
  cy.get('input').should('have.value', '');
  cy.contains('button', 'Добавить').should('be.disabled');
});


it('Элементы A и B корректно последовательно добавляются в очередь', () => {
  cy.visit('/queue');
  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).first().as('firstElement');

  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').contains('tail');
  cy.get('@firstElement').children('[class*=circle_index]').contains('0');
  cy.get('@firstElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);
  cy.get('@firstElement').children(CIRCLE_DEFAULT_SELECTOR);

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(1).as('secondElement');

  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').not('tail');

  cy.get('@secondElement').contains('b');
  cy.get('@secondElement').contains('tail');
  cy.get('@secondElement').children('[class*=circle_index]').contains('1');
  cy.get('@secondElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);
  cy.get('@secondElement').children(CIRCLE_DEFAULT_SELECTOR);
});



it('Первый элемент (A) корректно удаляется из очереди', () => {
  cy.visit('/queue');

  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();
  cy.wait(1500)

  cy.contains('button', 'Удалить').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).first().as('firstElement');

  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').children('[class*=circle_index]').contains('0');
  cy.get('@firstElement').children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);
  cy.get('@firstElement').children(CIRCLE_DEFAULT_SELECTOR);
  cy.get('@firstElement').not('a');

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(1).as('secondElement');
  cy.get('@secondElement').contains('head');
});



it('Первый элемент (A) корректно удаляется из очереди', () => {
  cy.visit('/queue');

  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();

  cy.wait(500)

  cy.contains('button', 'Очистить').click();
  cy.wait(500)

  cy.get(CIRCLE_CONTENT_SELECTOR).each(($el, i) => {
    cy.wrap($el.children('[class*=circle_circle]')
      .children('[class*=circle_letter]')).should('be.empty');
  })
});