context("Action", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("Comer Corazon y aumentar vida", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(501, 452);
    cy.wait(3600);
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(1100);
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(950);
  });
  it("Atacar y bajar vida a Bowser", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(501, 452);
    cy.wait(3600);
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(1100);
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(2000);
    cy.get("body").trigger("keyup", { keyCode: 68, release: true });
    cy.get("body").trigger("keyup", { keyCode: 87, release: true });
    cy.wait(1000);
    cy.get("body").trigger("keydown", { keyCode: 70, release: true });
    cy.get("body").trigger("keyup", { keyCode: 70, release: true });
  });
  it("Bajar la vida paiton", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(501, 452);
    cy.wait(3600);
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(1100);
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(2000);
    cy.get("body").trigger("keydown", { keyCode: 65, release: true });
    cy.wait(300);
    cy.get("body").trigger("keyup", { keyCode: 65, release: true });
    cy.get("body").trigger("keyup", { keyCode: 68, release: true });
    cy.get("body").trigger("keyup", { keyCode: 87, release: true });
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(6000);
  });
});
