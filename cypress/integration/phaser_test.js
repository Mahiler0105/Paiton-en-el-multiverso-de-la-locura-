
context("Action", () => {
  beforeEach(() => {
    cy.viewport(1300, 900);
    cy.visit("http://127.0.0.1:5500/");
  });
  it("Secuencia Paiton", () => {
    cy.get("#nuevo").click(600, 500);
    cy.get("#nuevo").click(600, 500);
    cy.wait(3600);
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(1100);
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(2000);
    cy.get("body").trigger("keydown", { keyCode: 65, release: true });
    cy.wait(250);
    cy.get("body").trigger("keyup", { keyCode: 65, release: true });
    cy.get("body").trigger("keyup", { keyCode: 68, release: true });
    cy.get("body").trigger("keyup", { keyCode: 87, release: true });
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(6000);
  });
  it("Cargar mapa", () => {
    cy.get("#nuevo").click(600, 500);
    cy.get("#nuevo").click(600, 500);
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(4000);
    // cy.get("body").trigger("keyup", { keyCode: 68, release: true });
    // cy.get("#nuevo").trigger("keydown", { keyCode: 100, release: true });
    // cy.get("#nuevo").trigger("keydown", { keyCode: 100, release: true });
    // cy.get("#nuevo").window.
  });
  it("Pausar juego", () => {
    cy.get("#nuevo").click(600, 500);
    cy.get("#nuevo").click(600, 500);
    cy.wait(2000);
    // cy.reload();
    cy.get("body").trigger("keydown", { keyCode: 70, release: true });
    cy.wait(1000);
    cy.get("#nuevo").click(600, 70);
    cy.get("#nuevo").click(600, 70);
    cy.get("#nuevo").click(600, 70);
  });
  it("Avanzar adelante", () => {
    cy.get("#nuevo").click(600, 500);
    cy.get("#nuevo").click(600, 500);
    cy.wait(5000);
    // cy.reload();
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(1000);
  });
  it("Saltar", () => {
    cy.get("#nuevo").click(600, 500);
    cy.get("#nuevo").click(600, 500);
    cy.wait(5000);
    // cy.reload();
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(1000);
  });
  it("Lanzar Poder", () => {
    cy.get("#nuevo").click(600, 500);
    cy.get("#nuevo").click(600, 500);
    cy.wait(5000);
    // cy.reload();
    cy.get("body").trigger("keydown", { keyCode: 70, release: true });
    cy.wait(1000);
  });
});
