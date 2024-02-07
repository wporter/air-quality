import Error from "@/components/Error";

describe("Tag", () => {
  it("404 Page Not Found", () => {
    cy.mount(<Error status="404" name="Page Not Found." />);

    cy.get('[data-cy="error-status"]').contains("404");
    cy.get('[data-cy="error-name"]').contains("Page Not Found.");
  });

  it("500 Internal Server Error", () => {
    cy.mount(<Error status="500" name="Internal Server Error" />);

    cy.get('[data-cy="error-status"]').contains("500");
    cy.get('[data-cy="error-name"]').contains("Internal Server Error");
  });

  it("000 Custom Error", () => {
    cy.mount(
      <Error status="000" name="Custom Error" message="Custom Message" />,
    );

    cy.get('[data-cy="error-status"]').contains("000");
    cy.get('[data-cy="error-name"]').contains("Custom Error");
    cy.get('[data-cy="error-message"]').contains("Custom Message");
  });
});
