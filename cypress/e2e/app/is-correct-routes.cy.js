describe('Роутинг прилодения работает корректно', () => {
  before(() => {
    cy.visit('');
  })


  it('Должна открыться главная страница', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });


  it('Должна открыться страница Строка после нажатия на ссылку Строка', function() {
    cy.visit('');
    cy.get('a[href="/recursion"]').click();
    cy.location('pathname').should('eq', '/recursion');
    cy.contains('Строка')
  });


  it('Должна открыться главная страница при клике на ссылку К оглавлению', function() {
    cy.visit('/recursion');
    cy.get('p').contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
  });


  it('Должна открыться страница Последовательность Фибоначчи после нажатия на ссылку Последовательность Фибоначчи', function() {
    cy.visit('');
    cy.get('a[href="/fibonacci"]').click();
    cy.location('pathname').should('eq', '/fibonacci');
    cy.contains('Последовательность Фибоначчи')
  });


  it('Должна открыться главная страница при клике на ссылку К оглавлению', function() {
    cy.visit('/fibonacci');
    cy.get('p').contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
  });


  it('Должна открыться страница Сортировка массива после нажатия на ссылку Сортировка массива', function() {
    cy.visit('');
    cy.get('a[href="/sorting"]').click();
    cy.location('pathname').should('eq', '/sorting');
    cy.contains('Сортировка массива')
  });


  it('Должна открыться главная страница при клике на ссылку К оглавлению', function() {
    cy.visit('/sorting');
    cy.get('p').contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
  });


  it('Должна открыться страница Стек после нажатия на ссылку Стек', function() {
    cy.visit('');
    cy.get('a[href="/stack"]').click();
    cy.location('pathname').should('eq', '/stack');
    cy.contains('Стек')
  });


  it('Должна открыться главная страница при клике на ссылку К оглавлению', function() {
    cy.visit('/stack');
    cy.get('p').contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
  });


  it('Должна открыться страница Очередь после нажатия на ссылку Очередь', function() {
    cy.visit('');
    cy.get('a[href="/queue"]').click();
    cy.location('pathname').should('eq', '/queue');
    cy.contains('Очередь')
  });


  it('Должна открыться главная страница при клике на ссылку К оглавлению', function() {
    cy.visit('/queue');
    cy.get('p').contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
  });


  it('Должна открыться страница Связный список после нажатия на ссылку Связный список', function() {
    cy.visit('');
    cy.get('a[href="/list"]').click();
    cy.location('pathname').should('eq', '/list');
    cy.contains('Связный список')
  });


  it('Должна открыться главная страница при клике на ссылку К оглавлению', function() {
    cy.visit('/list');
    cy.get('p').contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
  });
});