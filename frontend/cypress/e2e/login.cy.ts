describe('Login Test', () => {
  beforeEach(() => {
    // Assurez-vous que votre application est prête avant chaque test
    cy.visit('http://localhost:4200'); // Assurez-vous de mettre l'URL correcte de votre application
  });

  it('should log in successfully with valid credentials', () => {
    cy.get('#email').type('client@wcs.com');
    cy.get('#password').type('Alayd3!client');
    cy.get('.btn').click();

    // Vérifiez que l'utilisateur est redirigé après la connexion réussie
    cy.url().should('include', '/tickets/list');
  });
  // Ajoutez d'autres tests en fonction de vos besoins, par exemple, tests d'échec de connexion, etc.
});
