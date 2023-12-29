import React, { useState, FormEvent } from "react";
import UploadForm from "../../components/UploadForm/UploadForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import "firebase/functions";
import { getFunctions, httpsCallable } from "firebase/functions";

interface CheckPasswordResponse {
  authenticated: boolean;
}

const UploadPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const functions = getFunctions();
    const checkPassword = httpsCallable(functions, "checkPassword");

    try {
      const result = await checkPassword({ password });
      // Use a type assertion here
      const data = result.data as CheckPasswordResponse;

      if (data.authenticated) {
        setAuthenticated(true);
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Authentication failed");
    }
  };

  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
        Home
      </Link>
      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to upload"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <UploadForm />
      )}
    </div>
  );
};

export default UploadPage;
