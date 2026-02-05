import React from "react";
import { Users, Target, ShieldCheck, Award, Briefcase, Heart, Lightbulb, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import ScrollReveal from "../../components/animations/ScrollReveal";
import Button from "../../components/common/Button";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Years Experience", value: "15+", icon: Briefcase },
    { label: "Projects Completed", value: "500+", icon: Award },
    { label: "Happy Clients", value: "1.2k", icon: Heart },
    { label: "Skilled Workers", value: "250+", icon: Users },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section - Enhanced with Abstract Shapes */}
      <section className="relative bg-slate-900 text-white py-24 lg:py-32">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1 rounded-full bg-orange-600/20 text-orange-400 text-sm font-semibold tracking-wide uppercase border border-orange-600/30">
                Building Excellence
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Crafting the <span className="text-orange-500">Future</span> of Infrastructure.
              </h1>
              <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
                BuildPro is more than a construction company. We are a team of visionaries dedicated to reshaping the Indian landscape with integrity and innovation.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" onClick={() => navigate("/contact")}>
                  Start Your Project
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-slate-900">
                  Our Story
                </Button>
              </div>
            </div>
          </FadeIn>

          <SlideIn direction="right" className="relative">
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80"
                alt="Construction Team"
                className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
              />
            </div>
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -left-6 bg-orange-500 p-6 rounded-2xl shadow-xl z-20 hidden md:block">
              <p className="text-4xl font-bold">15+</p>
              <p className="text-sm font-medium opacity-90">Years of Quality</p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-gray-100">
                <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h4 className="text-3xl font-bold text-gray-900">{stat.value}</h4>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Company Overview - Modernized Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1600585154154-71a1c1f1a5a8?auto=format&fit=crop&w=500&q=80" className="rounded-2xl mt-8 shadow-lg" alt="Project 1" />
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=500&q=80" className="rounded-2xl shadow-lg" alt="Project 2" />
             </div>
          </div>
          <FadeIn direction="right" className="order-1 md:order-2">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Company Overview</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Leading the Way in Modern Construction
            </h3>
            <div className="space-y-4 text-gray-600 text-lg">
              <p>
                BuildPro stands at the intersection of traditional craftsmanship and modern technology. From architectural planning to the final coat of paint, we manage the complexities so you don't have to.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base font-medium text-gray-800">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"/> Certified Engineering</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"/> Eco-Friendly Materials</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"/> Real Estate Advisory</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"/> Smart Home Integration</li>
              </ul>
              <div className="pt-6">
                <Button variant="primary" onClick={() => navigate("/services")}>
                  Explore Full Capabilities
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values Section - Glassmorphism Cards */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Values that Build Trust</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", text: "We adopt the latest construction technologies and BIM modeling to ensure precision.", icon: Lightbulb },
              { title: "Integrity", text: "Transparent pricing and honest timelines are the bedrock of our client relationships.", icon: ShieldCheck },
              { title: "Growth", text: "We don't just build structures; we help communities grow and thrive.", icon: TrendingUp },
            ].map((value, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="group p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                    <value.icon className="w-7 h-7 text-orange-600 group-hover:text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Impactful Dark Design */}
      <section className="py-20 bg-slate-900 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to bring your vision to life?</h2>
                <p className="text-slate-400 text-lg mb-10">
                    Join hundreds of satisfied homeowners and developers who trusted BuildPro. 
                    Let’s start a conversation about your next project today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="px-12 bg-orange-600 hover:bg-orange-700" onClick={() => navigate("/contact")}>
                        Get a Free Quote
                    </Button>
                    <Button variant="outline" size="lg" className="text-white border-slate-700 hover:bg-slate-800" onClick={() => navigate("/portfolio")}>
                        View Our Work
                    </Button>
                </div>
            </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default About