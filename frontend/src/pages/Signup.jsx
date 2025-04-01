import React, { useState } from "react";
import swal from "sweetalert";
import '../styles/Signup.css';

const API_BASE_URL = "http://localhost:8808/api/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      swal("Please enter valid details!", { icon: "warning" });
      return;
    }

    if (password !== confirmPassword) {
      swal("Passwords do not match!", { icon: "warning" });
      return;
    }

    if (password.length < 4) {
      swal("Password must contain at least 4 characters!", { icon: "warning" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.isOk) {
        swal("Registration Successful", { icon: "success" }).then(() => {
          window.location.href = "/login";
        });
      } else {
        swal(data.message, { icon: "info" });
      }
    } catch (error) {
      swal("Something went wrong!", { icon: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
