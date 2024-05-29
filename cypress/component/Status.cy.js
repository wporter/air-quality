import Status from "@/components/researcher/dashboard/Status.jsx";
import { MdOutlineSignalWifi4Bar } from "react-icons/md";
import { MdOutlineNetworkWifi1Bar } from "react-icons/md";

describe("Status", () => {
  it("Sensors Online", () => {
    cy.mount(
      <Status
        bg="bg-sensor-green"
        value="14"
        text="Sensors Online"
        Icon={MdOutlineSignalWifi4Bar}
        color="text-air-grey"
      />,
    );

    cy.get('[data-cy="status-value-14"]').contains("14");
    cy.get('[data-cy="status-value-14"]').contains("Sensors Online");
    cy.get('[data-cy="status-value-14"]').should(
      "have.class",
      "bg-sensor-green",
    );
  });

  it("Sensors Offline", () => {
    cy.mount(
      <Status
        bg="bg-sensor-red"
        value="0"
        text="Sensors Offline"
        Icon={MdOutlineNetworkWifi1Bar}
        color="text-air-grey"
      />,
    );

    cy.get('[data-cy="status-value-0"]').contains("0");
    cy.get('[data-cy="status-value-0"]').contains("Sensors Offline");
    cy.get('[data-cy="status-value-0"]').should("have.class", "bg-sensor-red");
  });
});
