import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import AuthService from "../../services/auth.service";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const msg = await AuthService.verifyEmail(email, code);
      setMessage(msg || "Email verified successfully.");
    } catch (err) {
      setError(err?.response?.data?.message || "Email verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <form onSubmit={handleVerify} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Verify Email</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter OTP code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
        {message && (
          <p className="text-green-700 font-medium">{message}</p>
        )}
        {error && <p className="text-red-600 font-medium">{error}</p>}
        <div className="flex gap-3 justify-center">
          <Button type="submit" loading={loading} disabled={loading}>
            Verify
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
