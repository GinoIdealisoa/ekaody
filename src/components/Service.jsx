import { 
  FaPaintBrush, 
  FaRocket, 
  FaHeadset, 
  FaLightbulb 
} from 'react-icons/fa';

import { motion } from "framer-motion";

/* Animation cascade */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function Service() {
  return (
    /* Transition entre pages */
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <section
        id="service"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#111111] text-gray-900 dark:text-gray-100 py-20 md:py-32 overflow-hidden"
      >
        {/* Fond décoratif flottant */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-sky-500/10 to-transparent rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4"
          />

          <motion.div 
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full blur-3xl translate-x-1/4 translate-y-1/4"
          />
        </div>

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
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              {
                icon: FaPaintBrush,
                title: "Design signature",
                description: "Identité visuelle unique, interfaces fluides et micro-interactions soignées.",
                color: "sky"
              },
              {
                icon: FaRocket,
                title: "Performance & SEO",
                description: "Sites rapides, optimisés SEO et Core Web Vitals.",
                color: "indigo"
              },
              {
                icon: FaHeadset,
                title: "Accompagnement réel",
                description: "Suivi humain, réactivité et collaboration.",
                color: "sky"
              },
              {
                icon: FaLightbulb,
                title: "Sur mesure 100%",
                description: "Design et technique adaptés à vos besoins.",
                color: "indigo"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemAnim}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="
                  group relative
                  bg-white/70 dark:bg-gray-900/50
                  backdrop-blur-md
                  border border-gray-200/60 dark:border-gray-800/60
                  rounded-2xl
                  p-8
                  transition-all duration-500
                  hover:border-sky-400/40
                  hover:shadow-2xl hover:shadow-sky-500/10
                  hover:-translate-y-3
                  overflow-hidden
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`
                    inline-flex items-center justify-center
                    w-14 h-14 rounded-xl
                    bg-gradient-to-br
                    ${item.color === 'sky' 
                      ? 'from-sky-100 to-sky-200 dark:from-sky-950/70 dark:to-sky-900/70' 
                      : 'from-indigo-100 to-indigo-200 dark:from-indigo-950/70 dark:to-indigo-900/70'
                    }
                    text-${item.color}-600 dark:text-${item.color}-400
                    mb-6
                  `}
                >
                  <item.icon size={26} />
                </motion.div>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer texte */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              + de 100 projets réalisés • Satisfaction client 98% • Agence passionnée depuis 2023
            </p>
          </motion.div>

        </div>
      </section>
    </motion.div>
  );
}
