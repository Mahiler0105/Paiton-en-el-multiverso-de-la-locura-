context("Action", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("Pausar juego", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.wait(2000);
    cy.get("body").trigger("keydown", { keyCode: 70, release: true });
    cy.wait(1000);
    cy.get("#nuevo").click(500, 70);
    cy.wait(1000);
  });
  it("Pausar y reanudar juego ", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.wait(2000);
    cy.get("body").trigger("keydown", { keyCode: 70, release: true });
    cy.wait(1000);
    cy.get("#nuevo").click(500, 70);
    cy.wait(1000);
    cy.get("#nuevo").click(380, 350);
    cy.wait(1000);
  });
  it("Pausar juego y volver al menu principal ", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(500, 450);
    cy.wait(2000);
    cy.get("body").trigger("keydown", { keyCode: 70, release: true });
    cy.wait(1000);
    cy.get("#nuevo").click(500, 70);
    cy.wait(1000);
    cy.get("#nuevo").click(580, 350);
    cy.wait(1000);
  });
});
