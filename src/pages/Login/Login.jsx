import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Form, Button, Alert } from "react-bootstrap";
import GirlImage from "../../icons/image.png";
import Logo from "../../icons/icons.JPG";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, with 1 capital letter, 1 number, and 1 symbol."
      );
      return;
    }
    setError("");
    navigate("/home");
  };

  const handleChange = (e) => {
    // console.log(e);
    setSignIn(e.target.checked);
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2 style={{ fontFamily: "serif", fontWeight: "bolder" }}>Sign In</h2>
        <p>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            New user?
          </span>{" "}
          <span
            style={{ fontSize: "12px", fontWeight: "bold", color: "#3489eb" }}
          >
            Create account
          </span>
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Username or email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Keep me signed in"
              onChange={(e) => handleChange(e)}
              style={{ margin: "1rem 0" }}
              value={signIn}
            />
          </Form.Group>
          <Button type="submit">Sign In</Button>
          <p className="footer">__________ Or Sign In with __________</p>
          <div className="text-center">
            <img
              src={Logo}
              alt="Logo"
              style={{ cursor: "pointer", width: "90%" }}
            />
          </div>
        </Form>
      </div>
      <div className="image-container">
        <img
          src={GirlImage}
          alt="Girl Walking"
          style={{ width: "350px", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Login;
