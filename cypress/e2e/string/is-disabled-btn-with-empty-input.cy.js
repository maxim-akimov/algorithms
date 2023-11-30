it('Кнопка Развернуть заблокирована, если поле пустое', () => {
  cy.visit('/recursion');
  cy.get('input').should('have.value', '');
  cy.get('button').should('be.disabled');
});