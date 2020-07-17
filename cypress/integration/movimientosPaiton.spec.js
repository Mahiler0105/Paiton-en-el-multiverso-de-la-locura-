context("Action", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("Avanzar", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(505, 451);
    cy.wait(5000);
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(1000);
  });
  it("Retroceder", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(505, 451);
    cy.wait(5000);
    cy.get("body").trigger("keydown", { keyCode: 68, release: true });
    cy.wait(1000);
    cy.get("body").trigger("keydown", { keyCode: 65, release: true });
    cy.wait(1000);
  });
  it("Saltar", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(505, 451);
    // cy.get("#nuevo").click(500, 450);
    cy.wait(5000);
    // cy.reload();
    cy.get("body").trigger("keydown", { keyCode: 87, release: true });
    cy.wait(2000);
  });
  it("Agacharse", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(505, 451);
    cy.wait(5000);
    // cy.reload();
    cy.get("body").trigger("keydown", { keyCode: 83, release: true });
    cy.wait(2000);
  });
  it("Lanzar Poder", () => {
    cy.get("#nuevo").click(500, 450);
    cy.get("#nuevo").click(505, 451);
    cy.wait(5000);
    cy.get("body").trigger("keydown", { keyCode: 70, release: true });
    cy.wait(1000);
  });

  // it("Secuencia Paiton", () => {
  //   cy.get("#nuevo").click(500, 450);
  //   cy.get("#nuevo").click(500, 450);
  //   cy.get("#nuevo").click(500, 450);
  //   cy.wait(3600);
  //   cy.get("body").trigger("keydown", { keyCode: 68, release: true });
  //   cy.wait(1100);
  //   cy.get("body").trigger("keydown", { keyCode: 87, release: true });
  //   cy.wait(2000);
  //   cy.get("body").trigger("keydown", { keyCode: 65, release: true });
  //   cy.wait(250);
  //   cy.get("body").trigger("keyup", { keyCode: 65, release: true });
  //   cy.get("body").trigger("keyup", { keyCode: 68, release: true });
  //   cy.get("body").trigger("keyup", { keyCode: 87, release: true });
  //   cy.get("body").trigger("keydown", { keyCode: 68, release: true });
  //   cy.get("body").trigger("keydown", { keyCode: 87, release: true });
  //   cy.wait(6000);
  // });
});
