import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { readUserRegistrations } from "../../api/registration-api";
import RegistrationCard from "./RegistrationCard";
import { onEvent } from "../../api/socket-api";

const RegistrationsDiv = styled.div`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    readUserRegistrations()
      .then((data) => {
        setRegistrations(data.registrations);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onEvent("Registration Request", () => {
      readUserRegistrations();
    });
  });

  return (
    <div className="container-lg" style={{ maxWidth: 1140 }}>
      {registrations.length > 0 ? (
        <RegistrationsDiv>
          {registrations.map((reg, index) => (
            <RegistrationCard
              key={index}
              reg={reg}
              registrations={registrations}
              setRegistrations={setRegistrations}
            />
          ))}
        </RegistrationsDiv>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "4rem",
          }}
        >
          <strong style={{ fontSize: "1.5em" }}>
            There are no registrations.
          </strong>
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
