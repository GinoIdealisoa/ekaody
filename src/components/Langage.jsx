import {   
  FaPhp, FaLaravel, FaJava, FaPython, FaReact 
} from "react-icons/fa";
import { 
  SiSpringboot, SiFlask, SiDjango, SiAngular, SiNextdotjs, SiFlutter, SiReact, SiMysql, SiDocker
} from "react-icons/si";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Langage() {
  const skills = [
    { name: "PHP", icon: <FaPhp />, color: "text-indigo-500", level: 85 },
    { name: "Laravel", icon: <FaLaravel />, color: "text-red-500", level: 60 },
    { name: "Java", icon: <FaJava />, color: "text-orange-500", level: 75 },
    { name: "Spring Boot", icon: <SiSpringboot />, color: "text-green-500", level: 70 },
    { name: "Python", icon: <FaPython />, color: "text-yellow-500", level: 80 },
    { name: "Flask", icon: <SiFlask />, color: "text-gray-500", level: 65 },
    { name: "Django", icon: <SiDjango />, color: "text-green-700", level: 70 },
    { name: "Angular", icon: <SiAngular />, color: "text-red-600", level: 55 },
    { name: "React", icon: <FaReact />, color: "text-sky-500", level: 90 },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-black dark:text-white", level: 85 },
    { name: "React Native", icon: <SiReact />, color: "text-sky-400", level: 75 },
    { name: "Flutter", icon: <SiFlutter />, color: "text-blue-500", level: 60 },
    { name: "MySQL", icon: <SiMysql />, color: "text-blue-700", level: 80 },
    { name: "Docker", icon: <SiDocker />, color: "text-blue-400", level: 70 },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Défilement infini automatique
  useEffect(() => {
    if (isPaused) return;

    const animate = async () => {
      await controls.start({
        x: [0, -skills.length * 170],
        transition: {
          duration: skills.length * 3,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    animate();

    return () => controls.stop();
  }, [isPaused, controls, skills.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const renderCards = (offset = 0) =>
    skills.map((skill, index) => (
      <div
        key={`${index}-${offset}`}
        className="relative bg-white dark:bg-gray-900/70 
          border border-gray-200/60 dark:border-gray-800/60
          rounded-xl p-6 flex flex-col items-center justify-center
          shadow-lg hover:shadow-sky-500/20
          hover:-translate-y-2 transition-all duration-500 min-w-[150px]"
        onMouseEnter={() => setHoveredIndex(index + offset * skills.length)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className={`text-5xl mb-3 ${skill.color}`}>{skill.icon}</div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-center">
          {skill.name}
        </h3>

        {/* Barre de compétence au survol */}
        {hoveredIndex === index + offset * skills.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 
              bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-lg 
              shadow-xl border border-gray-700 w-44 z-20"
          >
            <div className="text-xs font-medium mb-2 text-center">
              Niveau de compétence
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-sky-500 h-2 rounded-full"
              />
            </div>
            <div className="text-center font-bold text-sky-400">
              {skill.level}%
            </div>
            {/* Petite flèche pointant vers le haut */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 
              w-0 h-0 border-l-8 border-r-8 border-b-8 
              border-l-transparent border-r-transparent border-b-gray-900 dark:border-b-gray-800" />
          </motion.div>
        )}
      </div>
    ));

  // ===== Background Canvas =====
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
        ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 8);
        gradient.addColorStop(0, `rgba(2, 132, 199, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(2, 132, 199, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());

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

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-24">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />

      <div className="relative z-10 w-full max-w-6xl text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white">
          Nos <span className="text-sky-600 dark:text-sky-400">Technologies</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
          Nous maîtrisons un large éventail de technologies modernes pour créer des solutions 
          innovantes et performantes. Découvrez les outils et frameworks que nous utilisons 
          au quotidien pour donner vie à vos projets.
        </p>

        {/* Carrousel */}
        <div
          className="w-full overflow-hidden relative"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="flex gap-6 pb-20" 
            animate={controls}
            style={{ width: 'max-content' }}
          >
            {renderCards(0)}
            {renderCards(1)}
            {renderCards(2)}
          </motion.div>

          {/* Gradients de fondu sur les côtés */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent pointer-events-none" />
        </div>

        <p className="mt-8 text-gray-600 dark:text-gray-400 text-sm">
          Survolez une technologie pour voir le niveau de compétence
        </p>
      </div>
    </section>
  );
}