describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("Verifica o título da aplicação", () => {
    cy.title().should("be.eq", "Central de Atendimento ao Cliente TAT");
  });

  //Custom Commands with no arguments
  it("Preenche os campos obrigatórios e envia o formulário com comandos customizados #1", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success > strong").as("successMessage");

    cy.get("@successMessage").should("be.visible");
    cy.tick(3000);
    cy.get("@successMessage").should("not.be.visible");
  });

  //Custom Commands with arguments
  it("Preenche os campos obrigatórios e envia o formulário com comandos customizados #2", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmitWithArgs(
      "Rafael",
      "Costa",
      "rafael@example.com",
      "Teste de mensagem"
    );
    cy.get(".success > strong").as("successMessage");

    cy.get("@successMessage").should("be.visible");
    cy.tick(3000);
    cy.get("@successMessage").should("not.be.visible");
  });

  // Custom Commands with arguments as object and default values
  it("Preenche os campos obrigatórios e envia o formulário com comandos customizados #3", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmitWithArgsAsObjectAndDefaultValues({});
    cy.get(".success > strong").as("successMessage");

    cy.get("@successMessage").should("be.visible");
    cy.tick(3000);
    cy.get("@successMessage").should("not.be.visible");
  });

  // Custom Commands with arguments as object
  it("Preenche os campos obrigatórios e envia o formulário com comandos customizados #4", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmitWithArgsAsObject({
      firstName: "Rafael",
      lastName: "Costa",
      email: "rafael@example.com",
      message: "Teste de mensagem",
    });
    cy.get(".success > strong").as("successMessage");

    cy.get("@successMessage").should("be.visible");
    cy.tick(3000);
    cy.get("@successMessage").should("not.be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();
    cy.get("#firstName").should("be.visible").type("Rafael");
    cy.get("#lastName").should("be.visible").type("Costa");
    cy.get("#email").should("be.visible").type("rafael");
    cy.get("#open-text-area")
      .should("be.visible")
      .type("Teste de mensagem", { delay: 0 });
    cy.contains("button", "Enviar").should("be.visible").click();
    cy.get(".error").as("errorMessage");

    cy.get("@errorMessage").should("be.visible");
    cy.tick(3000);
    cy.get("@errorMessage").should("not.be.visible");
  });

  Cypress._.times(3, () => {
    it("Exibe o campo telefone vazio ao digitar um valor não-numérico ", () => {
      cy.get("#phone").type("a").should("have.value", "");
    });
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();
    cy.get("#firstName").should("be.visible").type("Rafael");
    cy.get("#lastName").should("be.visible").type("Costa");
    cy.get("#email").should("be.visible").type("rafael@example.com");
    cy.get("#phone-checkbox").should("be.visible").check();
    cy.contains("button", "Enviar").should("be.visible").click();
    cy.get(".error").as("errorMessage");

    cy.get("@errorMessage").should("be.visible");
    cy.tick(3000);
    cy.get("@errorMessage").should("not.be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").as("firstName").should("be.visible").type("Rafael");
    cy.get("@firstName").should("have.value", "Rafael");
    cy.get("@firstName").clear();
    cy.get("@firstName").should("have.value", "");

    cy.get("#lastName").as("lastName").should("be.visible").type("Costa");
    cy.get("@lastName").should("have.value", "Costa");
    cy.get("@lastName").clear();
    cy.get("@lastName").should("have.value", "");

    cy.get("#email")
      .as("email")
      .should("be.visible")
      .type("rafael@example.com");
    cy.get("@email").should("be.visible");
    cy.get("@email").clear();
    cy.get("@email").should("have.value", "");

    cy.get("#phone").as("phone").should("be.visible").type("123456789");
    cy.get("@phone").should("be.visible");
    cy.get("@phone").clear();
    cy.get("@phone").should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();
    cy.contains("button", "Enviar").should("be.visible").click();
    cy.get(".error").as("errorMessage");

    cy.get("@errorMessage").should("be.visible");
    cy.tick(3000);
    cy.get("@errorMessage").should("not.be.visible");
  });

  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.contains("select", "Selecione")
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it("Seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Seleciona um produto (Blog) por seu índice", () => {
    cy.get("select[id=product]").select(1).should("have.value", "blog");
  });

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get("input[type='radio'][value='feedback']")
      .check()
      .should("be.checked");
  });

  it("Marca cada tipo de atendimento", () => {
    /* Before using each/wrap
    cy.get("input[value='ajuda']").check().should("be.checked");
    cy.get("input[value='elogio']").check().should("be.checked");
    cy.get("input[value='feedback']").check().should("be.checked"); */
    cy.get("input[type=radio]").each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });

  it("Marca ambos checkboxes, depois desmarca o último", () => {
    cy.get("input[type=checkbox]")
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("be.not.checked");
  });

  it("Seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[id='file-upload']")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("Seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[id='file-upload']")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json", null).as("myFixture");
    cy.get("input[id='file-upload']")
      .selectFile("@myFixture")
      .should((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "target", "_blank")
      .and("have.attr", "href", "privacy.html");
  });

  it("Acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();
    cy.title().should(
      "be.eq",
      "Central de Atendimento ao Cliente TAT - Política de Privacidade"
    );
  });

  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("Preenche o campo da área de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "um texto qualquer")
      .should("have.value", "um texto qualquer");
  });

  it("Faz uma requisição HTTP", () => {
    cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
      .as("getRequest")
      .its("status")
      .should("be.equal", 200);

    cy.get("@getRequest").its("statusText").should("be.equal", "OK");
    cy.get("@getRequest").its("body").should("include", "CAC TAT");
  });
});
