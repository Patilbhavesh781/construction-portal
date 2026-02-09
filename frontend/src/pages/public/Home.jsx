import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Home = () => {
  return (
    <main className="bg-white w-full overflow-x-hidden">
      
      {/* ================= HERO (Section 1) ================= */}
     <section className=" mb-2 relative h-[100svh] w-full overflow-hidden">
  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100"
    className="absolute inset-0 w-full h-full object-cover"
    alt="Premium Homes"
  />

  {/* Dark Overlay for readability */}
  <div className="absolute inset-0 bg-black/45"></div>

  {/* Content */}
  <div className="relative z-10 h-full flex items-center px-12 md:px-24">
    <div className="max-w-5xl">
      <span className="text-sm font-bold tracking-[0.4em] text-red-400 uppercase">
        Est. 1998
      </span>

      <h1 className="text-6xl md:text-8xl font-light text-white leading-tight mt-6">
        Creating Communities <br />
        <span className="font-medium italic">That Inspire Living</span>
      </h1>

      <p className="mt-8 text-xl text-gray-200 max-w-2xl leading-relaxed">
        Thoughtfully planned residences designed to enhance everyday life,
        built with integrity and long-term value.
      </p>

      <div className="mt-12 flex gap-6">
        <button className="px-10 py-4 bg-red-600 text-white hover:bg-red-700 transition uppercase tracking-widest text-sm">
          Our Portfolio
        </button>
        <button className="px-10 py-4 border border-white text-white hover:bg-white hover:text-black transition uppercase tracking-widest text-sm">
          Contact Us
        </button>
      </div>
    </div>
  </div>
</section>


      {/* ================= ABOUT: RIGHT IMAGE (Section 2) ================= */}
      <section className=" mb-2 w-screen h-screen flex flex-col md:flex-row items-center overflow-hidden border-b border-gray-100">
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-12 md:px-24 bg-white">
          <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 leading-tight">
            A Commitment <br /><b>Beyond Construction</b>
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed max-w-md">
            Our approach to residential development is rooted in responsible
            planning, quality execution, and creating environments that promote
            wellbeing.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-full overflow-hidden">
          <img
            src= "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=100"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-1000"
            alt="Design Philosophy"
          />
        </div>
      </section>

      {/* ================= SUSTAINABILITY: LEFT IMAGE (Section 3) ================= */}
     <section className="w-full min-h-screen flex flex-col md:flex-row-reverse items-stretch overflow-hidden">
  
  {/* TEXT */}
  <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col justify-center px-8 md:px-24 bg-gray-50">
    <h2 className="text-4xl md:text-7xl font-light text-gray-900 mb-8 leading-tight">
      Designed With <br />
      <b>Responsibility</b>
    </h2>
    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md">
      Sustainability is integrated into every stage — from material
      selection to energy-efficient planning — ensuring a balanced
      relationship between built spaces and nature.
    </p>
  </div>

  {/* IMAGE */}
  <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen p-5">
    <img
      src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=100"
      className="w-full h-full object-cover"
      alt="Sustainable Design"
    />
  </div>

</section>


      {/* ================= FULL SCREEN SLIDER (Section 4) ================= */}
      <section className="w-screen h-screen relative bg-black">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          className="h-full w-full"
        >
          {[
            { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", title: "Urban Living Estates", location: "Mumbai, India" },
            { img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea", title: "The Sky Garden", location: "Pune, India" },
            { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", title: "Green Horizon", location: "Nashik, India" }
          ].map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img src={`${item.img}?auto=format&fit=crop&q=100`} className="w-full h-full object-cover" alt={item.title} />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-24 left-12 md:left-24 text-white">
                  <span className="text-red-500 font-bold tracking-widest">{item.location}</span>
                  <h3 className="text-6xl md:text-8xl font-thin uppercase tracking-tighter mt-2">{item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= AMENITIES GRID ================= */}
      <section className="py-32 px-12 md:px-24 bg-white">
        <h2 className="text-5xl font-light text-gray-900 mb-20 text-center">Unmatched Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {[
            "Infinity Pool", "Clubhouse", "Fitness Center", "Organic Gardens", 
            "Jogging Track", "Zen Deck", "Smart Security", "Children's Play Area"
          ].map((amenity, i) => (
            <div key={i} className="bg-white p-12 text-center hover:bg-gray-50 transition">
              <p className="text-gray-900 font-medium uppercase tracking-widest text-sm">{amenity}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-12 md:px-24 bg-white grid md:grid-cols-2 gap-20 items-center">
  <div>
    <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8">
      Design Philosophy
    </h2>
    <p className="text-gray-600 text-xl leading-relaxed max-w-lg">
      Every project begins with understanding how people live. Our designs
      prioritize light, airflow, open spaces, and seamless integration with
      nature.
    </p>
  </div>

  <img
    src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=100"
    className="w-full h-[420px] object-cover"
    alt="Design Philosophy"
  />
</section>


      {/* ================= FINAL CTA ================= */}
      <section className=" mb-4 relative py-48 text-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=100" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-light leading-tight">
              Ready to find your <br /> <span className="font-bold italic">Perfect Home?</span>
            </h2>
            <p className="mt-8 text-gray-400 text-lg">Schedule a private viewing at one of our flagship locations.</p>
            <button className="mt-12 px-12 py-5 bg-red-600 hover:bg-red-700 text-white font-bold transition-all uppercase tracking-[0.2em] shadow-2xl">
              Get in Touch
            </button>
        </div>
      </section>


      {/* ================= PLANS SECTION ================= */}
<section className="py-32 px-12 md:px-24 bg-white border-t border-gray-100">
  
  {/* Section Header */}
  <div className="max-w-7xl mx-auto mb-20">
    <span className="text-sm uppercase tracking-[0.4em] text-red-600 font-semibold">
      Plans
    </span>
    <h2 className="text-5xl md:text-6xl font-light text-gray-900 mt-6 leading-tight">
      Homes Designed for <br />
      <span className="font-medium italic">Every Lifestyle</span>
    </h2>
    <p className="mt-8 text-xl text-gray-600 max-w-2xl">
      Thoughtfully planned configurations offering optimal space utilization,
      comfort, and long-term value.
    </p>
  </div>

  {/* Plans Grid */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
    
    {[
      {
        title: "2 BHK Residences",
        size: "750 – 980 sq. ft.",
        desc: "Efficient layouts ideal for urban living with maximum functionality."
      },
      {
        title: "3 BHK Residences",
        size: "1100 – 1450 sq. ft.",
        desc: "Spacious homes designed for growing families and modern lifestyles."
      },
      {
        title: "Premium Penthouses",
        size: "1800+ sq. ft.",
        desc: "Exclusive residences offering privacy, panoramic views, and luxury."
      }
    ].map((plan, i) => (
      <div
        key={i}
        className="bg-white p-14 flex flex-col justify-between hover:bg-gray-50 transition"
      >
        <div>
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            {plan.title}
          </h3>
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
            {plan.size}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            {plan.desc}
          </p>
        </div>

        <button className="mt-10 text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline">
          View Plan
        </button>
      </div>
    ))}

  </div>

</section>


      

    </main>
  );
};

export default Home;