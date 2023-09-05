import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../App";
import { binaryToBase64 } from "../../helpers/image-format-converter";
import {
  create,
  readRegistration,
} from "../../api/registration-api";
import { remove } from "../../api/event-api";

const EventCard = ({ event, events, setEvents }) => {
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");
  const { userInfo } = useContext(UserContext);

  const handleRemove = () => {
    remove(event._id)
      .then(() => {
        setEvents(events.filter((ev) => ev._id !== event._id));
        toast.success("The event was deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred when deleting the event!");
      });
  };

  const handleSubmit = () => {
    create({ userId: userInfo.id }, event._id)
      .then(() => {
        setRegistrationStatus("pending");
        toast.success(
          `The request for the event ${event.title} was successful!`
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `The request for the event ${event.title} was not successful!`
        );
      });
  };

  useEffect(() => {
    if (userInfo.id) {
      if (event.organizerId === userInfo.id) {
        return setIsOrganizer(true);
      } else {
        setIsOrganizer(false);
        readRegistration({ userId: userInfo?.id }, event._id)
          .then((data) => {
            if (data.registration === null) return setRegistrationStatus("");

            if (data.registration.isPending)
              return setRegistrationStatus("pending");
            else {
              if (data.registration.isApproved)
                return setRegistrationStatus("approved");
              else return setRegistrationStatus("rejected");
            }
          })
          .catch((err) => console.log(err));
      }
    }
    // eslint-disable-next-line
  }, [userInfo.id, event]);

  return (
    <Card
      style={{
        width: 320,
        height: 480,
        position: "relative",
      }}
    >
      <img
        alt="Event"
        src={`data:${event.image.contentType};base64,${binaryToBase64(
          event.image.data.data
        )}`}
        style={{
          width: 320,
          height: 250,
        }}
      />

      <CardBody>
        <CardTitle tag="h5">{event.title}</CardTitle>
        <CardText>
          <strong>Event Date: </strong>
          {format(new Date(event.date), "dd/MM/yyyy")}
          <br />
          <strong>Event Price: </strong>BAM {parseFloat(event.price).toFixed(2)}
          <br />
          <strong>Event Description: </strong>
          {event.description}
          <br />
        </CardText>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            bottom: "5px",
            width: "89%",
          }}
        >
          {isOrganizer && (
            <Button className="btn btn-danger w-100" onClick={handleRemove}>
              Delete
            </Button>
          )}
          {!isOrganizer && (
            <>
              {registrationStatus === "" && (
                <Button
                  className="btn w-100 mt-2"
                  style={{ backgroundColor: "#204e59" }}
                  onClick={handleSubmit}
                >
                  Registration Request
                </Button>
              )}
              {registrationStatus === "pending" && (
                <Button
                  className="btn w-100 mt-2"
                  style={{ backgroundColor: "#204e59" }}
                  disabled
                >
                  Pending Answer
                </Button>
              )}
              {registrationStatus === "approved" && (
                <Button className="btn btn-success w-100 mt-2" disabled>
                  Registration Approved
                </Button>
              )}
              {registrationStatus === "rejected" && (
                <Button className="btn btn-danger w-100 mt-2" disabled>
                  Registration Rejected
                </Button>
              )}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default EventCard;
