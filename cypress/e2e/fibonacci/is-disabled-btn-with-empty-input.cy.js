it('Кнопка Развернуть заблокирована, если поле пустое', () => {
  cy.visit('/fibonacci');
  cy.get('input').should('have.value', '');
  cy.get('button').should('be.disabled');
});