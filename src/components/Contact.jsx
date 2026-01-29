import React, { useEffect, useRef } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

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

    return () => { window.removeEventListener("resize", resizeCanvas); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 gap-12 overflow-hidden bg-white dark:bg-[#0b0b0b] text-black dark:text-white">
      {/* Canvas pour le fond */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.7 }} />

      {/* Infos Contact */}
      <div className="flex-1 max-w-md relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Contactez <span className="text-sky-600 dark:text-sky-400">E-KAODY</span>
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          Un projet en tête ? Une idée à concrétiser ?  
          Parlons-en ensemble et donnons vie à votre site web.
        </p>

        <div className="space-y-5 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-sky-600 dark:text-sky-400 text-xl" />
            <span>contact@e-kaody.com</span>
          </div>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-sky-600 dark:text-sky-400 text-xl" />
            <span>+261 34 00 000 00</span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-sky-600 dark:text-sky-400 text-xl" />
            <span>Antananarivo, Madagascar</span>
          </div>
        </div>
      </div>

      {/* Formulaire Contact */}
      <form className="flex-1 max-w-md flex flex-col gap-5 relative z-10">
        <input type="text" placeholder="Votre nom" className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
        <input type="email" placeholder="Votre email" className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
        <input type="text" placeholder="Sujet" className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
        <textarea placeholder="Votre message" rows="5" className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition resize-none"/>
        <button type="submit" className="mt-2 px-6 py-3 border border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 font-semibold rounded-xl hover:bg-sky-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-black transition-all duration-300">
          Envoyer
        </button>
      </form>
    </section>
  );
}
