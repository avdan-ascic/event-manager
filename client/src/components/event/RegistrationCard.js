import { Button } from "reactstrap";
import styled from "@emotion/styled";
import { format } from "date-fns";

import { approve, reject } from "../../api/registration-api";

const StyledCard = styled.div`
  width: 600px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #204e59;
  color: #fff;
  margin-bottom: 1rem;
  opacity: ${(props) => (props.pending ? "1" : ".7")};

  @media (max-width: 799px) {
    width: 300px;
  }
`;
const DisplayData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 799px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const DisplayButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RegistrationCard = ({ reg, registrations, setRegistrations }) => {
  const handleApprove = () => {
    approve(reg._id)
      .then(() => {
        let tempRegs = [...registrations];
        let currentReg = { ...reg };
        currentReg.isPending = false;
        currentReg.isApproved = true;

        tempRegs[tempRegs.findIndex((r) => r._id === reg._id)] = currentReg;
        setRegistrations(tempRegs);
      })
      .catch((err) => console.log(err));
  };

  const handleReject = () => {
    reject(reg._id)
      .then(() => {
        let tempRegs = [...registrations];
        let currentReg = { ...reg };
        currentReg.isPending = false;
        currentReg.isApproved = false;

        tempRegs[tempRegs.findIndex((r) => r._id === reg._id)] = currentReg;
        setRegistrations(tempRegs);
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledCard pending={reg.isPending}>
      <h5>{reg.eventId.title}</h5>
      <DisplayData>
        <div>
          <strong>Event Date: </strong>
          {format(new Date(reg.eventId.date), "dd/MM/yyyy")}
        </div>
        <div>
          <strong>Event Price: </strong>BAM {parseFloat(reg.eventId.price).toFixed(2)}
        </div>
        <div>
          <strong>User Email: </strong>
          {reg.userId.email}
        </div>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <strong>Status: </strong>
          {reg.isPending === true ? (
            <div style={{ color: "blue" }}>Pending</div>
          ) : reg.isApproved === true ? (
            <div style={{ color: "green" }}>Approved</div>
          ) : (
            <div style={{ color: "red" }}>Rejected</div>
          )}
        </div>
      </DisplayData>
      <DisplayButtons>
        <Button
          className="btn btn-success"
          style={{width:200}}
          disabled={!reg.isPending}
          onClick={handleApprove}
        >
          Approve
        </Button>
        <Button
          className="btn btn-danger"
          style={{width:200}}
          disabled={!reg.isPending}
          onClick={handleReject}
        >
          Reject
        </Button>
      </DisplayButtons>
    </StyledCard>
  );
};

export default RegistrationCard;
