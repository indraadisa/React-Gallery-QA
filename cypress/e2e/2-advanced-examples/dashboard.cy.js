describe("Dashbord Page Test Cases", () => {
  it("Do Login With Correct Values", () => {
    cy.visit("http://localhost:3000");
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
  it("Found No Post for the First Time", () => {
    cy.contains("Found 0 photos");
  });

  it("Contains Images url and description input, and publish button", () => {
    //chack images
    const image = cy.get("input[name=image]");
    image.should("be.visible");
    image.should("have.attr", "type", "url");
    image.should("have.attr", "required", "required");
    image.should("have.attr", "placeholder", "Image URL");

    //chack description
    const desc = cy.get("input[name=desc]");
    desc.should("be.visible");
    desc.should("have.attr", "type", "text");
    desc.should("have.attr", "required", "required");
    desc.should("have.attr", "placeholder", "What's on your mind?");

    //check button
    const button = cy.get("button");
    button.should("be.visible");
    button.contains("Publish!");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Upload Some Photos", () => {
    const photos = [
      {
        imageValue:
          "https://images.unsplash.com/photo-1663911240934-c352569e3f57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ul9GeW4tR3d0bHd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        descriptionValue: "Image 1 : Bed Room",
      },

      {
        imageValue:
          "https://images.unsplash.com/photo-1664192579009-07ded37d50e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        descriptionValue: "Image 2 : Coffee",
      },
    ];

    photos.forEach(({ imageValue, descriptionValue }) => {
      const image = cy.get("input[name='image']");
      image.type(imageValue);

      const description = cy.get("input[name='desc']");
      description.type(descriptionValue);

      const button = cy.get("button");
      button.click();

      //check uploaded image is exist
      cy.get("img").should("have.attr", "src", imageValue);
      cy.contains(descriptionValue);
    });

    cy.contains(`Found ${photos.length} photos`);
  });
});
