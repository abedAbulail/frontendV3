"use client";

import { useState, useEffect } from "react";
import VirtualAssistantPage from "../ai/page";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }
        const my_key = localStorage.getItem("key");
        const res = await fetch("https://backend-z1i1.onrender.com/history", {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({ key: my_key }),
        });
        const data = await res.json();
        setHistory(data || []);
        console.log(history)
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        body {
          background-color: #ffffff;
          color: #2c2f77;
          font-family: 'Inter', sans-serif;
        }
        .page-title {
          color: #2c2f77;
          font-weight: 700;
        }
        .colorTheme {
          color: #EA7946;
        }
        .card-custom {
          background-color: #fdfdfd;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .card-header-custom {
          background-color: #f5f5f5;
          border-bottom: 1px solid #ddd;
          font-weight: 500;
        }
        .status-dot {
          width: 12px;
          height: 12px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 8px;
        }
        .status-red { background-color: #EA7946; }
        .status-green { background-color: #2c2f77; }
      `}</style>

      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="page-title colorTheme mb-3">History</h1>
          <p className="lead text-muted">
            See all your previous questions and responses
          </p>
        </div>

        {/* History Cards */}
        <div className="col-lg-8 mx-auto">
          {isLoading ? (
            <div className="text-center text-muted py-4">
              Loading history...
            </div>
          ) : history.length === 0 ? (
            <div className="text-center text-muted py-4">
              No history available.
            </div>
          ) : (
            history.map((item, index) => (
              <div key={index} className="card card-custom mb-4">
                <div className="card-header card-header-custom">
                  <span
                    className={`status-dot ${
                      item.corrected_response ? "status-red" : "status-green"
                    }`}
                  ></span>
                  Question #{index + 1}
                </div>
                <div className="card-body">
                  {/* Question */}
                  <div className="mb-3">
                    <h6 className="mb-1">Question:</h6>
                    <p>{item.question}</p>
                  </div>

                  {/* Response */}
                  <div className="mb-3">
                    <h6 className="mb-1">Response:</h6>
                    <p>{item.response}</p>
                  </div>

                  {/* Corrected Response */}
                  {item.corrected_response && (
                    <div className="mb-3">
                      <h6 className="mb-1">Correct Response:</h6>
                      <p>{item.corrected_response}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <VirtualAssistantPage />
    </>
  );
}
