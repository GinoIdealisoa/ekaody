import React, { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";

function Header({ darkMode, setDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { name: "Accueil", id: "home" },
    { name: "A propos", id: "propos" },
    { name: "Projet", id: "projet" },
    { name: "Langage", id: "langage" },
    { name: "Contact", id: "contact" },
  ];

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          if (
            scrollPosition >= element.offsetTop &&
            scrollPosition < element.offsetTop + element.offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <header className="fixed top-0 left-0 w-full bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-lg z-50 transition-colors duration-500">
  <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
    {/* Logo */}
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg transition-transform duration-300 hover:scale-105">
        E-K
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-sky-400 tracking-tight">
        E-KAODY
      </h1>
    </div>

    {/* Menu desktop centré */}
    <nav className="hidden md:flex items-center justify-center w-full relative">
      <ul className="flex space-x-8 text-gray-900 dark:text-gray-200 text-base sm:text-lg md:text-xl">
        {sections.map((section, index) => (
          <li key={index} className="relative group">
            <a
              href={`#${section.id}`}
              className={`font-medium transition-all duration-300 relative ${
                activeSection === section.id
                  ? "text-sky-600 dark:text-sky-400"
                  : "hover:text-sky-600 dark:hover:text-sky-400"
              }`}
              onClick={handleLinkClick}
              aria-current={activeSection === section.id ? "page" : undefined}
            >
              {section.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-500 dark:bg-sky-400 transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>

      {/* Dark mode toggle desktop */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute right-0 p-2 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-20 backdrop-blur-md rounded-full hover:bg-opacity-20 dark:hover:bg-opacity-30 text-gray-900 dark:text-gray-200 text-xl sm:text-2xl transition-all duration-500"
        aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>

    {/* Hamburger mobile */}
    <button
      className="md:hidden text-gray-900 dark:text-gray-200 text-2xl"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
    </button>
  </div>

  {/* Menu mobile */}
  <div
    className={`md:hidden flex flex-col items-center justify-center bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-md transition-all duration-500 overflow-hidden`}
    style={{ maxHeight: isMobileMenuOpen ? "500px" : "0" }}
  >
    <ul className="flex flex-col items-center space-y-6 py-6 text-gray-900 dark:text-gray-200 text-xl sm:text-2xl">
      {sections.map((section, index) => (
        <li key={index} className="relative group">
          <a
            href={`#${section.id}`}
            onClick={handleLinkClick}
            className="block font-semibold transition-all duration-300 relative hover:text-sky-600 dark:hover:text-sky-400"
          >
            {section.name}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-500 dark:bg-sky-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </li>
      ))}

      {/* Dark mode toggle mobile */}
      <li>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-900 dark:text-gray-200 text-3xl mt-6 p-3 bg-white bg-opacity-10 dark:bg-gray-700 dark:bg-opacity-30 backdrop-blur-md rounded-full hover:scale-110 transition-all duration-500"
          aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </li>
    </ul>
  </div>
</header>

  );
}

export default Header;