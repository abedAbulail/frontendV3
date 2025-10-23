"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef } from "react";

export default function VirtualAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "👋 Hello! I'm your Virtual Assistant. Ask me anything im here to help you.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [

  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
        // Call your backend API https://backend-z1i1.onrender.com/
        const res = await fetch("https://backend-z1i1.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();

      console.log(data)

      const assistantMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: data || "⚠️ Sorry, I didn't catch that.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: "❌ Oops! I couldn't process your request.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 9999 }}>
      {/* Floating button */}
      {!isOpen && (
  <button
  className="btn bg-primary d-flex justify-content-center align-items-center rounded-circle shadow-lg"
  style={{ width: "50px", height: "50px", padding: 0 }}
  onClick={() => setIsOpen(true)}
>
  <img src="/ai-chat-interface.png" width={30} height={30} />
</button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="card shadow-lg" style={{ width: "350px", height: "500px" }}>
          <div className="card-header d-flex justify-content-between align-items-center  text-light" style={{backgroundColor:"#080844"}}>
            <span>Virtual Assistant</span>
            <button className="btn btn-sm btn-light" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div
            className="card-body overflow-auto bg-light d-flex flex-column gap-2"
            style={{ height: "350px" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`d-flex ${
                  msg.type === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    msg.type === "user" ? "bg-warning text-dark" : "bg-white text-dark border"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <div>{msg.content}</div>
                  <small className="text-muted">{msg.timestamp}</small>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            {loading && <small>Assistant is typing...</small>}
          </div>

          {/* Quick Questions */}
          <div className="p-2 border-top d-flex flex-wrap gap-1 bg-white">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setInputValue(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-top bg-white d-flex gap-1">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Ask me anything Im here to help..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="btn btn-dark text-light" style={{backgroundColor:"#080844"}} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
