describe('Registration Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200'); // Assurez-vous de mettre l'URL correcte de votre application
  });

  it('should register successfully with random data', () => {
    cy.contains('Cliquez ici !').click(), { force: true };

    fillFirstStep(); // Remplir la première étape

    cy.get('mat-step-header').eq(1).should('exist').click({ force: true });
    // Vérifier que la deuxième étape est affichée, eq (1) car c'est le deuxieme bouton, le premier est 0

    fillSecondStep(); // Remplir la deuxième étape

    cy.contains('Valider').click({ force: true });


    // Vérifier que l'élément 'Cliquez ici !' est à nouveau visible
    cy.contains('Cliquez ici !').should('be.visible'), { force: true };
    
  });

  // Fonction pour remplir la première étape
  function fillFirstStep() {
    cy.get('#lastname').type('Doe', { force: true });
    cy.get('#firstname').type('John', { force: true });
    cy.get('#phone').type('0677458899', { force: true });
    cy.get('#email').type(`test${Math.floor(Math.random() * 100000)}@example.com`);
    cy.get('#password').type('TestAbcd123!', { force: true }).type(String.fromCharCode(9)); // Appuyez sur la touche Tab
    cy.get('#confirmPassword').type('TestAbcd123!', { force: true }).type(String.fromCharCode(9)); // Appuyez sur la touche Tab
  }

  // Fonction pour remplir la deuxième étape
  function fillSecondStep() {
    cy.get('#street_l1').type('123 Main St', { force: true });
    cy.get('#postcode').type('75000', { force: true });
    cy.get('#city').type('Paris', { force: true });
    cy.get('#country').type('France', { force: true }).type(String.fromCharCode(9)); // Appuyez sur la touche Tab
  }
});
