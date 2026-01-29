import { FaCalendarAlt } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { useEffect, useRef } from "react";

export default function Hero() {
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

    // Particules connectées
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
        ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity})`;
        ctx.fill();

        // Halo lumineux
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 8
        );
        gradient.addColorStop(0, `rgba(2, 132, 199, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(2, 132, 199, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());

    // Ondes énergétiques
    const waves = [];
    const createWave = () => {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: 150 + Math.random() * 100,
        opacity: 0.6,
        speed: 1 + Math.random() * 0.5,
      });
    };

    // Créer des ondes périodiquement
    setInterval(createWave, 2000);

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fond avec dégradé animé
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      bgGradient.addColorStop(0, "rgba(2, 132, 199, 0.03)");
      bgGradient.addColorStop(1, "rgba(2, 132, 199, 0)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner et mettre à jour les ondes
      waves.forEach((wave, index) => {
        wave.radius += wave.speed;
        wave.opacity -= 0.003;

        if (wave.opacity <= 0 || wave.radius > wave.maxRadius) {
          waves.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(2, 132, 199, ${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Onde intérieure
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(14, 165, 233, ${wave.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Mettre à jour et dessiner les particules
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connecter les particules proches
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(2, 132, 199, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Lignes énergétiques traversantes
      if (Math.random() > 0.97) {
        const startX = Math.random() < 0.5 ? 0 : canvas.width;
        const startY = Math.random() * canvas.height;
        const endX = startX === 0 ? canvas.width : 0;
        const endY = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        
        const lineGradient = ctx.createLinearGradient(startX, startY, endX, endY);
        lineGradient.addColorStop(0, "rgba(2, 132, 199, 0)");
        lineGradient.addColorStop(0.5, "rgba(2, 132, 199, 0.6)");
        lineGradient.addColorStop(1, "rgba(2, 132, 199, 0)");
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(2, 132, 199, 0.8)";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Cercles pulsants aux coins
      const corners = [
        { x: 50, y: 50 },
        { x: canvas.width - 50, y: 50 },
        { x: 50, y: canvas.height - 50 },
        { x: canvas.width - 50, y: canvas.height - 50 },
      ];

      corners.forEach((corner, i) => {
        const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, 30 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(2, 132, 199, ${0.2 * pulse})`;
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
  }, []);

  const scrollToApropos = () => {
    const element = document.getElementById("propos");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0b0b] text-black dark:text-white relative overflow-hidden transition-colors duration-500"
    >
      {/* Canvas animé en arrière-plan */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-[#0b0b0b]/50"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="inline-flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-6 py-3 rounded-full font-semibold text-sm mb-10 shadow-xl border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300 hover:scale-105">
          <BsSearch className="text-sky-600 text-lg animate-pulse" />
          CRÉER UN SITE WEB <span className="font-extrabold">VRAIMENT UNIQUE</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Votre <span className="text-sky-600 animate-pulse">site</span> doit donner envie <br />
          de <span className="text-sky-600">rester</span>, pas de{" "}
          <span className="line-through decoration-sky-600 decoration-4">revenir en arrière</span>.
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mt-6 text-lg max-w-2xl mx-auto drop-shadow">
          Design moderne, SEO solide, Suivi complet : <br />
          on construit un site qui retient vos visiteurs.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
          <button className="group flex items-center justify-center gap-3 bg-sky-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-sky-600/50 transition-all duration-300 hover:scale-105 hover:bg-sky-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <FaCalendarAlt className="relative z-10" />
            <span className="relative z-10">Nous contacter</span>
          </button>

          <button
            onClick={scrollToApropos}
            className="group flex items-center justify-center gap-3 border-2 border-sky-600 text-sky-600 dark:text-sky-400 font-semibold px-8 py-4 rounded-xl hover:bg-sky-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-sky-600/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-sky-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10">Découvrir nos projets</span>
            <FiArrowDown className="relative z-10 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}