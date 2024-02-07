const { default: Tag } = require("@/components/researcher/Tag");

describe("Tag", () => {
  it("ACTIVE", () => {
    cy.mount(<Tag text="ACTIVE" color="1" />);

    cy.get('[data-cy="ACTIVE-tag"]').contains("ACTIVE");
    cy.get('[data-cy="ACTIVE-tag"]').should("have.class", "bg-status-green");
  });

  it("INACTIVE", () => {
    cy.mount(<Tag text="INACTIVE" color="0" />);

    cy.get('[data-cy="INACTIVE-tag"]').contains("INACTIVE");
    cy.get('[data-cy="INACTIVE-tag"]').should("have.class", "bg-status-red");
  });

  it("TRUE", () => {
    cy.mount(<Tag text="TRUE" color="1" />);

    cy.get('[data-cy="TRUE-tag"]').contains("TRUE");
    cy.get('[data-cy="TRUE-tag"]').should("have.class", "bg-status-green");
  });

  it("FALSE", () => {
    cy.mount(<Tag text="FALSE" color="0" />);

    cy.get('[data-cy="FALSE-tag"]').contains("FALSE");
    cy.get('[data-cy="FALSE-tag"]').should("have.class", "bg-status-red");
  });
});
