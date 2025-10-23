"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handlePublish = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/publish",
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log("Publish response:", response);
      alert("Published successfully!");
    } catch (error) {
      console.error("Publish failed:", error);
      alert("Failed to publish. Please check console for details.");
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        .navbar-dark-custom {
          background-color: #080844;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .navbar-brand-custom {
          color: #ffffff;
          font-weight: 600;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }
        .navbar-brand-custom:hover {
          color: #d1d1ff;
        }
        .color_theme {
          color: #EA7946;
        }
        .nav-link-custom {
          color: #ffffff;
          transition: all 0.2s ease;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          margin: 0 0.2rem;
          font-size: 0.85rem;
          font-weight: 500;
          opacity: 0.85;
        }
        .nav-link-custom:hover {
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.1);
          text-decoration: none;
        }
        .nav-link-custom.active {
          background-color: rgba(255, 255, 255, 0.15);
          color: #fff;
          font-weight: 600;
          opacity: 1;
        }
        button.nav-link-custom {
          background: transparent;
          border: none;
        }

        /* ✅ Submit Button Styling */
        .submit {
          background-color: #EA7946;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        }

        .submit:hover {
          background-color: #ff8f5e;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .submit:active {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
          

      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark-custom sticky-top">
        <div className="container">
          <Link
            href="/"
            className="navbar-brand color_theme navbar-brand-custom text-light"
          >
            Zuccess.ai
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='white' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")",
              }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  href="/console"
                  className={`nav-link nav-link-custom text-light ${
                    pathname === "/console" ? "active" : ""
                  }`}
                >
                  Testing Console
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="/feeder"
                  className={`nav-link nav-link-custom text-light ${
                    pathname === "/feeder" ? "active" : ""
                  }`}
                >
                  Knowledge Base
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="/history"
                  className={`nav-link nav-link-custom text-light ${
                    pathname === "/history" ? "active" : ""
                  }`}
                >
                  History
                </Link>
              </li>

              <li className="nav-item">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="nav-link nav-link-custom text-light"
                >
                  Logout
                </button>
              </li>

              {/* ✅ Improved Publish Button */}
              <li className="nav-item">
                <button onClick={handlePublish} className="submit ms-2">
                  Submit for Whatsapp
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
