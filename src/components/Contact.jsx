import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center
      bg-white dark:bg-[#0b0b0b] text-black dark:text-white px-6 py-20 gap-12 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Infos Contact */}
      <div className="flex-1 max-w-md">
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
      <form className="flex-1 max-w-md flex flex-col gap-5">
        <input
          type="text"
          placeholder="Votre nom"
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <input
          type="email"
          placeholder="Votre email"
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <input
          type="text"
          placeholder="Sujet"
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <textarea
          placeholder="Votre message"
          rows="5"
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-sky-500 transition resize-none"
        />

        <button
          type="submit"
          className="mt-2 px-6 py-3 border border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 font-semibold rounded-xl
          hover:bg-sky-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-black transition-all duration-300"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
