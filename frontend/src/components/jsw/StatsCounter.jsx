import { useEffect, useRef, useState } from "react";

const counters = [
  { value: 81, prefix: "+", suffix: "", label: "NPS Score" },
  { value: 12, prefix: "", suffix: "+", label: "Homes Delivered" },
  { value: 5, prefix: "", suffix: "+", label: "Homes Under Construction" },
  { value: 15, prefix: "", suffix: "+", label: "Services Available" },
];

const StatsCounter = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-bold">
                {inView ? (
                  <AnimatedNumber target={item.value} prefix={item.prefix} suffix={item.suffix} delay={i * 150} />
                ) : (
                  `${item.prefix}0${item.suffix}`
                )}
              </p>
              <p className="mt-2 text-sm text-accent-foreground/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedNumber = ({ target, prefix, suffix, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <>{prefix}{count}{suffix}</>;
};

export default StatsCounter;