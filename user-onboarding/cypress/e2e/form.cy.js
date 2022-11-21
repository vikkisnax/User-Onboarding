describe("test our form inputs", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });
    it("adds text to inputs and submits form", () => {
            //fill out form. remember to add data-cy to each input, for ex, in the Form comp
        cy.get('[data-cy="firstName"]')
            .type("Victoria")
            .should("have.value", "Victoria");
        //form validation error msg for lastName
        cy.get('#lastName')
            .type('k')
            .clear()
            .type('ok');
        cy.get('[data-cy="email"]')
            .type("vikki6688@gmail.com")
            .should("have.value", "vikki6688@gmail.com");
        cy.get('[data-cy="password"]')
            .type("qwerty")
            .should("have.value", "qwerty");
        //added form validation msg
        cy.get('[type="checkbox"]')
            //checks box
            .check()
            .uncheck()
            .check()
            .should("be.checked")

        //dropdown - show all 3 so form submits or the first two for error msg
        //get student value
        cy.get('#positions')
            .select(1)
            //invoke gets the value of the index that you selected
            .invoke("val")
            .should("eq", "Student");
        
        //get the choose one value so you get an error
        cy.get('#positions')
            .select(0)
            .invoke("val");

        //get student value again so form submits
        cy.get('#positions')
            .select(1)
            .invoke("val")
            .should("eq", "Student");

        //submit form -- make this fill out form in the end to see if submit works
        cy.get("[type=submit]")
            .click();
    });
})