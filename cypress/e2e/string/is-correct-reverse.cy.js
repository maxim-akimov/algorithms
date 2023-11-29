it('Строка разворачивается корректно, анимации работают корретно', () => {
  cy.visit('http://localhost:3000/recursion');
  cy.get('input').type('abcd');
  cy.get('button').contains('Развернуть').click();

  cy.get('[class*=circle_content').first().as('firstElement');
  cy.get('@firstElement').contains('a');
  cy.get('@firstElement').children('[class*=circle_changing]');

  cy.get('[class*=circle_content').last().as('lastElement');
  cy.get('@lastElement').contains('d');
  cy.get('@lastElement').children('[class*=circle_changing]');
  cy.wait(500);

  cy.get('@firstElement').children('[class*=circle_modified]');
  cy.get('@lastElement').children('[class*=circle_modified]');

  cy.get('[class*=circle_content').eq(1).as('secondElement');
  cy.get('@secondElement').contains('b');
  cy.get('@secondElement').children('[class*=circle_changing]');

  cy.get('[class*=circle_content').eq(2).as('thirdElement');
  cy.get('@thirdElement').contains('c');
  cy.get('@thirdElement').children('[class*=circle_changing]');
  cy.wait(500);

  cy.get('@secondElement').contains('c');
  cy.get('@secondElement').children('[class*=circle_modified]');

  cy.get('@thirdElement').contains('b');
  cy.get('@thirdElement').children('[class*=circle_modified]');
});