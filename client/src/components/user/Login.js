import { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Card,
  Input,
  Button,
  CardBody,
  CardTitle,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import { emitEvent } from "../../api/socket-api";
import { UserContext } from "../../App";
import { login } from "../../api/user-api"

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const { setLoggedIn, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    if (!values.email) {
      setValues({ ...values, error: "Please enter email!" });
      return;
    }
    if (!values.password) {
      setValues({ ...values, error: "Please enter password!" });
      return;
    }

    login(values)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
          setLoggedIn(true);
          setUserInfo({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
          });
          emitEvent("setup", data.user.id);
          navigate("/dashboard");
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
              Login
            </CardTitle>
            into your account
          </div>
          <Form style={{ width: "300px", marginTop: "2rem" }}>
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              style={{
                backgroundColor: "#204e59",
                width: 300,
                marginTop: "1em",
              }}
              onClick={() => navigate("/register")}
            >
              New Account
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
