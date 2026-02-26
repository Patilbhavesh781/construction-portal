import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookingService from "@/services/booking.service";

const ContactForm = ({ selectedDate, selectedTime }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Pune",
    hasPlot: "yes",
    timeline: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedDate || !selectedTime) {
      setError("Please select your preferred date and time first.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        bookingType: "consultation",
        bookingDate: selectedDate,
        timeSlot: selectedTime,
        notes: `Consultation request | timeline: ${form.timeline || "not specified"} | own plot: ${form.hasPlot}`,
        address: {
          city: form.city,
          fullAddress: form.city,
        },
        contactDetails: {
          name: form.name,
          phone: form.phone,
          email: form.email,
        },
      };

      await BookingService.createBooking(payload);

      setSuccess("Meeting request sent successfully. Our team will contact you shortly.");
      setForm({
        name: "",
        email: "",
        phone: "",
        city: "Pune",
        hasPlot: "yes",
        timeline: "",
      });
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { state: { from: { pathname: "/book-meeting" } } });
        return;
      }
      setError(err?.response?.data?.message || "Failed to send meeting request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-lg">
      <h3 className="text-2xl font-bold text-foreground mb-2">Request Consultation</h3>
      <p className="text-muted-foreground text-sm mb-6">With you every step of the way</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {success}
          </div>
        )}
        <Input
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl"
          required
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl"
          required
        />
        <Input
          placeholder="Mobile number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-xl"
          required
        />
        <select
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground"
        >
          <option>Pune</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
          <option>Chennai</option>
          <option>Hyderabad</option>
        </select>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Do you own a plot of land?</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="plot" value="yes" checked={form.hasPlot === "yes"} onChange={() => setForm({ ...form, hasPlot: "yes" })} className="accent-primary" /> Yes
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="plot" value="no" checked={form.hasPlot === "no"} onChange={() => setForm({ ...form, hasPlot: "no" })} className="accent-primary" /> No
            </label>
          </div>
        </div>

        <select
          value={form.timeline}
          onChange={(e) => setForm({ ...form, timeline: e.target.value })}
          className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground"
        >
          <option value="">I want to start construction in?</option>
          <option>Immediately</option>
          <option>1-3 months</option>
          <option>3-6 months</option>
          <option>6+ months</option>
        </select>

        <Button type="submit" className="w-full rounded-xl" size="lg" disabled={loading}>
          {loading ? "Sending..." : "Request consultation"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          I agree to the terms & conditions and privacy policy
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
