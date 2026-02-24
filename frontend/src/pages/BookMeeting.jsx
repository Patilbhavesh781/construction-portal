import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/jsw/Footer";
import ContactForm from "@/components/jsw/ContactForm";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Video } from "lucide-react";

const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const BookMeeting = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Book a meeting</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Schedule a free consultation with our home construction experts
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calendar */}
            <div>
              <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" /> Select a date
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {dates.map((date) => {
                    const key = date.toISOString().split("T")[0];
                    const isSelected = selectedDate === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedDate(key)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "bg-secondary hover:bg-secondary/80 text-foreground"
                        }`}
                      >
                        <span className="text-xs text-muted-foreground block">
                          {date.toLocaleDateString("en", { weekday: "short" })}
                        </span>
                        <span className="text-lg font-semibold">{date.getDate()}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Select a time
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground shadow-glow"
                              : "bg-secondary hover:bg-secondary/80 text-foreground"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="mt-8 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">Your meeting</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedDate).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookMeeting;
