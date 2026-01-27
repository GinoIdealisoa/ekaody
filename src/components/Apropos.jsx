import React from 'react';

export default function Apropos() {
  return (
    <section
      id="propos"
      className="min-h-screen flex items-center justify-center 
      bg-white dark:bg-[#0b0b0b] 
      text-black dark:text-white 
      px-6 py-24 transition-colors duration-500 
      relative overflow-hidden"
    >
      {/* Splash background effect */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.15),transparent_60%)]
        dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_60%)]
        pointer-events-none">
      </div>

      <div className="relative z-10 max-w-6xl w-full 
        grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* Texte */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            À propos de <span className="text-sky-600 dark:text-sky-400">E-KAODY</span>
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-5">
            Chez <span className="font-semibold">E-KAODY</span>, nous croyons que 
            chaque entreprise mérite une présence digitale forte, moderne et performante. 
            Notre mission est de concevoir des sites web qui ne se contentent pas 
            d’être beaux, mais qui captivent, engagent et convertissent vos visiteurs.
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-5">
            De la création graphique à l’optimisation SEO, en passant par 
            le développement sur mesure, nous accompagnons nos clients 
            à chaque étape pour transformer leurs idées en solutions digitales efficaces.
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Avec une approche centrée sur l’innovation et la performance, 
            <span className="font-semibold text-sky-600 dark:text-sky-400">
              E-KAODY
            </span>{" "}
            s’engage à propulser votre marque vers le succès en ligne.
          </p>
        </div>

        {/* Image + Splash effect */}
        <div className="relative flex justify-center">
          
          {/* Glow derrière l'image */}
          <div className="absolute -inset-4 
            bg-[radial-gradient(circle,rgba(56,189,248,0.35),transparent_70%)]
            blur-2xl">
          </div>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="E-KAODY digital agency"
            className="relative w-full max-w-md rounded-2xl 
            shadow-2xl border border-sky-500/30 
            hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
}

