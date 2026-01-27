import { 
  FaPhp, FaLaravel, FaJava, FaPython, FaReact 
} from "react-icons/fa";
import { 
  SiSpringboot, SiFlask, SiDjango, SiAngular, SiNextdotjs 
} from "react-icons/si";

export default function Langage() {
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

  return (
    <section
      id="langage"
      className="min-h-screen flex items-center justify-center 
      bg-gray-50 dark:bg-[#0b0b0b] 
      text-black dark:text-white 
      px-6 py-24 transition-colors duration-500"
    >
      <div className="max-w-6xl w-full text-center">

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
