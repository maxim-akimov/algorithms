it('Кнопка Добавить по индексу заблокирована, если поле пустое', () => {
  cy.visit('http://localhost:3000/list');
  cy.get('input[name=index]').should('have.value', '');
  cy.contains('button', 'Добавить по индексу').should('be.disabled');
});


it('Кнопка Удалить по индексу заблокирована, если поле пустое', () => {
  cy.visit('http://localhost:3000/list');
  cy.get('input[name=index]').should('have.value', '');
  cy.contains('button', 'Удалить по индексу').should('be.disabled');
});