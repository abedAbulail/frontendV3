"use client";

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    key: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    const { email, password } = formData;
    if (!email || !password ) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("https://backend-z1i1.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setSuccess("Login successful! Redirecting...");
      localStorage.setItem("token", data.access_token);
      setTimeout(() => window.location.href = "/feeder", 1500);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card p-4 shadow-lg" style={{ minWidth: 350 }}>
          <h2 className="text-center mb-3" style={{ color: "#080844" }}>Login</h2>
          
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your Email"
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleLogin}
            disabled={isLoading}
            style={{ backgroundColor: "#080844" }}
          >
            {isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </>
  );
}
