import { FaCalendarAlt } from "react-icons/fa"
import { FiArrowDown } from "react-icons/fi"
import { BsSearch } from "react-icons/bs"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(2,132,199,0.18),transparent_65%)]"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-10">
          <BsSearch className="text-sky-600 text-lg" />
          CRÉER UN SITE WEB <span className="font-extrabold">VRAIMENT UNIQUE</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Votre <span className="text-sky-600">site</span> doit donner envie <br />
          de <span className="text-sky-600">rester</span>, pas de{" "}
          <span className="line-through decoration-sky-600">
            revenir en arrière
          </span>.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
          Design moderne, SEO solide, Suivi complet : <br />
          on construit un site qui retient vos visiteurs et vous apporte des résultats.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

          <button className="flex items-center justify-center gap-3 bg-sky-600 text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(2,132,199,0.4)] hover:bg-sky-500 transition">
            <FaCalendarAlt />
            Prendre RDV
          </button>

          <button className="flex items-center justify-center gap-3 border border-sky-600 text-sky-600 font-semibold px-8 py-4 rounded-xl hover:bg-sky-600 hover:text-black transition">
            Découvrir nos projets
            <FiArrowDown />
          </button>

        </div>

        {/* Small note */}
        <div className="mt-6 text-gray-400 italic flex justify-center items-center gap-2">
          <span>↳</span> Un petit click ?
        </div>

      </div>
    </section>
  )
}
