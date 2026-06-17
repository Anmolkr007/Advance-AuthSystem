import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import EmailVerified from "./Emailverified.jsx";
import Verifying from "./Verifying.jsx";
import VerificationFailed from "./VerificationFailed.jsx";

const API_URL = "api/auth"
const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${API_URL}/verifyEmail?verificationToken=${token}`);
        setStatus("success");
    } catch (err) {
          console.log("Email verification response:", err.response.data);
        setStatus(err.response.data.message);
      }
    };
    if (token) verifyEmail();
  }, [token]);

  if (status === "loading") return <Verifying/>;
  if (status === "success") return <EmailVerified/>;
  return <VerificationFailed error={status} />;
};

export default EmailVerification;
