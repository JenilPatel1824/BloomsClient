import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import { Button, TextField, Typography, Container, Grid, Alert, Paper } from "@mui/material";
import { BiUser, BiLock } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha"; // Import Google reCAPTCHA
import "./Signin.css";



let luname = null;

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [captchaValue, setCaptchaValue] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const slideIn = useSpring({
    opacity: 1,
    transform: "translateY(0%)",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    from: { opacity: 0, transform: "translateY(-20%)", boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
  });

  const backgroundParallax = useSpring({
    from: { transform: "translate3d(0, 0, 0)" },
    to: async (next, cancel) => {
      await next({ transform: "translate3d(0, 10%, 0)" });
    },
    config: config.gentle,
    reset: true,
  });

  useEffect(() => {
    if (location.state && location.state.registrationSuccess) {
      setRegistrationSuccessMessage(
        "Registration successful! Please wait until you are verified by higher authority"
      );

      const timeoutId = setTimeout(() => {
        setRegistrationSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [location.state]);



  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    if (!username || !password || !captchaValue) {
      window.alert("Please complete all fields and the captcha.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Assuming you have a server endpoint for login verification
    const res = await fetch(`${process.env.REACT_APP_API_URL}`+"/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        captchaValue,
      }),
    });

    const data = await res.json();

    if (res.status === 401) {
      window.alert("Incorrect username or password");
      navigate("/login");
    } else if (res.status === 200) {
      sessionStorage.setItem("authToken", data.authToken);
      navigate("/home");
    } else if (res.status === 201) {
      luname = data.username;
      sessionStorage.setItem("studentToken", data.studentToken);
      navigate("/student-home");
    }else if (res.status === 202) {
      console.log("Adminn goted");
       sessionStorage.setItem("adminToken", data.adminToken);
      const otpsender = await fetch(`${process.env.REACT_APP_API_URL}`+"/send-otp", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      navigate("/admin-otp-verification");
    }

    setIsLoading(false);
  };

  return (
    <animated.div
      style={{
        ...backgroundParallax,
        backgroundImage: `url(${process.env.PUBLIC_URL}/abstract-digital-grid-black-background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="background-parallax"
    >
      <Container
        component="main"
        maxWidth="sm"
        className="vh-100 d-flex align-items-center justify-content-center"
      >
        <animated.div style={slideIn} className="w-100">
          <Paper elevation={8} className="registration-form p-4 rounded text-dark">
            <Typography component="h1" variant="h4" className="text-center mb-4">
              Log In
            </Typography>
            {registrationSuccessMessage && (
              <Alert severity="success" className="mb-4">
                {registrationSuccessMessage}
              </Alert>
            )}

            <form onSubmit={PostData}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={handleInputs}
                    required
                    InputProps={{
                      startAdornment: (
                        <BiUser className="text-primary" style={{ marginRight: "8px" }} />
                      ),
                    }}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                    required
                    InputProps={{
                      startAdornment: (
                        <BiLock className="text-primary" style={{ marginRight: "8px" }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Google reCAPTCHA 
              <ReCAPTCHA
                sitekey="6LeivlUpAAAAAErzcS9Sr7C3HvwXmbxYfIfO8JOX"
                onChange={(value) => setCaptchaValue(value)}
              />
                  */}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={`mt-4 rounded-pill gradient-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
                style={{ width: 'auto' }}
              >
                {isLoading ? "Loading..." : "Log In"}
              </Button>
            </form>
          </Paper>
        </animated.div>
      </Container>
    </animated.div>
  );
};

export default Signin;
export { luname };
