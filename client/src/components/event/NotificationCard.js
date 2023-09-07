import { Button } from "reactstrap";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

import { approve, reject } from "../../api/registration-api";

const StyledCard = styled.div`
  width: 500px;
  background-color: #204e59;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.2rem;
`;

const DisplayButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
`;

const NotificationCard = ({
  notification,
  notifications,
  setNotifications,
  events,
}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(
      events[events.findIndex((ev) => ev._id === notification.eventId)].title
    );
    // eslint-disable-next-line
  }, [notification]);

  const handleApprove = () => {
    approve(notification.id)
      .then(() => {
        setNotifications(
          notifications.filter((notif) => notif.id !== notification.id)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleReject = () => {
    reject(notification.id)
      .then(() => {
        setNotifications(
          notifications.filter((notif) => notif.id !== notification.id)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = () => {
    setNotifications(
      notifications.filter((notif) => notif.id !== notification.id)
    );
  };

  return (
    <StyledCard>
      {notification.status === "request" ? (
        <>
          <div style={{ color: "#fff" }}>
            <strong>{notification.email}</strong> is requesting to register to
            your event <strong>{title}</strong>.
          </div>
          <DisplayButtons>
            <Button className="btn btn-success" style={{width:200}} onClick={handleApprove}>
              Approve
            </Button>
            <Button className="btn btn-danger" style={{width:200}} onClick={handleReject}>
              Reject
            </Button>
          </DisplayButtons>
        </>
      ) : (
        <>
          <div style={{ color: "#fff" }}>
            Your request for <strong>{title}</strong> was
            {notification.status === "approval" ? (
              <strong style={{ color: "green" }}> approved</strong>
            ) : (
              <strong style={{ color: "red" }}> rejected</strong>
            )}
            .
          </div>
          <DisplayButtons>
            <Button
              className="btn"
              style={{ backgroundColor: "#127ea3" }}
              onClick={handleRemove}
            >
              Remove
            </Button>
          </DisplayButtons>
        </>
      )}
    </StyledCard>
  );
};

export default NotificationCard;
