import { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Label,
  Card,
  CardBody,
  Input,
  Button,
  CardTitle,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../App";
import { create } from "../../api/event-api";

const AddEvent = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    category: "Meetup",
    error: "",
  });
  const { userInfo } = useContext(UserContext);
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!values.title) {
      setValues({ ...values, error: "Please enter title!" });
      return false;
    }
    if (!values.description) {
      setValues({ ...values, error: "Please enter description!" });
      return false;
    }
    if (values.description.length > 100) {
      setValues({
        ...values,
        error: "Description must not exceed more than 100 characters!",
      });
      return false;
    }
    if (!values.price) {
      setValues({ ...values, error: "Please enter price!" });
      return false;
    }
    if (parseFloat(values.price) < 0) {
      setValues({
        ...values,
        error: "Price needs to be a positive number!",
      });
      return false;
    }
    if (!values.date) {
      setValues({ ...values, error: "Please enter date!" });
      return false;
    }
    if (!values.category) {
      setValues({ ...values, error: "Please choose category" });
      return false;
    }
    if (!image) {
      setValues({ ...values, error: "Please upload an image!" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    values.organizerId = userInfo.id;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("event", JSON.stringify(values));

    create(formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
          toast.success("The event was created successfully!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating an event!");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Card style={{ marginTop: "2rem", padding: "2em", marginBottom: "2rem" }}>
        <CardBody>
          <CardTitle
            tag="h3"
            style={{
              textAlign: "center",
              color: "#204e59",
            }}
          >
            Create your Event
          </CardTitle>

          <Form style={{ width: "300px", marginTop: "2rem" }}>
            <FormGroup>
              <Label for="image">Upload Image:</Label>
              <Input
                id="image"
                name="image"
                placeholder="Image"
                type="file"
                onChange={handleImageChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="title">Title:</Label>
              <Input
                id="title"
                name="title"
                placeholder="Event Title"
                type="text"
                value={values.title}
                onChange={handleChange("title")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Event Description:</Label>
              <Input
                id="description"
                name="description"
                placeholder="Event Description"
                type="textarea"
                value={values.description}
                onChange={handleChange("description")}
              />
            </FormGroup>

            <FormGroup>
              <Label for="price">Event Price:</Label>
              <Input
                id="price"
                name="price"
                placeholder="Event Price 0.00 BAM"
                type="number"
                min={0}
                step={0.01}
                value={values.price}
                onChange={handleChange("price")}
              />
            </FormGroup>

            <FormGroup>
              <Label for="date">Event Date</Label>
              <Input
                id="date"
                name="date"
                placeholder="mm/dd/yyy"
                type="date"
                value={values.date}
                onChange={handleChange("date")}
              />
            </FormGroup>

            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Category"
                type="select"
                value={values.category}
                onChange={(e) =>
                  setValues({ ...values, category: e.target.value })
                }
              >
                <option>Meetup</option>
                <option>Course</option>
              </Input>
            </FormGroup>

            {values.error && (
              <div style={{ color: "red" }} className="my-3 text-center">
                {values.error}
              </div>
            )}

            <Button
              style={{
                backgroundColor: "#cd3f30",
                width: 300,
                marginTop: "1em",
              }}
              onClick={handleSubmit}
            >
              Create Event
            </Button>
            <Button
              style={{
                backgroundColor: "#204e59",
                width: 300,
                marginTop: "1em",
              }}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddEvent;
