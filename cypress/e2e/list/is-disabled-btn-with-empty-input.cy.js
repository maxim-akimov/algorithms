it('Кнопка Добавить в head заблокирована, если поле пустое', () => {
  cy.visit('http://localhost:3000/list');
  cy.get('input[name=value]').should('have.value', '');
  cy.contains('button', 'Добавить в head').should('be.disabled');
});

it('Кнопка Добавить в tail заблокирована, если поле пустое', () => {
  cy.visit('http://localhost:3000/list');
  cy.get('input[name=value]').should('have.value', '');
  cy.contains('button', 'Добавить в tail').should('be.disabled');
});