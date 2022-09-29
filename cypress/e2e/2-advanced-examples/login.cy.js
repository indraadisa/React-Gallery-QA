describe("Login Page Test Case", () => {
  it("Visit Login Page", () => {
    cy.visit("http://localhost:3000");
    cy.title().should("eq", "React Gallery");
    cy.contains("Hello Again");
  });

  it("Contains Email and Password, Input, and Login Button", () => {
    //Cek Email
    const email = cy.get("input[name='email']");
    email.should("be.visible");
    email.should("have.attr", "type", "email");
    email.should("have.attr", "placeholder", "Email Address");

    //Cek Password
    const password = cy.get("input[name='password']");
    password.should("be.visible");
    password.should("have.attr", "type", "password");
    password.should("have.attr", "placeholder", "Password");

    //Cek Button
    const button = cy.get("button");
    button.should("be.visible");
    button.contains("Login");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Do Login with Null Values", () => {
    //button
    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("login failed");
    });
  });

  it("Do Login With Wrong Values", () => {
    //Salah email
    const email = cy.get("input[name='email']");
    email.type("wrong@react.test");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("login failed");
    });
  });

  it("Do Login With Correct Values", () => {
    //Login Sukses
    const email = cy.get("input[name='email']");
    email.type("user@react.test");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("welcome");
    });

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });
});
