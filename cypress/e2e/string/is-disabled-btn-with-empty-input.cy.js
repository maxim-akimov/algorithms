it('Кнопка Развернуть заблокирована, если поле пустое', () => {
  cy.visit('http://localhost:3000/recursion');
  cy.get('input').should('have.value', '');
  cy.get('button').should('be.disabled');
});