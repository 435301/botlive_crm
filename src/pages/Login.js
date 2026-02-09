import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./Login.css";
import logo from "../assets/images/logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div className="login-page">
      <div className="login-box ">
        {/* LOGO */}
        <div className="login-logo text-center ">
          <img src={logo} className="login-logo-img" />
        </div>

        {!showForgot ? (
          <>
            {/* <h2 className="login-heading">Sign In</h2> */}
            <p className="login-desc">
              Welcome back! Please login to your account
            </p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <Button
                    className="eye-btn"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className="login-options">
                <Form.Check label="Remember me" />
                <span
                  className="forgot-link"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot password?
                </span>
              </div>

              <Button className="login-btn" type="submit">
                Login
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h2 className="login-heading">Forgot Password</h2>
            <p className="login-desc">
              Enter your email to reset your password
            </p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter registered email"
                />
              </Form.Group>

              <Button className="login-btn" type="submit">
                Send Reset Link
              </Button>
            </Form>

            <p className="login-footer" onClick={() => setShowForgot(false)}>
              ← Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
