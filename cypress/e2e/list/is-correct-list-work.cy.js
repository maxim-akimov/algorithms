import {
  CIRCLE_CHANGING_SELECTOR,
  CIRCLE_CONTENT_SELECTOR,
  CIRCLE_DEFAULT_SELECTOR, CIRCLE_HEAD_SELECTOR, CIRCLE_MODIFIED_SELECTOR,
  CIRCLE_SMALL_SELECTOR, CIRCLE_TAIL_SELECTOR
} from "../containts/constaints";

it('Кнопка Добавить в head заблокирована, если поле пустое', () => {
  cy.visit('/list');
  cy.get('input[name=value]').should('have.value', '');
  cy.contains('button', 'Добавить в head').should('be.disabled');
});

it('Кнопка Добавить в tail заблокирована, если поле пустое', () => {
  cy.visit('/list');
  cy.get('input[name=value]').should('have.value', '');
  cy.contains('button', 'Добавить в tail').should('be.disabled');
});


it('Кнопка Добавить по индексу заблокирована, если поле пустое', () => {
  cy.visit('/list');
  cy.get('input[name=index]').should('have.value', '');
  cy.contains('button', 'Добавить по индексу').should('be.disabled');
});


it('Кнопка Удалить по индексу заблокирована, если поле пустое', () => {
  cy.visit('/list');
  cy.get('input[name=index]').should('have.value', '');
  cy.contains('button', 'Удалить по индексу').should('be.disabled');
});


it('Дефолтный список рендерится корректно', () => {
  cy.visit('/list');

  cy.get(CIRCLE_CONTENT_SELECTOR).should('have.length', 4).each(($el, i) => {
    if (i === 0) {
      cy.wrap($el).contains('head');
    }

    if (i === 4) {
      cy.wrap($el).contains('head');
    }

    cy.wrap($el.children('[class*=circle_index]')).contains(i);
    cy.wrap($el.children(CIRCLE_DEFAULT_SELECTOR));
    cy.wrap($el.children('[class*=circle_letter]')).should('not.be.empty');
  })
});


it('"Элемент корректно добавляется в head', () => {
  cy.visit('/list');

  cy.get('input[name=value]').type(10);
  cy.contains('button', 'Добавить в head').click()

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).as('currentElement');

  cy.get('@currentElement')
    .children(CIRCLE_HEAD_SELECTOR)
    .children(CIRCLE_CONTENT_SELECTOR)
    .children(`${CIRCLE_CHANGING_SELECTOR}, ${CIRCLE_SMALL_SELECTOR}`)
    .contains(10);
  cy.wait(500);

  cy.get('@currentElement').children(CIRCLE_MODIFIED_SELECTOR)
});


it('"Элемент корректно удаляется из head', () => {
  cy.visit('/list');

  cy.contains('button', 'Удалить из head').click()

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).as('currentElement');

  cy.get('@currentElement')
    .children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);

  cy.get('@currentElement')
    .children(CIRCLE_TAIL_SELECTOR)
    .children(CIRCLE_CONTENT_SELECTOR)
    .children(`${CIRCLE_CHANGING_SELECTOR}, ${CIRCLE_SMALL_SELECTOR}`)
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).should("have.length", 3);
});


it('"Элемент корректно добавляется по индексу', () => {
  cy.visit('/list');

  cy.get('input[name=value]').type(25);
  cy.get('input[name=index]').type(2);
  cy.contains('button', 'Добавить по индексу').click()

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(2).as('currentElement');

  cy.get('@currentElement')
    .children(CIRCLE_HEAD_SELECTOR)
    .children(CIRCLE_CONTENT_SELECTOR)
    .children(`${CIRCLE_CHANGING_SELECTOR}, ${CIRCLE_SMALL_SELECTOR}`)
    .contains(25);
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(3).as('currentElement');
  cy.wait(500);

  cy.get('@currentElement').children(CIRCLE_DEFAULT_SELECTOR);
});


it('"Элемент корректно удаляется по индексу', () => {
  cy.visit('/list');

  cy.get('input[name=index]').type(2);
  cy.contains('button', 'Удалить по индексу').click();

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(1).children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(2).as('currentElement');

  cy.get('@currentElement')
    .children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);

  cy.get('@currentElement')
    .children(CIRCLE_TAIL_SELECTOR)
    .children(CIRCLE_CONTENT_SELECTOR)
    .children(`${CIRCLE_CHANGING_SELECTOR}, ${CIRCLE_SMALL_SELECTOR}`)
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).should("have.length", 3);
});


it('"Элемент корректно добавляется в tail', () => {
  cy.visit('/list');

  cy.get('input[name=value]').type(15);
  cy.contains('button', 'Добавить в tail').click()

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(3).as('currentElement');

  cy.get('@currentElement')
    .children(CIRCLE_HEAD_SELECTOR)
    .children(CIRCLE_CONTENT_SELECTOR)
    .children(`${CIRCLE_CHANGING_SELECTOR}, ${CIRCLE_SMALL_SELECTOR}`)
    .contains(15);
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(4).as('currentElement');
  cy.get('@currentElement').children(CIRCLE_MODIFIED_SELECTOR);
  cy.get('@currentElement').contains('tail');
  cy.wait(500);

  cy.get('@currentElement').children(CIRCLE_DEFAULT_SELECTOR);
});


it('"Элемент корректно удаляется из tail', () => {
  cy.visit('/list');

  cy.contains('button', 'Удалить из tail').click()

  cy.get(CIRCLE_CONTENT_SELECTOR).eq(3).as('currentElement');

  cy.get('@currentElement')
    .children(CIRCLE_CHANGING_SELECTOR);
  cy.wait(500);

  cy.get('@currentElement')
    .children(CIRCLE_TAIL_SELECTOR)
    .children(CIRCLE_CONTENT_SELECTOR)
    .children(`${CIRCLE_CHANGING_SELECTOR}, ${CIRCLE_SMALL_SELECTOR}`)
  cy.wait(500);

  cy.get(CIRCLE_CONTENT_SELECTOR).should("have.length", 3);
});