// "use client";

// import { useState, useEffect } from "react";
// import VirtualAssistantPage from "../ai/page";
// export default function DeveloperTestingPage() {
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [feedback, setFeedback] = useState(null);
//   const [correctAnswer, setCorrectAnswer] = useState("");
//   const [showCorrectAnswerInput, setShowCorrectAnswerInput] = useState(false);
//   const [collectionName, setCollectionName] = useState("");
//   const [key, setKey] = useState("");
//   const [agentInstructions, setAgentInstructions] = useState("");

//   useEffect(() => {
//     const checkAuthAndFetchKey = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         window.location.href = "/login";
//         return;
//       }
//       // const savedAgent = localStorage.getItem("agent");
//       // if (savedAgent) setAgentInstructions(savedAgent);
//       // initialize state from localStorage

//       try {
//         setIsLoading(true);
//         const res = await fetch("https://backend-z1i1.onrender.com/getinfo", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch key");

//           const data = await res.json();
//           if (data?.key) {
//             console.log(data);
//             setKey(data.key);
//             setCollectionName(data.collection_name || "");

//            if(data.instruction) setAgentInstructions(data.instruction);

//           localStorage.setItem("key", data.key);
//           localStorage.setItem("email", data.email);
//         } else {
//           console.warn("No key found in backend response");
//         }
//       } catch (error) {
//         console.error("Error fetching key:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthAndFetchKey();
//   }, []);

//   const handleSubmit = async () => {
//     if (!question.trim()) return;

//     setIsLoading(true);
//     setResponse("");
//     setFeedback(null);
//     setShowCorrectAnswerInput(false);
//     setCorrectAnswer("");

//     try {
//       const n8nWebhookUrl = "https://zuccess.app.n8n.cloud/webhook/cosole";
//       const my_key = localStorage.getItem("key");
//       const email = localStorage.getItem("email");

//       const res = await fetch(n8nWebhookUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question,
//           key: my_key,
//           instructions: agentInstructions,
//           email,
//           timestamp: new Date().toISOString(),
//         }),
//       });

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       setResponse(data.answer || data.output || data.message || JSON.stringify(data));
//     } catch (error) {
//       setResponse("Error: Failed to get response from n8n. Check webhook URL.");
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     setFeedback("like");
//     setShowCorrectAnswerInput(false);
//     setCorrectAnswer("");

//     try {
//       const my_key = localStorage.getItem("key");
//       const res = await fetch("https://backend-z1i1.onrender.com/like", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question,
//           response,
//           key: my_key,
//           like: true,
//         }),
//       });
//       console.log("User liked the response", await res.json());
//       setTimeout(() => window.location.reload(), 2000);
//     } catch (error) {
//       console.error("Error sending like:", error);
//     }
//   };

//   const handleDislike = () => {
//     setFeedback("dislike");
//     setShowCorrectAnswerInput(true);
//   };

//   const handleCorrectAnswerSubmit = async () => {
//     const my_key = localStorage.getItem("key");
//     try {
//       const res = await fetch("https://backend-z1i1.onrender.com/dislike", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question,
//           response,
//           key: my_key,
//           like: false,
//           correct_answer: correctAnswer,
//         }),
//       });
//       console.log("User submitted correct answer", await res.json());
//       setTimeout(() => window.location.reload(), 2000);
//     } catch (error) {
//       console.error("Error submitting correct answer:", error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && e.ctrlKey) handleSubmit();
//   };

//   return (
//     <>
//       <link
//         href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//         rel="stylesheet"
//       />
//       <style>{`
//         body { background-color: #0d1117; color: #c9d1d9; }
//         .bg-dark-custom { background-color: #161b22; }
//         .card-dark { background-color: #161b22; border-color: #30363d; }
//         .card-header-dark { background-color: #0d1117; border-bottom-color: #30363d; }
//         .form-control-dark { background-color: #0d1117; border-color: #30363d; color: #c9d1d9; }
//         .form-control-dark:focus { background-color: #0d1117; border-color: #58a6ff; box-shadow: 0 0 0 0.25rem rgba(88, 166, 255, 0.25); }
//         .form-control-dark::placeholder { color: #8b949e; }
//         .form-control-dark:disabled { background-color: #161b22; color: #8b949e; }
//         .alert-dark { background-color: #0d1117; border-color: #30363d; color: #c9d1d9; }
//         .text-muted-dark { color: #8b949e !important; }
//         .border-dark-custom { border-color: #30363d !important; }
//         .bg-light-dark { background-color: #0d1117; }
//         .btn-primary { background-color: #080844; color: #EA7946; border: none; }
//         .btn-primary:hover { background-color: rgb(11, 11, 86); }
//         .colorTheme { color: #EA7946; }
//       `}</style>

//       <div className="min-vh-100 bg-dark-custom py-5">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-8">
//               <div className="text-center mb-5">
//                 <h2 className="fw-bold colorTheme mb-3">
//                   Developer Testing Console For{" "}
//                   {collectionName || "Unknown Collection"}
//                 </h2>
//                 <p className="lead text-muted-dark">
//                   Test your Chatbot and provide feedback
//                 </p>
//               </div>

//               <div className="card card-dark shadow-sm mb-4">
//                 <div className="card-body p-4">
//                   <label
//                     htmlFor="instructions"
//                     className="form-label fw-semibold text-light"
//                   >
//                     Agent Instructions
//                   </label>

//                   <p className="text-muted-dark mb-3">
//                     Use this section to provide the AI agent with specific
//                     guidelines or context for how it should behave or respond.
//                     For example, you can describe the agent’s tone, focus area,
//                     or what kind of information it should prioritize. These
//                     instructions help the AI understand your goals better.
//                   </p>
//                   <textarea
//                     id="instructions"
//                     className="form-control text-light form-control-dark mb-3"
//                     rows="8"
//                     value={agentInstructions?agentInstructions: "You are a good agent"} // bind to React state
//                     onChange={(e) => setAgentInstructions(e.target.value)} // update state on typing
//                     placeholder="Add instructions for the agent here..."
//                     disabled={isLoading}
//                   />

//                   <div>
//                     <button
//                       className="btn btn-dark"
//                       onClick={() => {
//                         localStorage.setItem("agent", agentInstructions); // save to localStorage

//                         const res = fetch(
//                           "https://backend-z1i1.onrender.com/instructions",
//                           {
//                             method: "POST",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               collectionName:collectionName,
//                               instructions: agentInstructions,
//                             }),
//                           }
//                         );

//                         alert("alert")

//                       }}
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="card card-dark shadow-sm mb-4">
//                 <div className="card-body p-4">
//                   <label
//                     htmlFor="question"
//                     className="form-label fw-semibold text-light"
//                   >
//                     Enter Your Question
//                   </label>
//                   <p className="text-muted-dark mb-3">
//                     Enter a question here to test how the chatbot responds using
//                     your uploaded knowledge base and agent instructions. Use{" "}
//                     <kbd>Ctrl + Enter</kbd> to submit quickly or click the “Send
//                     Question” button below.
//                   </p>
//                   <textarea
//                     id="question"
//                     className="form-control form-control-dark text-light mb-3"
//                     rows="4"
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Type your question here... (Ctrl+Enter to submit)"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg w-100"
//                     onClick={handleSubmit}
//                     disabled={isLoading || !question.trim()}
//                   >
//                     {isLoading ? (
//                       <>
//                         <span
//                           className="spinner-border spinner-border-sm me-2"
//                           role="status"
//                           aria-hidden="true"
//                         ></span>
//                         Processing...
//                       </>
//                     ) : (
//                       "Send Question"
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {response && (
//                 <div className="card card-dark shadow-sm mb-4">
//                   <div className="card-header card-header-dark py-3">
//                     <h5 className="mb-0 fw-semibold text-light">Response</h5>
//                   </div>
//                   <div className="card-body p-4">
//                     <div
//                       className="alert alert-dark border-dark-custom"
//                       role="alert"
//                     >
//                       <pre
//                         style={{
//                           whiteSpace: "pre-wrap",
//                           fontFamily: "inherit",
//                         }}
//                       >
//                         {response}
//                       </pre>
//                     </div>

//                     <div className="d-flex gap-3 justify-content-center mt-4">
//                       <button
//                         className={`btn ${
//                           feedback === "like"
//                             ? "btn-success"
//                             : "btn-outline-success"
//                         } btn-lg`}
//                         onClick={handleLike}
//                         disabled={feedback !== null}
//                       >
//                         Like
//                       </button>
//                       <button
//                         className={`btn ${
//                           feedback === "dislike"
//                             ? "btn-danger"
//                             : "btn-outline-danger"
//                         } btn-lg`}
//                         onClick={handleDislike}
//                         disabled={feedback !== null}
//                       >
//                         Dislike
//                       </button>
//                     </div>

//                     {showCorrectAnswerInput && (
//                       <div className="mt-4 p-4 bg-light-dark border-dark-custom rounded">
//                         <label
//                           htmlFor="correctAnswer"
//                           className="form-label fw-semibold text-light"
//                         >
//                           Please provide the correct answer:
//                         </label>
//                         <textarea
//                           id="correctAnswer"
//                           className="form-control form-control-dark mb-3"
//                           rows="4"
//                           value={correctAnswer}
//                           onChange={(e) => setCorrectAnswer(e.target.value)}
//                           placeholder="Enter the correct answer here..."
//                         />
//                         <button
//                           className="btn btn-primary"
//                           onClick={handleCorrectAnswerSubmit}
//                           disabled={!correctAnswer.trim()}
//                         >
//                           Submit Correct Answer
//                         </button>
//                       </div>
//                     )}

//                     {feedback === "like" && (
//                       <div
//                         className="alert alert-success mt-3 mb-0"
//                         role="alert"
//                       >
//                         <strong>Thank you!</strong> Your positive feedback has
//                         been recorded.
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <VirtualAssistantPage />
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import VirtualAssistantPage from "../ai/page";

export default function DeveloperTestingPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showCorrectAnswerInput, setShowCorrectAnswerInput] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [key, setKey] = useState("");
  const [agentInstructions, setAgentInstructions] = useState("");

  useEffect(() => {
    const checkAuthAndFetchKey = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch("https://backend-z1i1.onrender.com/getinfo", {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
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
        setIsLoading(false);
      }
    };

    checkAuthAndFetchKey();
  }, []);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
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
      setIsLoading(false);
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
        }
        .section-card {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          padding: 2rem;
        }
        .section-card h2 {
          color: #2c2f77;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .form-control {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 10px;
          font-size: 1rem;
        }
        .form-control:focus {
          border-color: #2c2f77;
          box-shadow: 0 0 0 0.25rem rgba(44,47,119,0.2);
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
        .subtitle {
          color: #555;
          font-size: 1.1rem;
        }
        pre {
          white-space: pre-wrap;
          font-family: 'Inter', sans-serif;
          color: #333;
        }
        .input{
          background-color:#eee
        }
          .toast{
          z-index: 11
          }
      `}</style>

      <div className="container page-container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Developer Testing Console for{" "}
            <span className="colorTheme">
              {collectionName || "Unknown Collection"}
            </span>
          </h2>
          <p className="subtitle">
            Test your chatbot, refine its instructions, and provide structured
            feedback.
          </p>
        </div>
        {/* 
        <button type="button" className="btn btn-primary" id="liveToastBtn">
          Show live toast
        </button>

        <div className="position-fixed bottom-0 end-0 p-3 toast">
          <div
            id="liveToast"
            className="toast hide"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              Hello, world! This is a toast message.
            </div>
          </div>
        </div> */}

        {/* Agent Instructions Section */}
        <div className="section-card mb-4">
          <h5>Agent Instructions</h5>
          <p className="text-muted">
            Provide guidance for how the AI should respond — tone, topic, or
            behavior.
          </p>
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
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Send Question"}
          </button>
        </div>

        {/* Response Section */}
        {response && (
          <div className="section-card mb-4">
            <h5>Response</h5>
            <div className="alert alert-light border mt-3">
              <pre>{response}</pre>
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
