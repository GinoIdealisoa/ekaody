import React from 'react';
import { motion } from 'framer-motion';

// ── Variantes d’animation ──────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 55 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, damping: 14 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 75, damping: 18, duration: 1.3 },
  },
};

const revealContainerVariants = {
  hidden: { opacity: 0.4, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: 'easeOut' },
  },
};

const splashVariants = {
  initial: { scale: 1.1, opacity: 0.6 },
  animate: {
    scale: [1.1, 1.25, 1.1],
    opacity: [0.6, 0.85, 0.6],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

const imageRevealVariants = {
  rest: { clipPath: 'ellipse(0% 0% at 30% 40%)' },
  hover: {
    clipPath: 'ellipse(140% 180% at 35% 25%)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Style Keyframes Box ──
const boxStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 10,
};

export default function Apropos() {
  return (
    <section
      id="propos"
      className={`
        relative min-h-screen flex items-center justify-center
        bg-white dark:bg-[#0a0a0a]
        text-black dark:text-white
        px-5 sm:px-8 lg:px-14 xl:px-20
        py-16 md:py-24 lg:py-32
        overflow-hidden
        transition-colors duration-700
      `}
    >
      {/* Fond radial */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_25%_10%,rgba(14,165,233,0.16)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_25%_10%,rgba(14,165,233,0.10)_0%,transparent_50%)]"/>
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_40%_-20%,rgba(59,130,246,0.13)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_at_40%_-20%,rgba(59,130,246,0.08)_0%,transparent_65%)] translate-y-[10%] sm:translate-y-[18%]"/>

      <motion.div
        className="relative z-10 max-w-7xl w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* ── Texte ── */}
          <div className="space-y-7 md:space-y-9 lg:pt-10 xl:pt-14">
            <motion.h2 variants={titleVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              À propos de{' '}
              <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                E-KAODY
              </span>
            </motion.h2>

            <motion.p variants={textVariants} className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300/90">
              Chez <span className="font-semibold text-sky-600 dark:text-sky-400">E-KAODY</span>, nous transformons les idées en expériences digitales percutantes.
            </motion.p>

            <motion.p variants={textVariants} className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300/90">
              Design moderne, développement sur mesure, performance optimisée, SEO puissant — nous couvrons tout le spectre pour que votre présence en ligne ne soit pas seulement visible, mais inoubliable.
            </motion.p>

            <motion.p variants={textVariants} className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300/90">
              Notre obsession ? Créer des sites qui convertissent vraiment.
            </motion.p>

            <motion.p variants={textVariants} className="text-lg md:text-xl font-medium text-sky-600 dark:text-sky-300 pt-4">
              E-KAODY — Votre croissance digitale commence ici.
            </motion.p>
          </div>

          {/* ── Image avec Keyframes + Reveal ── */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0 group">
            
            {/* Splash pulsant */}
            <motion.div
              className="absolute -inset-12 sm:-inset-16 lg:-inset-20 bg-gradient-to-br from-sky-400/45 via-cyan-300/30 to-blue-500/10 dark:from-sky-600/30 dark:via-cyan-500/20 dark:to-blue-700/10 rounded-full blur-3xl lg:blur-4xl opacity-70 pointer-events-none"
              variants={splashVariants}
              initial="initial"
              animate="animate"
            />

            {/* Conteneur image + Keyframes */}
            <motion.div
              style={boxStyle}
              animate={{
                scale: [1, 1.2, 1.2, 1, 1],
                rotate: [0, 0, 10, -10, 0],
                borderRadius: ["10%", "15%", "50%", "15%", "10%"],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="relative w-full max-w-md lg:max-w-xl overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-sky-950/25 dark:shadow-black/60 border border-sky-400/20 dark:border-sky-600/15"
            >
              {/* Image principale */}
              <img
                src="https://images.pexels.com/photos/7688335/pexels-photo-7688335.jpeg"
                alt="Équipe E-KAODY"
                className="w-full h-full object-cover"
              />

              {/* Image révélée */}
              <motion.div className="absolute inset-0" variants={imageRevealVariants} initial="rest" whileHover="hover">
                <img
                  src="https://images.pexels.com/photos/7163395/pexels-photo-7163395.jpeg"
                  alt="E-KAODY — Collaboration digitale moderne"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
