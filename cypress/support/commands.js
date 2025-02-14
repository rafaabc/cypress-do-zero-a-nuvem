//No Arguments
Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").should("be.visible").type("Rafael");
  cy.get("#lastName").should("be.visible").type("Costa");
  cy.get("#email").should("be.visible").type("rafael@example.com");
  cy.get("#open-text-area")
    .should("be.visible")
    .type("Teste de mensagem", { delay: 0 });
  cy.contains("button", "Enviar").should("be.visible").click();
});

//With Arguments
Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmitWithArgs",
  (firstName, lastName, email, message) => {
    cy.get("#firstName").should("be.visible").type(firstName);
    cy.get("#lastName").should("be.visible").type(lastName);
    cy.get("#email").should("be.visible").type(email);
    cy.get("#open-text-area").should("be.visible").type(message, { delay: 0 });
    cy.contains("button", "Enviar").should("be.visible").click();
  }
);

//With Arguments as Object and Default Values
Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmitWithArgsAsObjectAndDefaultValues",
  (data = {}) => {
    const {
      firstName = "Rafael",
      lastName = "Costa",
      email = "rafael@example.com",
      message = "Teste de mensagem",
    } = data;
    cy.get("#firstName").should("be.visible").type(firstName);
    cy.get("#lastName").should("be.visible").type(lastName);
    cy.get("#email").should("be.visible").type(email);
    cy.get("#open-text-area").should("be.visible").type(message, { delay: 0 });
    cy.contains("button", "Enviar").should("be.visible").click();
  }
);

//With Arguments as Object
Cypress.Commands.add("fillMandatoryFieldsAndSubmitWithArgsAsObject", (data) => {
  cy.get("#firstName").should("be.visible").type(data.firstName);
  cy.get("#lastName").should("be.visible").type(data.lastName);
  cy.get("#email").should("be.visible").type(data.email);
  cy.get("#open-text-area")
    .should("be.visible")
    .type(data.message, { delay: 0 });
    cy.contains("button", "Enviar").should("be.visible").click();
});
