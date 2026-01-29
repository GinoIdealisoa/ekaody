import { 
  FaPhp, FaLaravel, FaJava, FaPython, FaReact 
} from "react-icons/fa";
import { 
  SiSpringboot, SiFlask, SiDjango, SiAngular, SiNextdotjs 
} from "react-icons/si";
import { useEffect, useRef } from "react";

export default function Langage() {
  const canvasRef = useRef(null);

  const skills = [
    { name: "PHP", icon: <FaPhp />, color: "text-indigo-500" },
    { name: "Laravel", icon: <FaLaravel />, color: "text-red-500" },
    { name: "Java", icon: <FaJava />, color: "text-orange-500" },
    { name: "Spring Boot", icon: <SiSpringboot />, color: "text-green-500" },
    { name: "Python", icon: <FaPython />, color: "text-yellow-500" },
    { name: "Flask", icon: <SiFlask />, color: "text-gray-500" },
    { name: "Django", icon: <SiDjango />, color: "text-green-700" },
    { name: "Angular", icon: <SiAngular />, color: "text-red-600" },
    { name: "React", icon: <FaReact />, color: "text-sky-500" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-black dark:text-white" },
  ];

  // ==== Animation Canvas identique au Hero ====
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
        ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity})`;
        ctx.fill();

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
    setInterval(createWave, 2000);

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(14, 165, 233, ${wave.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

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

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ==== Rendu ====
  return (
    <section
      id="langage"
      className="min-h-screen flex items-center justify-center 
        bg-gray-50 dark:bg-[#0b0b0b] 
        text-black dark:text-white 
        px-6 py-24 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Canvas pour le background animé */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-[#0b0b0b]/50"></div>

      {/* Contenu */}
      <div className="relative z-10 max-w-6xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Nos <span className="text-sky-600 dark:text-sky-400">Technologies</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-12">
          Nous utilisons les meilleures technologies pour créer des applications
          web modernes, rapides et évolutives.
        </p>

        {/* Grille */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900/70 
                border border-gray-200/60 dark:border-gray-800/60
                rounded-xl p-6 flex flex-col items-center justify-center
                shadow-lg hover:shadow-sky-500/20
                hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`text-5xl mb-3 ${skill.color}`}>
                {skill.icon}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
