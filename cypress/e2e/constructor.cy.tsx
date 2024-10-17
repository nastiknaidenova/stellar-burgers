describe('E2E тесты для главной страницы и модального окна', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавление ингредиентов в конструктор', function () {
    // Определяем элементы
    cy.get(`[data-cy=${'buns'}]`).as('buns');
    cy.get('[data-cy=mains]').as('mains');
    cy.get('[data-cy=sauces]').as('sauces');

    // Добавляем ингредиенты
    cy.get('@buns').contains('Добавить').click();
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();

    // Проверяем добавленные ингредиенты
    cy.get('.constructor-element_pos_top').contains(
      'Краторная булка N-200i (верх)'
    );
    cy.get('.constructor-element').contains(
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('.constructor-element_pos_bottom').contains(
      'Краторная булка N-200i (низ)'
    );

    // Перемещение ингредиента
    cy.get('.move_button').then((buttons) => {
      buttons[1].click(); // Нажимаем на кнопку перемещения вниз
      cy.get('.constructor-element').contains('Соус Spicy-X');
    });
  });

  it('Проверка отсутствия модального окна', function () {
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Проверка открытия модального окна', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').contains('Соус фирменный Space Sauce');
  });

  it('Проверка закрытия модального окна по кнопке', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Проверка закрытия модального окна по ESC', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Проверка закрытия модального окна по клику на оверлей', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#overlay').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });
});

describe('E2E тесты оформления заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'userOrder.json' });

    // Посещение главной страницы
    cy.visit('http://localhost:4000');

    // Установка токенов
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Тестирование оформления заказа', function () {
    // Определяем элементы
    cy.get(`[data-cy=${'buns'}]`).as('buns');
    cy.get('[data-cy=mains]').as('mains');
    cy.get('[data-cy=sauces]').as('sauces');

    // Добавляем ингредиенты
    cy.get('@buns').contains('Добавить').click();
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();

    // Оформляем заказ
    cy.contains('Оформить заказ').click();

    // Проверяем модальное окно с номером заказа
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').find('h2').contains(54817);

    // Закрываем модальное окно
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);

    // Проверяем наличие сообщений о выборе ингредиентов
    cy.get('.text_type_main-default').contains('Выберите булки');
    cy.get('.text_type_main-default').contains('Выберите начинку');
  });
});
