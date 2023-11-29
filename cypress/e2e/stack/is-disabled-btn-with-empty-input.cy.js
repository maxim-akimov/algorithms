it('Кнопка Добавить заблокирована, если поле пустое', () => {
  cy.visit('http://localhost:3000/stack');
  cy.get('input').should('have.value', '');
  cy.contains('button', 'Добавить').should('be.disabled');
});