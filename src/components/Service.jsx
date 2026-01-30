import React, { useEffect, useRef, useState } from "react";
import { FaPaintBrush, FaRocket, FaHeadset, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Service() {
  const canvasRef = useRef(null);
  const [impactPositions, setImpactPositions] = useState([]);

  const services = [
    { icon: FaPaintBrush, title: "Design signature", description: "Identité visuelle unique, interfaces fluides et micro-interactions soignées.", color: "sky" },
    { icon: FaRocket, title: "Performance & SEO", description: "Sites rapides, optimisés SEO et Core Web Vitals.", color: "indigo" },
    { icon: FaHeadset, title: "Accompagnement réel", description: "Suivi humain, réactivité et collaboration.", color: "sky" },
    { icon: FaLightbulb, title: "Sur mesure 100%", description: "Design et technique adaptés à vos besoins.", color: "indigo" },
  ];

  const handleImpact = (index) => {
    const grid = document.querySelector(".service-grid");
    if (!grid) return;
    const card = grid.children[index];
    const rect = card.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height;
    setImpactPositions((prev) => [
      ...prev,
      { x, y, radius: 0, speed: 6 + Math.random() * 2, opacity: 0.5 + Math.random() * 0.2 },
    ]);
  };

  // === BACKGROUND PARTICULES ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(2,132,199,${this.opacity})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // IMPACTS
      impactPositions.forEach((imp, index) => {
        imp.radius += imp.speed;
        imp.opacity -= 0.01;
        if (imp.opacity <= 0) {
          impactPositions.splice(index, 1);
          return;
        }
        ctx.beginPath();
        ctx.arc(imp.x, imp.y, imp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(2,132,199,${imp.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [impactPositions]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 py-20 md:py-32">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.7 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 dark:from-sky-400 dark:via-sky-300 dark:to-indigo-400">
              Nos services
            </span>
          </h2>
          <p className="mt-5 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Nous concevons des expériences digitales <span className="font-semibold text-sky-600 dark:text-sky-400">modernes</span>, 
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> performantes</span> et <span className="font-semibold text-sky-600 dark:text-sky-400">mémorables</span>.
          </p>
        </motion.div>

        {/* Cartes */}
        <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: index * 0.5, // une par une
              }}
              onAnimationComplete={() => handleImpact(index)}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="group relative bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-2xl p-8 transition-all duration-500 hover:border-sky-400/40 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-3 overflow-hidden"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${item.color === 'sky' ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'}`}>
                <item.icon size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
