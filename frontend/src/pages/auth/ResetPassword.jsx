import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import AuthService from "../../services/auth.service";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setError("");
    setSuccess("");
  }, [email]);

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

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = await AuthService.verifyResetCode(email, code);
      const token = data?.resetToken;
      if (!token) {
        throw new Error("Reset token not received");
      }
      setResetToken(token);
      setSuccess("Code verified. Please enter your new password.");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Invalid code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!resetToken) {
      setError("Please verify the reset code first.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await AuthService.resetPassword(resetToken, newPassword);
      setSuccess("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <SlideIn direction="down">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Reset Password
          </h1>
        </SlideIn>

        <FadeIn delay={0.1}>
          <p className="text-center text-gray-600">
            Enter the code sent to your email and set a new password.
          </p>
        </FadeIn>

        <form onSubmit={handleVerifyCode} className="space-y-4">
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
                key={`reset-otp-${index}`}
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
                aria-label={`Reset code digit ${index + 1}`}
                required
              />
            ))}
          </div>
          <Button type="submit" fullWidth loading={loading} disabled={loading}>
            Verify Code
          </Button>
        </form>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <Button type="submit" fullWidth loading={loading} disabled={loading || !resetToken}>
            Update Password
          </Button>
        </form>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">{success}</p>}

        {loading && <Loader size="sm" className="mt-2" />}
      </div>
    </div>
  );
};

export default ResetPassword;
