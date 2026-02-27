import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./Login.css";
import logo from "../../assets/images/logo.png";
import { adminLogin, resetPassword, sendOtp, verifyOtp } from "../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.admin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep] = useState(1);
  // 1 = Email
  // 2 = OTP
  // 3 = Reset Password

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ username: email, password }));
    navigate("/superAdmin");
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(sendOtp(email)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setStep(2);
      }
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email, otp })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setStep(3);
      }
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email, newPassword, confirmPassword }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setShowForgot(false);
          setStep(1);
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-box ">
        {/* LOGO */}
        <div className="login-logo text-center ">
          <img src={logo} className="login-logo-img" alt="login" />
        </div>

        {!showForgot ? (
          <>
            {/* <h2 className="login-heading">Sign In</h2> */}
            <p className="login-desc">
              Welcome back! Please login to your account
            </p>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
            <Link className="forgot-link" onClick={() => setShowForgot(true)}>
              Forgot Password?
            </Link>
          </>
        ) : (
          <>
            {step === 1 && (
              <Form onSubmit={handleSendOtp}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button className="login-btn" type="submit" disabled={loading}>
                  Send OTP
                </Button>
              </Form>
            )}

            {step === 2 && (
              <Form onSubmit={handleVerifyOtp}>
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(Number((e.target.value)))}
                  />
                </Form.Group>

                <Button className="login-btn" type="submit" disabled={loading}>
                  Verify OTP
                </Button>
              </Form>
            )}

            {step === 3 && (
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button className="login-btn" type="submit" disabled={loading}>
                  Reset Password
                </Button>
              </Form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
