import { Link } from "react-router-dom";

const BookingCTA = () => {
  return (
    <section
      id="dream-home"
      className="bg-[#F6F5EF] flex flex-col items-center w-full"
    >
      <div className="flex flex-col items-center gap-8 px-4 py-12 w-full max-w-[768px] xl:max-w-[1440px] xl:px-20 xl:py-20">

        {/* Heading Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[#030712] text-2xl xl:text-4xl font-medium tracking-[0.36px]">
            Build your dream home
          </h2>

          <p className="text-[#6B7280] text-sm xl:text-lg font-medium tracking-[0.36px] max-w-2xl">
            Choose your layout, customise the details and receive a transparent quote.
          </p>
        </div>

        {/* Video Section */}
        <div className="relative w-full xl:h-[584px]">
          <video
            controls
            muted
            preload="none"
            playsInline
            poster="https://cdn.jswonehomes.com/dreamhomethumbnail_f020c8f136/dreamhomethumbnail_f020c8f136.webp"
            className="w-full h-full rounded-lg"
          >
            <source
              src="https://cdn.jswonehomes.com/video_1_ec4419110c/video_1_ec4419110c.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Button */}
        <Link
          to="/book-meeting"
          className="w-full flex items-center justify-center"
        >
          <button className="mt-4 bg-[#FC7F11] hover:bg-[#FC7F11]/90 text-white rounded-lg xl:rounded-xl text-base xl:text-xl font-medium h-11 xl:h-[44px] w-full xl:w-auto xl:px-[64px] transition-all duration-300">
            Book a meeting
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BookingCTA;