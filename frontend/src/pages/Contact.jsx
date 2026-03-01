import { useMemo, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/jsw/Footer";
import ExperienceCentres from "@/components/jsw/ExperienceCentres";
import ContactCTASection from "@/components/jsw/ContactCTASection";
import MessageService from "@/services/message.service";
import heroImage from "@/assets/Apartment4.jpeg";

const enquiryTypes = [
  "General Questions About Our Services",
  "Track your Project Status & Progress",
  "Billing, Payments & Invoice Support",
  "Request Changes or Customizations in Design",
  "Material Delivery, Availability & Quality Concerns",
  "Contractor or Vendor Assistance",
  "Website, App & Account Access Support",
  "Permits, Approvals & Legal Compliance",
  "Submit Feedback, Complaints, or Suggestions",
  "Urgent Assistance & Escalations for Critical Issues",
];

const faqs = [
  {
    q: "Since how long has BuildPro been in the construction business?",
    a: "BuildPro helps homeowners with end-to-end residential construction and support through a managed project process.",
  },
  {
    q: "Does BuildPro undertake home designing services?",
    a: "Yes. Design consultation and execution support are available based on your project requirements.",
  },
  {
    q: "Does BuildPro undertake commercial projects?",
    a: "Current focus is primarily residential home construction and related homeowner services.",
  },
  {
    q: "Will I get to choose materials for my project?",
    a: "Yes, material choices are discussed during planning and aligned with budget and availability.",
  },
  {
    q: "How long does a residential project take?",
    a: "Timelines vary by scope and floor count. Final schedule is shared after requirement and site review.",
  },
  {
    q: "Do you provide construction warranty?",
    a: "Warranty and post-handover support terms are shared in your final agreement.",
  },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    type: enquiryTypes[0],
    textarea: "",
    notify: true,
  });

  const canSubmit = useMemo(
    () => !!form.name && !!form.email && !!form.mobile && !!form.type && !!form.textarea,
    [form]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!canSubmit) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await MessageService.sendEnquiry({
        name: form.name,
        email: form.email,
        subject: `${form.type}${form.notify ? " | WhatsApp Opt-in: Yes" : ""}`,
        message: `Mobile: ${form.mobile}\n\n${form.textarea}`,
      });

      setSuccess("Enquiry sent successfully. Our support team will contact you shortly.");
      setForm({
        name: "",
        email: "",
        mobile: "",
        type: enquiryTypes[0],
        textarea: "",
        notify: true,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#FCFCF7]">
      <Navbar />

      <section className="bg-[#FCFCF7] flex flex-col items-center w-full pt-24">
        <div className="px-4 pb-10 w-full max-w-[768px] xl:max-w-[1440px] xl:p-20 xl:items-stretch">
          <div className="flex flex-col items-center justify-start gap-5 w-full xl:flex-row-reverse xl:items-stretch xl:justify-between xl:gap-[60px]">
            <img
              alt="Get in touch"
              src={heroImage}
              className="top-0 left-0 object-fill rounded-lg xl:rounded-xl xl:basis-1/2 xl:h-[404px] xl:w-[560px]"
            />

            <div className="flex flex-col items-start gap-5 xl:gap-3 xl:basis-1/2 xl:items-start">
              <h1 className="text-[#030712] text-3xl font-medium tracking-[0.36px] xl:leading-[56px] xl:tracking-[0.48px] xl:text-5xl xl:w-[500px]">
                Get in touch with us
              </h1>
              <p className="text-[#6B7280] leading-5 xl:leading-8 tracking-[0.48px] text-xs font-medium xl:text-lg">
                If you have questions or need assistance, we are here to help. Contact us today and our team will provide the support you need.
              </p>

              <div className="flex flex-col w-full gap-2 xl:gap-5 xl:mt-5">
                <a href="/book-meeting">
                  <button className="inline-flex items-center gap-2 border-2 border-input py-2 bg-[#FAF0DC] rounded-lg h-11 px-3 w-full xl:rounded-xl justify-start xl:px-6 xl:w-[450px] xl:h-[68px]">
                    <p className="text-[#464646] text-xs xl:text-lg font-medium">Book a meeting</p>
                    <span className="text-[#464646] ml-auto"><ChevronRight/></span>
                  </button>
                </a>
                <a href="#contact-faq">
                  <button className="inline-flex items-center gap-2 border-2 border-input py-2 bg-[#FAF0DC] rounded-lg h-11 px-3 w-full xl:rounded-xl justify-start xl:px-6 xl:w-[450px] xl:h-[68px]">
                    <p className="text-[#464646] text-xs xl:text-lg font-medium">Read frequently asked questions</p>
                    <span className="text-[#464646] ml-auto"><ChevronRight/></span>
                  </button>
                </a>
              </div>

              <div className="flex flex-col xl:flex-row justify-start xl:gap-5 gap-2 w-full xl:mt-5">
                <a className="border-b border-gray-200 pb-2 xl:border-b-0" href="mailto:support@buildpro.com">
                  <p className="text-[#70737A] text-xs xl:text-base font-medium xl:mt-2 leading-6 tracking-[0.36px]">Email us</p>
                  <p className="leading-[20px] text-xs xl:text-lg font-medium">support@buildpro.com</p>
                </a>
                <a className="border-gray-200 xl:pl-5 xl:border-l-2 pb-2" href="tel:+919545944445">
                  <p className="text-[#70737A] text-xs xl:text-base font-medium xl:mt-2 leading-6 tracking-[0.36px]">Call us</p>
                  <p className="leading-[20px] text-xs xl:text-lg font-medium">+91 95459 44445 Mon-Sat, 10 AM to 6 PM</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center w-full bg-[#F6F5EF]">
        <div className="flex flex-col items-center justify-start gap-8 px-4 py-10 w-full max-w-[768px] xl:max-w-[1440px] xl:p-20 xl:gap-10">
          <div className="flex flex-col items-center gap-2 xl:gap-3">
            <h2 className="text-[#030712] text-2xl text-center font-medium leading-7 tracking-[0.36px] xl:text-4xl">Any queries?</h2>
            <p className="text-[#6B7280] tracking-[0.36px] text-sm font-medium text-center xl:text-lg xl:w-[624px] px-5">
              If you have questions or need assistance, we are here to help. Contact us today and our team will provide the support you need.
            </p>
          </div>

          <div className="w-full flex items-start justify-center flex-1">
            <form onSubmit={handleSubmit} className="w-full px-4 py-8 xl:px-10 xl:pt-[50px] xl:pb-[30px] bg-white gap-6 shadow-md rounded-[12px] flex flex-col xl:w-[788px]">
              {error && <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg">{error}</div>}
              {success && <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg">{success}</div>}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required className="border px-3 py-3 h-[44px] rounded-lg border-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-[#FC7F11]" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="border px-3 py-3 h-[44px] rounded-lg border-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-[#FC7F11]" />
                <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" required className="border px-3 py-3 h-[44px] rounded-lg border-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-[#FC7F11]" />
                <select name="type" value={form.type} onChange={handleChange} className="border px-3 py-2 h-[44px] rounded-lg border-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-[#FC7F11]">
                  {enquiryTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <textarea rows={4} name="textarea" value={form.textarea} onChange={handleChange} placeholder="Your message" required className="border px-3 py-3 rounded-lg border-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-[#FC7F11] resize-none" />

              <div className="flex items-start justify-start">
                <input id="notify" name="notify" checked={form.notify} onChange={handleChange} type="checkbox" className="shrink-0 mt-1" />
                <label htmlFor="notify" className="text-sm pl-2 text-[#464646]">
                  I agree to receive WhatsApp notifications for communication purposes.
                </label>
              </div>

              <div className="flex justify-center">
                <button type="submit" disabled={loading || !canSubmit} className="inline-flex items-center justify-center rounded-lg mt-2 h-11 w-11/12 border-[#262626] border bg-white hover:bg-gray-50 xl:w-auto xl:px-[64px] xl:h-[44px] text-base font-medium disabled:opacity-50">
                  {loading ? "Sending..." : "Send enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center w-full bg-[#FCFCF7]" id="contact-faq">
        <div className="flex flex-col items-center justify-center gap-5 px-4 py-10 w-full max-w-[768px] xl:max-w-[1440px] xl:p-20 xl:items-stretch xl:gap-8">
          <h2 className="text-[#030712] text-2xl text-center font-medium leading-7 tracking-[0.36px] xl:text-4xl w-full">
            Frequently asked questions
          </h2>

          <div className="grid xl:grid-cols-2 gap-0 xl:gap-12">
            {faqs.map((item, idx) => (
              <div key={item.q} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full text-left py-4 flex justify-between items-center"
                >
                  <span className="text-[#262626] text-sm xl:text-base leading-6 tracking-[0.3px] font-medium pr-6">{item.q}</span>
                  <span className="text-xl text-[#262626]">{openFaq === idx ? "-" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="pb-4">
                    <p className="text-xs xl:text-sm text-[#70737A] leading-5 tracking-[0.42px]">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience-component">
        <ExperienceCentres />
      </section>

      <ContactCTASection />
      <Footer />
    </main>
  );
};

export default Contact;
