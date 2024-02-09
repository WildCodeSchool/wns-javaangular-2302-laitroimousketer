describe('End-to-End Ticket Management', () => {
  beforeEach(() => {
    // Assurez-vous que votre application est prête avant chaque test
    cy.visit('http://localhost:4200'); // Assurez-vous de mettre l'URL correcte de votre application
  });

  it('should log in successfully and add a ticket', () => {
    // Utilisez votre test de connexion pour vous connecter
    cy.get('#email').type('client@wcs.com');
    cy.get('#password').type('Alayd3!client');
    cy.get('.btn').click();

    // Vérifiez que l'utilisateur est redirigé après la connexion réussie
    cy.url().should('include', '/tickets/list');

    // Ajoutez votre logique pour ajouter un ticket ici
    // Par exemple, vous pouvez cliquer sur le deuxième lien généré
    cy.contains('.addTicket', 'Créer un nouveau ticket').click();


    // Remplacez le titre du ticket par un texte aléatoire
    cy.get('#title').type(`Test ticket${Math.floor(Math.random() * 100000)}`);

    // Sélectionnez une priorité
    cy.get('mat-select[formControlName=selectedPriority]').click();
    cy.get('mat-option').eq(1).click();

    // Sélectionnez une catégorie
    cy.get('mat-select[formControlName=selectedCategory]').click();
    cy.get('mat-option').eq(1).click();

    // Ajoutez une description
    cy.get('#description').type('Ceci est une description de test pour le ticket.');

    // Cliquez sur le bouton "Créer"
    cy.get('.buttons-actions .addTicket').click();

    // Vérifiez que vous êtes redirigé vers la page des tickets après la création
    cy.url().should('include', '/tickets/list');

    // Wait for the snackbar to appear
    cy.get('.mat-mdc-simple-snack-bar').should('be.visible');

    // Check if the success message is present in the snackbar
    cy.get('.mat-mdc-simple-snack-bar .mdc-snackbar__label').contains('Ticket créé').should('exist');
  });
});
