import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center
      bg-gray-50 dark:bg-[#0b0b0b]
      text-black dark:text-white
      px-6 py-24 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_top,rgba(2,132,199,0.12),transparent_70%)]
        dark:bg-[radial-gradient(circle_at_top,rgba(2,132,199,0.08),transparent_70%)]
        pointer-events-none">
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Infos Contact */}
        <div>
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

        {/* Formulaire */}
        <form
          className="bg-white dark:bg-gray-900/70 
          border border-gray-200/60 dark:border-gray-800/60
          p-8 rounded-2xl shadow-xl space-y-5"
        >
          <div>
            <label className="block mb-1 font-medium">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full px-4 py-3 rounded-lg
              bg-gray-100 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-3 rounded-lg
              bg-gray-100 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Votre message..."
              className="w-full px-4 py-3 rounded-lg
              bg-gray-100 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-semibold
            py-3 rounded-lg shadow-lg
            hover:bg-sky-500 transition"
          >
            Envoyer le message
          </button>
        </form>

      </div>
    </section>
  );
}
