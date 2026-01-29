import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Variantes d’animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};
const titleVariants = { hidden: { opacity: 0, y: 55 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, damping: 14 } } };
const textVariants = { hidden: { opacity: 0, y: 40, filter: 'blur(5px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 75, damping: 18, duration: 1.3 } } };
const revealContainerVariants = { hidden: { opacity: 0.4, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: 'easeOut' } } };
const splashVariants = { initial: { scale: 1.1, opacity: 0.6 }, animate: { scale: [1.1, 1.25, 1.1], opacity: [0.6, 0.85, 0.6], transition: { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } } };
const imageRevealVariants = { rest: { clipPath: 'ellipse(0% 0% at 30% 40%)' }, hover: { clipPath: 'ellipse(140% 180% at 35% 25%)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };

// Style box image
const boxStyle = { width: '100%', height: '100%', borderRadius: 10 };

export default function Apropos() {
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
      constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.vx = (Math.random() - 0.5) * 0.8; this.vy = (Math.random() - 0.5) * 0.8; this.radius = Math.random() * 2 + 1; this.opacity = Math.random() * 0.5 + 0.3; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > canvas.width) this.vx *= -1; if (this.y < 0 || this.y > canvas.height) this.vy *= -1; }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity})`; ctx.fill(); const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 8); gradient.addColorStop(0, `rgba(2, 132, 199, ${this.opacity*0.4})`); gradient.addColorStop(1, "rgba(2,132,199,0)"); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius*8, 0, Math.PI*2); ctx.fill(); }
    }

    const particles = Array.from({length:80}, () => new Particle());
    const waves = [];
    const createWave = () => { waves.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, radius:0, maxRadius:150+Math.random()*100, opacity:0.6, speed:1+Math.random()*0.5 }); };
    setInterval(createWave, 2000);

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0,0,canvas.width,canvas.height);

      const bgGradient = ctx.createRadialGradient(canvas.width/2 + Math.sin(time)*100, canvas.height/2 + Math.cos(time)*100, 0, canvas.width/2, canvas.height/2, canvas.width/2);
      bgGradient.addColorStop(0,"rgba(2,132,199,0.03)"); bgGradient.addColorStop(1,"rgba(2,132,199,0)"); ctx.fillStyle=bgGradient; ctx.fillRect(0,0,canvas.width,canvas.height);

      waves.forEach((wave,index)=>{
        wave.radius+=wave.speed; wave.opacity-=0.003;
        if(wave.opacity<=0||wave.radius>wave.maxRadius){ waves.splice(index,1); return; }
        ctx.beginPath(); ctx.arc(wave.x,wave.y,wave.radius,0,Math.PI*2); ctx.strokeStyle=`rgba(2,132,199,${wave.opacity})`; ctx.lineWidth=2; ctx.stroke();
        ctx.beginPath(); ctx.arc(wave.x,wave.y,wave.radius*0.7,0,Math.PI*2); ctx.strokeStyle=`rgba(14,165,233,${wave.opacity*0.5})`; ctx.lineWidth=1; ctx.stroke();
      });

      particles.forEach(p=>{p.update();p.draw();});
      for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x; const dy=particles[i].y-particles[j].y; const distance=Math.sqrt(dx*dx+dy*dy); if(distance<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(2,132,199,${(1-distance/120)*0.3})`;ctx.lineWidth=1;ctx.stroke();}}}
      animationFrameId=requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener("resize", resizeCanvas); cancelAnimationFrame(animationFrameId); }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] text-black dark:text-white">
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{opacity:0.7}} />

      {/* Contenu */}
      <motion.div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 py-16 md:py-24 lg:py-32"
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.15 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          <div className="space-y-7 md:space-y-9 lg:pt-10 xl:pt-14">
            <motion.h2 variants={titleVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              À propos de <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent">E-KAODY</span>
            </motion.h2>
            <motion.p variants={textVariants} className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300/90">
              Chez <span className="font-semibold text-sky-600 dark:text-sky-400">E-KAODY</span>, nous transformons les idées en expériences digitales percutantes.
            </motion.p>
            <motion.p variants={textVariants} className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300/90">
              Design moderne, développement sur mesure, performance optimisée, SEO puissant — nous couvrons tout le spectre pour que votre présence en ligne ne soit pas seulement visible, mais inoubliable.
            </motion.p>
          </div>

          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div className="relative w-full max-w-md lg:max-w-xl overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-sky-950/25 dark:shadow-black/60 border border-sky-400/20 dark:border-sky-600/15"
              style={boxStyle}
              animate={{ scale:[1,1.2,1.2,1,1], rotate:[0,0,10,-10,0], borderRadius:["10%","15%","50%","15%","10%"] }}
              transition={{ duration:6, ease:"easeInOut", times:[0,0.2,0.5,0.8,1], repeat:Infinity, repeatDelay:1 }}
            >
              <img src="https://images.pexels.com/photos/7688335/pexels-photo-7688335.jpeg" alt="Équipe E-KAODY" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
