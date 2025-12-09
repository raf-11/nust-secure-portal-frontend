import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { encryptText, decryptText } from "c:/Users/RBTGL/projects/helloworld/NustSecurePortal/Frontend/src/modules/crypto/passwordcrypto";

const PasswordVault = ({ user }) => {
  const [masterPassword, setMasterPassword] = useState("");
  const [masterSet, setMasterSet] = useState(false);

  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [plainPassword, setPlainPassword] = useState("");

  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "passwordVault"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setEntries(list);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSetMaster = () => {
    if (!masterPassword || masterPassword.length < 6) {
      setError("Master password should be at least 6 characters.");
      return;
    }
    setError("");
    setMasterSet(true);
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (!masterSet) {
      setError("Set master password first.");
      return;
    }
    if (!site || !username || !plainPassword) {
      setError("Fill all fields.");
      return;
    }

    try {
      const encryptedPassword = encryptText(plainPassword, masterPassword);

      await addDoc(collection(db, "passwordVault"), {
        userId: user.uid,
        site,
        username,
        password: encryptedPassword,
        createdAt: new Date(),
      });

      setSite("");
      setUsername("");
      setPlainPassword("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to save entry.");
    }
  };

  const handleDecrypt = (cipherText) => {
    try {
      if (!masterSet) {
        setError("Set master password to decrypt.");
        return;
      }
      const decrypted = decryptText(cipherText, masterPassword);
      alert(`Decrypted password: ${decrypted}`);
    } catch (err) {
      console.error(err);
      setError("Failed to decrypt. Master password might be wrong.");
    }
  };

  return (
    <div className="page-container">
      <h2>Password Vault</h2>
      <p>
        Your passwords are encrypted locally using your master password and
        stored in Firestore. Remember your master password – it is not stored
        on the server.
      </p>

      <div className="card">
        <h3>Master Password (for this session)</h3>
        {!masterSet ? (
          <>
            <input
              type="password"
              placeholder="Set master password for this session"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
            />
            <button onClick={handleSetMaster}>Set Master Password</button>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="Master password (for decryption)"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
            />
            <p className="note">
              This is only stored in memory in your browser, not in the
              database.
            </p>
          </>
        )}
      </div>

      <div className="card">
        <h3>Add New Password Entry</h3>
        <form onSubmit={handleAddEntry} className="vault-form">
          <label>
            Site / App
            <input
              type="text"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="e.g., gmail.com"
            />
          </label>
          <label>
            Username / Email
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={plainPassword}
              onChange={(e) => setPlainPassword(e.target.value)}
            />
          </label>
          <button type="submit">Save Entry</button>
        </form>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="card">
        <h3>Saved Entries</h3>
        {entries.length === 0 && <p>No entries yet.</p>}
        {entries.map((entry) => (
          <div key={entry.id} className="vault-entry">
            <p>
              <strong>Site:</strong> {entry.site}
            </p>
            <p>
              <strong>Username:</strong> {entry.username}
            </p>
            <button onClick={() => handleDecrypt(entry.password)}>
              Show Password
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordVault;