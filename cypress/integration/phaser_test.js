
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
});
