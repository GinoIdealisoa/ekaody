import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import bean from "../assets/bean.gif";
export default function Contact() {
  const canvasRef = useRef(null);

  // --- State du formulaire ---
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    numero: "",
    message: "",
  });

  // --- Gestion des changements dans le formulaire ---
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Si c'est le champ numéro, autorise uniquement les chiffres
    if (id === "floating_numero") {
      if (!/^\d*$/.test(value)) return; // ignore tout ce qui n'est pas un chiffre
    }

    setFormData((prev) => ({
      ...prev,
      [id.replace("floating_", "")]: value,
    }));
  };

  // --- Gestion de l'envoi ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, email, numero, message } = formData;

    // Vérification des champs obligatoires
    if (!nom || !email || !message) {
      Swal.fire({
        icon: "error",
        title: "Erreur !",
        text: "Tous les champs doivent être remplis.",
        confirmButtonText: "Ok",
      });
      return;
    }

    // Affichage "envoi en cours"
    Swal.fire({
  title: "Envoi en cours...",
  html: `
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="w-12 h-12 border-4 border-t-sky-500 border-b-sky-500 border-gray-200 rounded-full animate-spin"></div>
      <p>Merci de patienter, votre message est en cours d'envoi...</p>
    </div>
  `,
  showConfirmButton: false,
  allowOutsideClick: false,
});


    try {
      const templateParams = { nom, email, numero, message };

      await emailjs.send(
        "service_i6sgc4p",      // ton Service ID
        "template_sffs8fe",     // ton Template ID
        templateParams,
        "Js9tw785Pe0ZfdA5U"    // <-- Remplace par ta clé publique EmailJS
      );

      Swal.fire({
  title: `Merci ${nom} pour votre message !`,
  html: `<p class="has-text-weight-bold">
          Votre message a été envoyé avec succès chez E-KAODY.
        </p>`,
  imageUrl: bean, // ou '/assets/bean.gif'
  imageWidth: 120,
  imageHeight: 120,
  showConfirmButton: false,
  background: 'transparent',
  customClass: {
    image: 'swal-round-image'
  },
  willOpen: () => {
    const popup = Swal.getPopup();
    popup.style.border = "2px solid #095579";
    popup.style.color = "#ffffff";

    setTimeout(() => {
      popup.style.border = "none";
      popup.style.color = "";
      Swal.close();
    }, 3000);
  }
});

      // Réinitialisation du formulaire
      setFormData({
        nom: "",
        email: "",
        numero: "",
        message: "",
      });
    } catch (err) {
      console.error("Erreur EmailJS :", err);
      Swal.fire({
        icon: "error",
        title: "Erreur !",
        text: "Impossible d'envoyer votre message.",
        confirmButtonText: "Ok",
      });
    }
  };

  // --- Canvas du fond animé (inchangé) ---
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
        ctx.fillStyle = `rgba(2,132,199,${this.opacity})`;
        ctx.fill();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 8
        );
        gradient.addColorStop(0, `rgba(2,132,199,${this.opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(2,132,199,0)");
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
      bgGradient.addColorStop(0, "rgba(2,132,199,0.03)");
      bgGradient.addColorStop(1, "rgba(2,132,199,0)");
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
        ctx.strokeStyle = `rgba(2,132,199,${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(14,165,233,${wave.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      particles.forEach((p) => {
        p.update();
        p.draw();
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
            ctx.strokeStyle = `rgba(2,132,199,${(1 - distance / 120) * 0.3})`;
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

  // --- Formulaire JSX (inchangé visuellement) ---
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 gap-12 overflow-hidden bg-white dark:bg-[#0b0b0b] text-black dark:text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.7 }}
      />

      {/* Infos Contact */}
      <div className="flex-1 max-w-md relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Contactez <span className="text-sky-600 dark:text-sky-400">E-KAODY</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          Un projet en tête ? Une idée à concrétiser ? Parlons-en ensemble et donnons vie à votre site web.
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
      <form
        onSubmit={handleSubmit}
        className="flex-1 max-w-md flex flex-col gap-5 relative z-10"
      >
        {/* Nom */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            id="floating_nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer"
          />
          <label htmlFor="floating_nom" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-focus:dark:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Votre nom
          </label>
        </div>

        {/* Email */}
        <div className="relative z-0 w-full group">
          <input
            type="email"
            id="floating_email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer"
          />
          <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-focus:dark:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Votre email
          </label>
        </div>

        {/* Numéro */}
        <div className="relative z-0 w-full group">
          <input
            type="number"  // <- accepte uniquement les nombres
            min="0"
            id="floating_numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer"
          />
          <label htmlFor="floating_numero" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-focus:dark:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Votre numéro
          </label>
        </div>

        {/* Message */}
        <div className="relative z-0 w-full group">
          <textarea
            id="floating_message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer resize-none"
          ></textarea>
          <label htmlFor="floating_message" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-sky-600 peer-focus:dark:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Votre message
          </label>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border-2 border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-400 dark:hover:text-black transition duration-300 ease-in-out focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 focus:outline-none"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
