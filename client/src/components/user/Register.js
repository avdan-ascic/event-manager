import { useState } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import { create } from "../../api/user-api"

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
  });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleRegister = () => {
    if (!values.firstName) {
      setValues({ ...values, error: "Please enter First Name!" });
      return;
    }
    if (!values.lastName) {
      setValues({ ...values, error: "Please enter Last Name!" });
      return;
    }

    if (!values.email) {
      setValues({ ...values, error: "Please enter Email!" });
      return;
    }

    if (!values.password) {
      setValues({ ...values, error: "Please enter Password" });
      return;
    }

    create(values)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
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
      <Card style={{ marginTop: "3rem", padding: "2em" }}>
        <CardBody>
          <div style={{ fontSize: "20px", marginTop: "1em" }}>
            Please
            <CardTitle
              tag="h5"
              style={{
                textAlign: "center",
                display: "inline",
                color: "#204e59",
                padding: "0 5px",
              }}
            >
              Register
            </CardTitle>
            for a new account
          </div>
          <Form style={{ width: "300px", marginTop: "2rem" }}>
            <FormGroup>
              <Input
                id="firstName"
                name="first name"
                placeholder="Your first name"
                type="text"
                value={values.firstName}
                onChange={handleChange("firstName")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="lastName"
                name="last name"
                placeholder="Your last name"
                type="text"
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="email"
                name="email"
                placeholder="Your email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="password"
                name="password"
                placeholder="Your password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
              />
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Button
              style={{
                backgroundColor: "#204e59",
                width: 300,
                marginTop: "1em",
              }}
              onClick={() => navigate("/login")}
            >
              Login instead?
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
