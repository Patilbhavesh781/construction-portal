import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const inputRefs = useRef([]);
  const otpLength = 6;
  const digits = useMemo(
    () =>
      Array.from({ length: otpLength }, (_, i) =>
        code[i] ? code[i] : ""
      ),
    [code]
  );

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
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Email verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const updateCodeAt = (index, value) => {
    const next = code.split("");
    next[index] = value;
    setCode(next.join("").slice(0, otpLength));
  };

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    updateCodeAt(index, digit);
    if (digit && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowLeft" && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const next = pasted.slice(0, otpLength);
    setCode(next);
    const lastIndex = Math.min(next.length - 1, otpLength - 1);
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
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
        <div
          className="flex items-center justify-center gap-2"
          onPaste={handlePaste}
        >
          {digits.map((digit, index) => (
            <input
              key={`otp-${index}`}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-lg border text-center text-lg font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              aria-label={`OTP digit ${index + 1}`}
              required
            />
          ))}
        </div>
        {message && (
          <p className="text-green-700 font-medium">
            {message} Redirecting to login...
          </p>
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
