"use client";

import { useState, useEffect } from "react";
import VirtualAssistantPage from "../ai/page";

export default function KnowledgeBaseFeeder() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".md")) {
      setSelectedFile(file);
      setUploadStatus(null);
    } else {
      setUploadStatus({
        type: "error",
        message: "Please select a valid .md file",
      });
    }
  };

  useEffect(() => {
    const checkAuthAndFetchKey = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
    };
    checkAuthAndFetchKey();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".md")) {
        setSelectedFile(file);
        setUploadStatus(null);
      } else {
        setUploadStatus({
          type: "error",
          message: "Please select a valid .md file",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadStatus(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUploadStatus({
          type: "error",
          message: "Authentication token not found. Please login again.",
        });
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("https://backend-z1i1.onrender.com/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      setUploadStatus({
        type: "success",
        message: `File uploaded successfully! ${data.chunks} chunks created in ${data.collection}.`,
      });

      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus(null);
      }, 3000);
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Failed to upload file. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus(null);
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

        .page-title {
          color: #2c2f77;
          font-weight: 700;
        }

        .upload-zone {
          border: 2px dashed #b5b5e0;
          border-radius: 10px;
          padding: 3rem 2rem;
          background-color: #fafafa;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .upload-zone:hover,
        .upload-zone.active {
          background-color: #eef0ff;
          border-color: #2c2f77;
        }

        .card-custom {
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .btn-main {
          background-color: #2c2f77;
          color: #fff;
          border-radius: 50px;
          padding: 0.7rem 2rem;
          border: none;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .btn-main:hover {
          background-color: #1f2163;
        }

        .colorTheme {
          color: #EA7946;
        }

        .alert {
          border-radius: 10px;
        }

        .file-preview {
          background: #fafafa;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 2rem;
        }
      `}</style>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="page-title">Knowledge Base Feeder</h2>
          <p className="text-muted">
            Upload your <strong className="colorTheme">Markdown (.md)</strong>{" "}
            files to feed the AI knowledge base
          </p>
        </div>

        <div className="col-lg-8 mx-auto">
          <div className="card card-custom shadow-sm p-4">
            {!selectedFile ? (
              <div
                className={`upload-zone ${dragActive ? "active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="#2c2f77"
                  viewBox="0 0 16 16"
                  className="mb-3"
                >
                  <path d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5z" />
                  <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z" />
                </svg>
                <h5 className="mb-2">Drop your .md file here</h5>
                <p className="text-muted">or click to browse</p>
                <input
                  type="file"
                  id="fileInput"
                  className="d-none"
                  onChange={handleFileSelect}
                  accept=".md"
                />
              </div>
            ) : (
              <div className="file-preview text-center">
                <div style={{ fontSize: "3rem" }}>📝</div>
                <h5 className="mt-3">{selectedFile.name}</h5>
                <p className="text-muted">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleRemoveFile}
                    disabled={isUploading}
                  >
                    Remove
                  </button>
                  <button
                    className="btn-main"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
              </div>
            )}

            {uploadStatus && (
              <div
                className={`alert mt-4 ${
                  uploadStatus.type === "success"
                    ? "alert-success"
                    : "alert-danger"
                }`}
              >
                <strong>
                  {uploadStatus.type === "success" ? "✓ Success:" : "✗ Error:"}
                </strong>{" "}
                {uploadStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>

      <VirtualAssistantPage />
    </>
  );
}
