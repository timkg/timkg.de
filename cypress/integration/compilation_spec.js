describe("Compilation page on wide screens", function () {
    
    beforeEach(function () {
        cy.viewport('macbook-13')
    })

    it("has a table of contents", function () {
        cy.visit("http://localhost:8000/compilation/")
        cy.get("nav").should("be.visible");
    })

    describe("the table of contents", function () {

        it("has a link back to the homepage", function () {
            cy.visit("http://localhost:8000/compilation/")
            cy.get("nav").find('[href="/"]').should("be.visible");
        })

    })

    it("has no back link at the bottom", function () {
        cy.visit("http://localhost:8000/compilation/")
        cy.get(".back").should("not.be.visible");
    })

})

describe("Compilation page on narrow screens", function () {
    
    beforeEach(function () {
        cy.viewport('iphone-6')
    })

    it("has no table of contents", function () {
        cy.visit("http://localhost:8000/compilation/")
        cy.get("nav").should("not.be.visible");
    })


    it("has a back link at the bottom", function () {
        cy.visit("http://localhost:8000/compilation/")
        cy.get(".back").should("be.visible");
    })
    
})
