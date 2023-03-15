import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config.js";
import { useNavigate } from "react-router-dom";
import "../components/welcome.css";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import { Container } from "@mui/material";

export function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Email is not identical or valid");
      return;
    } else if (registerInformation.password !== registerInformation.confirmPassword) {
      alert("Password does not match or is valid");
      return;
    }
    createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => alert(err.message));
  };

  const theme = createTheme({
    palette: {
      primary: {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#81d4fa",
        300: "#4fc3f7",
        400: "#29b6f6",
        500: "#2196f3",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div className="welcome-container">
          <h1>My To-Do List Project</h1>
          <div className="login-register-container">
            {isRegistering ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={registerInformation.email}
                  onChange={(e) => setRegisterInformation({ ...registerInformation, email: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Confirm Email"
                  value={registerInformation.confirmEmail}
                  onChange={(e) => setRegisterInformation({ ...registerInformation, confirmEmail: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerInformation.password}
                  onChange={(e) => setRegisterInformation({ ...registerInformation, password: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={registerInformation.confirmPassword}
                  onChange={(e) => setRegisterInformation({ ...registerInformation, confirmPassword: e.target.value })}
                />
                <Button sx={{ my: 2 }} variant="contained" onClick={handleRegister}>
                  Register
                </Button>
                <Button sx={{ my: 2 }} variant="contained" onClick={() => setIsRegistering(false)}>
                  Go Back
                </Button>
              </>
            ) : (
              <>
                <label>Username</label>
                <input type="email" onChange={handleEmailChange} value={email} />
                <label>Password</label>
                <input type="password" onChange={handlePasswordChange} value={password} />
                <Button sx={{ my: 2 }} variant="contained" className="signIn" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button
                  sx={{ my: 2 }}
                  variant="contained"
                  className="createAccount"
                  onClick={() => setIsRegistering(true)}
                >
                  Create new account
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}
