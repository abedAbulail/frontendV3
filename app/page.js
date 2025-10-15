"use client";

export default function WelcomePage() {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <style>{`
  body {
    background-color: #001f3f; /* Dark navy */
    color: white;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }

  .welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem 1rem;
    text-align: center;
  }

  .steps-section {
    background-color: white;
    color: #001f3f;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    max-width: 1000px;
    width: 100%;
  }

  .welcome-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .welcome-subtitle {
    font-size: 1rem;
    color: rgb(66, 66, 66);
    margin-bottom: 2.5rem;
  }

.row-custom {
  display: flex;
  justify-content: space-between;
  align-items: center; /* <-- change from flex-start to center */
  flex-wrap: wrap;
  gap: 2rem;
}

  .how-to {
    flex: 1;
    min-width: 300px;
    text-align: left;
  }

  .get-started {
    flex: 1;
    min-width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .step-item {
    background-color: #f9f9f9;
    border-left: 4px solid #001f3f;
    border-radius: 10px;
    padding: 1rem 1.2rem;
    transition: all 0.3s ease;
  }

  .btn-start {
    background-color: #001f3f;
    color: white;
    border: none;
    padding: 0.9rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  .btn-start:hover {
    background-color: #022c5c;
    transform: scale(1.05);
  }

  /* 🔹 Responsive tweaks for mobile */
  @media (max-width: 768px) {
    .steps-section {
      padding: 2rem 1.5rem;
    }

    .welcome-title {
      font-size: 1.5rem;
    }

    .welcome-subtitle {
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    .row-custom {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
    }

    .how-to {
      text-align: center;
      min-width: 100%;
    }

    .step-item {
      border-left: none;
      border-top: 3px solid #001f3f;
      text-align: left;
    }

    .get-started {
      width: 100%;
      justify-content: center;
    }

    .btn-start {
      width: 80%;
      padding: 0.9rem 1.2rem;
      font-size: 1rem;
    }
  }
`}</style>

      <div className="welcome-container">
        <div className="steps-section">
          <h4 className="welcome-title">Welcome to Zuccess Platform</h4>
          <p className="welcome-subtitle">
            Empower your business with intelligent automation and AI-driven
            tools.
          </p>
          <div className="row-custom">
            {/* Left side - How To Section */}
            <div className="how-to">
              <h4>How to Get Started</h4>
              <div className="d-flex flex-column gap-3">
                <div className="step-item">
                  <h5 className="fw-semibold">1. Login / Register</h5>
                  <p className="mb-0">
                    Create your account or sign in to access your dashboard.
                  </p>
                </div>
                <div className="step-item">
                  <h5 className="fw-semibold">2. Upload Knowledge Base</h5>
                  <p className="mb-0">
                    Add your documents, files, or data to train your assistant.
                  </p>
                </div>
                <div className="step-item">
                  <h5 className="fw-semibold">
                    3. Test Answers & Improve Prompt
                  </h5>
                  <p className="mb-0">
                    Ask questions, refine prompts, and perfect your chatbot
                    responses.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Get Started Button */}
            <div className="get-started">
              <button
                className="btn-start"
                onClick={() => (window.location.href = "/login")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
