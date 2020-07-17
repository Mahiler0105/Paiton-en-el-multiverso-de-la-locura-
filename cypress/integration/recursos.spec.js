context("Action", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("Cargar primera Scena - Main", () => {
    cy.get("#nuevo").click(500, 450);
    cy.wait(1000);
  });
  it("Cargar Screen Cargando...", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.wait(2500);
  });

  it("Cargar Primer nivel", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.wait(4000);
  });
});
