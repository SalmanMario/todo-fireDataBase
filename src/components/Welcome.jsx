import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config.js";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="home">
      <h1>My List</h1>
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
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setIsRegistering(false)}>Go Back</button>
          </>
        ) : (
          <>
            <input type="email" onChange={handleEmailChange} value={email} />
            <input type="password" onChange={handlePasswordChange} value={password} />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={() => setIsRegistering(true)}>Create new account</button>
          </>
        )}
      </div>
    </div>
  );
}
