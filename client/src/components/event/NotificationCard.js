import { Button } from "reactstrap";
import styled from "@emotion/styled";

import { approve, reject } from "../../api/registration-api";

const StyledCard = styled.div`
  width: 500px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #204e59;
  margin-bottom: 1rem;
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

const NotificationCard = ({
  notification,
  notifications,
  setNotifications,
}) => {
  const handleApprove = () => {
    approve(notification._id)
      .then(() => {
        let tempRegs = [...notifications];
        let currentReg = { ...notification };
        currentReg.isPending = false;
        currentReg.isApproved = true;

        tempRegs[tempRegs.findIndex((r) => r._id === notification._id)] =
          currentReg;
        setNotifications(tempRegs);
      })
      .catch((err) => console.log(err));
  };

  const handleReject = () => {
    reject(notification._id)
      .then(() => {
        let tempRegs = [...notifications];
        let currentReg = { ...notification };
        currentReg.isPending = false;
        currentReg.isApproved = false;

        tempRegs[tempRegs.findIndex((r) => r._id === notification._id)] =
          currentReg;
        setNotifications(tempRegs);
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledCard pending={notification.isPending}>
      <DisplayData>
        <div style={{ color: "#fff" }}>
          <strong> {notification.userId.email} </strong>
          is requesting to register to your event
          <strong> {notification.eventId.title}</strong>
        </div>
        <div style={{ display: "flex", gap: ".5rem" }}></div>
      </DisplayData>
      <DisplayButtons>
        <Button
          className="btn btn-success"
          style={{ width: 200 }}
          disabled={!notification.isPending}
          onClick={handleApprove}
        >
          Approve
        </Button>
        <Button
          className="btn btn-danger"
          style={{ width: 200 }}
          disabled={!notification.isPending}
          onClick={handleReject}
        >
          Reject
        </Button>
      </DisplayButtons>
    </StyledCard>
  );
};

export default NotificationCard;
