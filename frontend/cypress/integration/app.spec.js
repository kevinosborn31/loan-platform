describe('Basic Test', () => {
    it('Visits the app and checks for text', () => {
      cy.visit('/'); 
  
      cy.contains('Welcome to Driva'); 
      });
  });