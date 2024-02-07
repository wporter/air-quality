import Error from "@/components/Error";

describe("Tag", () => {
  it("ACTIVE", () => {
    cy.mount(<Error status="404" name="Page Not Found." />);

    cy.get('[data-cy="ACTIVE-tag"]').contains("ACTIVE");
    cy.get('[data-cy="ACTIVE-tag"]').should("have.class", "bg-status-green");
  });
});
