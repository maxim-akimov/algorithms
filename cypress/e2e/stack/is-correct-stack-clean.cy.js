it('При нажатии кнопки Очистить, стек очищается корректно', () => {
  cy.visit('http://localhost:3000/stack');
  cy.get('input').type('a')
  cy.contains('button', 'Добавить').click();

  cy.get('input').type('b')
  cy.contains('button', 'Добавить').click();
  cy.wait(1000);

  cy.get('[class*=circle_content]').first().as('firstElement');
  cy.get('[class*=circle_content]').last().as('lastElement');

  cy.get('@firstElement').should('contain', 'a');
  cy.get('@lastElement').should('contain', 'b');

  cy.contains('button', 'Очистить').click();
  cy.wait(500);

  cy.get('[class*=circle_content]').should('have.length', 0)
});