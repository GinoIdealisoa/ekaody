import React, { useEffect, useRef } from 'react';
import { FaPaintBrush, FaRocket, FaHeadset, FaLightbulb } from 'react-icons/fa';
import { motion } from "framer-motion";

/* Animation cascade */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
const itemAnim = { hidden: { opacity: 0, y: 50, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } } };

export default function Service() {
  const canvasRef = useRef(null);

  // ==== Background animé ====
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
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
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 8);
        gradient.addColorStop(0, `rgba(2,132,199,${this.opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(2,132,199,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());
    const waves = [];
    const createWave = () => { waves.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 0, maxRadius: 150 + Math.random() * 100, opacity: 0.6, speed: 1 + Math.random() * 0.5 }); };
    setInterval(createWave, 2000);

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dégradé radial
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      bgGradient.addColorStop(0, "rgba(2,132,199,0.03)");
      bgGradient.addColorStop(1, "rgba(2,132,199,0)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vagues
      waves.forEach((wave, index) => {
        wave.radius += wave.speed;
        wave.opacity -= 0.003;
        if (wave.opacity <= 0 || wave.radius > wave.maxRadius) { waves.splice(index, 1); return; }
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(2,132,199,${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(14,165,233,${wave.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Particules
      particles.forEach(p => { p.update(); p.draw(); });

      // Lignes entre particules
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(2,132,199,${(1 - distance / 120) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener("resize", resizeCanvas); cancelAnimationFrame(animationFrameId); }
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 py-20 md:py-32">
        {/* Canvas pour le fond */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.7 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">

          {/* Titre */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16 md:mb-20">
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
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: FaPaintBrush, title: "Design signature", description: "Identité visuelle unique, interfaces fluides et micro-interactions soignées.", color: "sky" },
              { icon: FaRocket, title: "Performance & SEO", description: "Sites rapides, optimisés SEO et Core Web Vitals.", color: "indigo" },
              { icon: FaHeadset, title: "Accompagnement réel", description: "Suivi humain, réactivité et collaboration.", color: "sky" },
              { icon: FaLightbulb, title: "Sur mesure 100%", description: "Design et technique adaptés à vos besoins.", color: "indigo" },
            ].map((item, index) => (
              <motion.div key={index} variants={itemAnim} whileHover={{ scale: 1.05, rotate: 1 }} transition={{ type: "spring", stiffness: 200 }}
                className="group relative bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-2xl p-8 transition-all duration-500 hover:border-sky-400/40 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-3 overflow-hidden"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${item.color === 'sky' ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'}`}>
                  <item.icon size={26} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer texte */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="mt-16 md:mt-20 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              + de 100 projets réalisés • Satisfaction client 98% • Agence passionnée depuis 2023
            </p>
          </motion.div>

        </div>
      </section>
    </motion.div>
  );
}
