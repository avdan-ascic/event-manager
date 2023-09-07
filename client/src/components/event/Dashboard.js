import { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { UserContext } from "../../App";
import { readAll } from "../../api/event-api";
import EventCard from "./EventCard";
import { onEvent } from "../../api/socket-api";
import NotificationCard from "./NotificationCard";

const CardsGrid = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, 490px);
  justify-items: center;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, 490px);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(1, 490px);
  }
`;
const NotificationArea = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dropdownOption, setDropdownOption] = useState("All Events");
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    readAll()
      .then((data) => {
        setEvents(data.events);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onEvent("Registration Request", (data) => {
      setNotifications([...notifications, { ...data, status: "request" }]);
    });

    onEvent("Registration Approved", (data) => {
      setNotifications([...notifications, { ...data, status: "approval" }]);
      readAll();
    });

    onEvent("Registration Rejected", (data) => {
      setNotifications([...notifications, { ...data, status: "rejection" }]);
      readAll();
    });
  });

  

  useEffect(() => {
    if (events.length > 0) {
      if (dropdownOption === "All Events") {
        setSelectedEvents(events);
      } else if (dropdownOption === "My Events") {
        setSelectedEvents(
          events.filter((ev) => ev.organizerId === userInfo.id)
        );
      } else if (dropdownOption === "Courses") {
        setSelectedEvents(events.filter((ev) => ev.category === "Course"));
      } else if (dropdownOption === "Meetups") {
        setSelectedEvents(events.filter((ev) => ev.category === "Meetup"));
      }
    }
    // eslint-disable-next-line
  }, [dropdownOption, events]);


  return (
    <div className="container-lg" style={{ maxWidth: 1140 }}>
      {notifications.length > 0 && (
        <NotificationArea>
          {notifications.map((notification, index) => (
            <NotificationCard
              key={index}
              notification={notification}
              events={events}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          ))}
        </NotificationArea>
      )}

      <div style={{ marginTop: "2em" }}>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
          direction="down"
        >
          <DropdownToggle caret style={{ backgroundColor: "#204e59" }}>
            Filter
          </DropdownToggle>
          <DropdownMenu style={{ backgroundColor: "#204e59" }}>
            <DropdownItem
              style={{ color: "#fff", backgroundColor: "transparent" }}
              onClick={() => setDropdownOption("All Events")}
            >
              All Events
            </DropdownItem>
            <DropdownItem
              style={{ color: "#fff", backgroundColor: "transparent" }}
              onClick={() => setDropdownOption("My Events")}
            >
              My Events
            </DropdownItem>
            <DropdownItem
              style={{ color: "#fff", backgroundColor: "transparent" }}
              onClick={() => setDropdownOption("Courses")}
            >
              Courses
            </DropdownItem>
            <DropdownItem
              style={{ color: "#fff", backgroundColor: "transparent" }}
              onClick={() => setDropdownOption("Meetups")}
            >
              Meetups
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="container-lg" style={{ maxWidth: 1140 }}>
        {selectedEvents.length > 0 ? (
          <CardsGrid>
            {selectedEvents.map((event, index) => (
              <EventCard
                key={event._id}
                event={event}
                setEvents={setEvents}
                events={events}
                notifications={notifications}
              />
            ))}
          </CardsGrid>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            <strong style={{ fontSize: "1.5em" }}>There are no events.</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
