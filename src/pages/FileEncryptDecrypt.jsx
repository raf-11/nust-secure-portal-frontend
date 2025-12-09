import React, { useState } from "react";
import {
  encryptArrayBuffer,
  decryptToArrayBuffer,
} from "c:/Users/RBTGL/projects/helloworld/NustSecurePortal/Frontend/src/modules/crypto/filecrypto";

const FileEncryptDecrypt = () => {
  const [mode, setMode] = useState("encrypt");
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [resultBlob, setResultBlob] = useState(null);
  const [resultFileName, setResultFileName] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cipherText, setCipherText] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResultBlob(null);
    setCipherText("");
    setError("");
  };

  const handleEncrypt = async () => {
    if (!selectedFile) {
      setError("Please select a file to encrypt.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setProcessing(true);
    setError("");
    setResultBlob(null);
    setCipherText("");

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const cipher = encryptArrayBuffer(arrayBuffer, password);

      const blob = new Blob([cipher], { type: "text/plain" });
      setResultBlob(blob);
      setResultFileName(selectedFile.name + ".enc.txt");
      setCipherText(cipher);
    } catch (err) {
      console.error(err);
      setError("Encryption failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDecryptFromFile = async () => {
    if (!selectedFile) {
      setError("Please select an encrypted .enc.txt file.");
      return;
    }
    if (!password) {
      setError("Please enter the password used for encryption.");
      return;
    }
    setProcessing(true);
    setError("");
    setResultBlob(null);

    try {
      const text = await selectedFile.text();
      const arrayBuffer = decryptToArrayBuffer(text, password);

      const originalName = selectedFile.name.replace(/\.enc\.txt$/, "");
      const blob = new Blob([arrayBuffer], {
        type: "application/octet-stream",
      });
      setResultBlob(blob);
      setResultFileName(originalName || "decrypted_file");
    } catch (err) {
      console.error(err);
      setError("Decryption failed. Wrong password or corrupted file.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDecryptFromText = async () => {
    if (!cipherText) {
      setError("Paste the encrypted text.");
      return;
    }
    if (!password) {
      setError("Please enter the password used for encryption.");
      return;
    }
    setProcessing(true);
    setError("");
    setResultBlob(null);

    try {
      const arrayBuffer = decryptToArrayBuffer(cipherText, password);
      const blob = new Blob([arrayBuffer], {
        type: "application/octet-stream",
      });
      setResultBlob(blob);
      setResultFileName("decrypted_file");
    } catch (err) {
      console.error(err);
      setError("Decryption failed. Wrong password or corrupted text.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="page-container">
      <h2>File Encryption & Decryption</h2>
      <p>
        Files are encrypted locally in your browser using AES. They are not
        uploaded to any server.
      </p>

      <div className="toggle-buttons">
        <button
          className={mode === "encrypt" ? "active" : ""}
          onClick={() => {
            setMode("encrypt");
            setResultBlob(null);
            setCipherText("");
            setError("");
          }}
        >
          Encrypt
        </button>
        <button
          className={mode === "decrypt" ? "active" : ""}
          onClick={() => {
            setMode("decrypt");
            setResultBlob(null);
            setCipherText("");
            setError("");
          }}
        >
          Decrypt
        </button>
      </div>

      <div className="card">
        <label>
          Select file:
          <input type="file" onChange={handleFileChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Choose a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {mode === "encrypt" && (
          <button onClick={handleEncrypt} disabled={processing}>
            {processing ? "Encrypting..." : "Encrypt File"}
          </button>
        )}

        {mode === "decrypt" && (
          <>
            <button onClick={handleDecryptFromFile} disabled={processing}>
              {processing ? "Decrypting..." : "Decrypt From File"}
            </button>
            <p>Or paste encrypted text below:</p>
            <textarea
              rows={5}
              value={cipherText}
              onChange={(e) => setCipherText(e.target.value)}
              placeholder="Paste encrypted text here..."
            />
            <button onClick={handleDecryptFromText} disabled={processing}>
              {processing ? "Decrypting..." : "Decrypt From Text"}
            </button>
          </>
        )}

        {error && <p className="error-text">{error}</p>}

        {resultBlob && (
          <div className="result-section">
            <h3>Result Ready</h3>
            <a
              href={URL.createObjectURL(resultBlob)}
              download={resultFileName}
              className="download-link"
            >
              Download {resultFileName}
            </a>
          </div>
        )}

        {mode === "encrypt" && cipherText && (
          <div className="result-section">
            <h3>Encrypted Text (for copy-paste)</h3>
            <textarea rows={5} readOnly value={cipherText} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileEncryptDecrypt;