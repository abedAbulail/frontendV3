"use client";

import { useState, useEffect } from "react";
import VirtualAssistantPage from "../ai/page";

export default function DeveloperTestingPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true); // start loading by default
  const [isFetching, setIsFetching] = useState(false); // for question submission
  const [feedback, setFeedback] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showCorrectAnswerInput, setShowCorrectAnswerInput] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [key, setKey] = useState("");
  const [agentInstructions, setAgentInstructions] = useState("");

  // ✅ Check authentication & fetch user info
  useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
    const checkAuthAndFetchKey = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await fetch("https://backend-z1i1.onrender.com/getinfo", {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
          signal,
        });

        if (!res.ok) throw new Error("Failed to fetch key");

        const data = await res.json();
        if (data?.key) {
          setKey(data.key);
          setCollectionName(data.collection_name || "");
          if (data.instruction) setAgentInstructions(data.instruction);
          localStorage.setItem("key", data.key);
          localStorage.setItem("email", data.email);
        }
      } catch (error) {
        console.error("Error fetching key:", error);
      } finally {
        setIsLoading(false); // stop loading screen
      }
    };

    checkAuthAndFetchKey();
  
  }, []);

  // ✅ Handle submit question
  const handleSubmit = async () => {
    if (!question.trim()) return;
    setIsFetching(true);
    setResponse("");
    setFeedback(null);
    setShowCorrectAnswerInput(false);
    setCorrectAnswer("");

    try {
      const n8nWebhookUrl = "https://zuccess.app.n8n.cloud/webhook/cosole";
      const my_key = localStorage.getItem("key");
      const email = localStorage.getItem("email");

      const res = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          key: my_key,
          instructions: agentInstructions,
          email,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setResponse(
        data.answer || data.output || data.message || JSON.stringify(data)
      );
    } catch (error) {
      setResponse("Error: Failed to get response from n8n. Check webhook URL.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleLike = async () => {
    setFeedback("like");
    setShowCorrectAnswerInput(false);
    setCorrectAnswer("");
    try {
      const my_key = localStorage.getItem("key");
      const res = await fetch("https://backend-z1i1.onrender.com/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          response,
          key: my_key,
          like: true,
        }),
      });
      console.log("User liked the response", await res.json());
      window.location.reload();
    } catch (error) {
      console.error("Error sending like:", error);
    }
  };

  const handleDislike = () => {
    setFeedback("dislike");
    setShowCorrectAnswerInput(true);
  };

  const handleCorrectAnswerSubmit = async () => {
    const my_key = localStorage.getItem("key");
    try {
      const res = await fetch("https://backend-z1i1.onrender.com/dislike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          response,
          key: my_key,
          like: false,
          correct_answer: correctAnswer,
        }),
      });
      console.log("User submitted correct answer", await res.json());
      window.location.reload();
    } catch (error) {
      console.error("Error submitting correct answer:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleSubmit();
  };

  // 🌀 Full-Screen Loading Screen
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="text-center fade-in">
          <div
            className="spinner-border text-primary mb-3"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          ></div>
          <h5 className="fw-bold" style={{ color: "#2c2f77" }}>
            Loading your workspace...
          </h5>
          <p className="text-muted">Please wait a moment.</p>
        </div>
        <style>{`
          .fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  // ✅ Main Page
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
        .page-container {
          padding-top: 4rem;
          padding-bottom: 4rem;
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .section-card {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          padding: 2rem;
        }
        .form-control {
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .btn-primary {
          background-color: #2c2f77;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          padding: 0.75rem 2rem;
        }
        .btn-primary:hover {
          background-color: #1f2264;
        }
        .colorTheme {
          color: #EA7946;
        }
        .input { background-color: #f6f6f6; }
      `}</style>

      <div className="container page-container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Developer Testing Console for{" "}
            <span className="colorTheme">
              {collectionName || "Unknown Collection"}
            </span>
          </h2>
          <p className="text-muted">
            Test your chatbot, refine its instructions, and provide structured
            feedback.
          </p>
        </div>

        {/* Agent Instructions Section */}
        <div className="section-card mb-4">
          <h5>Agent Instructions</h5>
          <textarea
            className="form-control mb-3 input"
            rows="6"
            value={agentInstructions || "You are a helpful assistant."}
            onChange={(e) => setAgentInstructions(e.target.value)}
          ></textarea>
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.setItem("agent", agentInstructions);
              fetch("https://backend-z1i1.onrender.com/instructions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  collectionName,
                  instructions: agentInstructions,
                }),
              });
              alert("Instructions saved successfully!");
            }}
          >
            Save Instructions
          </button>
        </div>

        {/* Question Section */}
        <div className="section-card mb-4">
          <h5>Test a Question</h5>
          <p className="text-muted">
            Enter a question to test how your AI agent responds. Press{" "}
            <kbd>Ctrl + Enter</kbd> to submit.
          </p>
          <textarea
            className="form-control mb-3 input"
            rows="4"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
          ></textarea>
          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={isFetching}
          >
            {isFetching ? "Processing..." : "Send Question"}
          </button>
        </div>

        {/* Response Section */}
        {response && (
          <div className="section-card mb-4">
            <h5>Response</h5>
            <div className="alert alert-light border mt-3">
              <div>{response}</div>
            </div>
            <div className="d-flex gap-3 justify-content-center mt-4">
              <button
                className={`btn ${
                  feedback === "like" ? "btn-success" : "btn-outline-success"
                } btn-lg`}
                onClick={handleLike}
              >
                Like
              </button>
              <button
                className={`btn ${
                  feedback === "dislike" ? "btn-danger" : "btn-outline-danger"
                } btn-lg`}
                onClick={handleDislike}
              >
                Dislike
              </button>
            </div>

            {showCorrectAnswerInput && (
              <div className="mt-4">
                <label className="form-label fw-semibold">
                  Please provide the correct answer:
                </label>
                <textarea
                  className="form-control mb-3"
                  rows="4"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                ></textarea>
                <button
                  className="btn btn-primary"
                  onClick={handleCorrectAnswerSubmit}
                  disabled={!correctAnswer.trim()}
                >
                  Submit Correct Answer
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <VirtualAssistantPage />
    </>
  );
}
