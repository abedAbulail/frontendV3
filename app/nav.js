"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function Navbar() {
  const pathname = usePathname();
   useEffect(() => {
     import("bootstrap/dist/js/bootstrap.bundle.min.js");
   }, []);


  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        .navbar-dark-custom {
          background-color: #080844; /* Dark Navy Violet */
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
          font-size: 0.85rem; /* smaller links */
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
        .nav-link-custom:focus {
          box-shadow: none;
        }
        button.nav-link-custom {
          background: transparent;
          border: none;
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
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            <span className="navbar-toggler-icon"></span>
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
