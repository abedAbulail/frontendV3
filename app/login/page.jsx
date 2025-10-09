"use client";

import { useState } from "react";

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
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

  const handleAuth = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!isLogin) {
      // Registration validations
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }
    }

    const endpoint = isLogin ? "login" : "register";
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          email: formData.email,
          password: formData.password,
          username: formData.name,
          colliction_name: formData.key
        };

    try {
      const res = await fetch(`https://backend-z1i1.onrender.com/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || `${endpoint} failed`);

      if (isLogin) {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("token", data.access_token);
        setTimeout(() => window.location.href = "/feeder", 1500);
      } else {
        setSuccess("Registration successful! Please login.");
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ email: formData.email, password: "", confirmPassword: "", name: "", key: "" });
        }, 2000);
      }
    } catch (err) {
      setError(err.message || `${endpoint} failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(prev => !prev);
    setFormData({ email: "", password: "", confirmPassword: "", name: "", key: "" });
    setError("");
    setSuccess("");
  };

  const handleKeyPress = (e) => { if (e.key === "Enter") handleAuth(); };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div className="min-vh-100 bg-dark-custom d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="text-center mb-4">
                <h1 className="display-5 fw-bold colorTheme mb-2" style={{color:"#080844"}}>
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-muted-dark">
                  {isLogin ? "Sign in to continue to your account" : "Sign up to get started"}
                </p>
              </div>

              <div className="card card-dark shadow-lg">
                <div className="card-body p-4">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  {!isLogin && (
                    <>
                      <div className="mb-3">
                        <label className="form-label text-dark">Full Name</label>
                        <input
                          type="text"
                          className="form-control form-control-dark"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your name"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">Collection Name</label>
                        <input
                          type="text"
                          className="form-control form-control-dark"
                          name="key"
                          value={formData.key}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your key"
                          disabled={isLoading}
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <label className="form-label text-dark">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-dark"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-dark">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-dark"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label className="form-label text-dark">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control form-control-dark"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Confirm your password"
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  <button
                    className="btn btn-primary btn-lg w-100 mt-3"
                    onClick={handleAuth}
                    style={{
                      backgroundColor:"#080844"
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span>
                      {isLogin ? "Signing in..." : "Creating account..."}</>
                    ) : isLogin ? "Sign In" : "Sign Up"}
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-muted-dark">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </span>
                    <button
                      type="button"
                      className="btn btn-link btn-link-custom ms-2"
                      onClick={toggleAuthMode}
                      disabled={isLoading}
                    >
                      {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <small className="text-muted-dark">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
