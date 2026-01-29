import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";

function Header({ selectedTab, setSelectedTab, darkMode, setDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { name: "Accueil", id: "home" },
    { name: "À propos", id: "propos" },
    { name: "Service", id: "service" },
    { name: "Langage", id: "langage" },
    { name: "Contact", id: "contact" },
  ];

  const handleLinkClick = (id) => {
    setSelectedTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg transition-colors duration-500">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 flex items-center justify-center text-white font-bold mr-3">
            E-K
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-sky-400">
            E-KAODY
          </h1>
        </div>

        {/* Desktop Tabs - menu centré */}
        <div className="hidden md:flex flex-1 justify-center relative">
          <nav className="flex space-x-8 text-gray-900 dark:text-gray-200 text-lg relative">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleLinkClick(section.id)}
                className={`relative font-medium px-1 py-1 ${
                  selectedTab === section.id
                    ? "text-sky-600 dark:text-sky-400"
                    : "hover:text-sky-600 dark:hover:text-sky-400"
                }`}
              >
                {section.name}
                {selectedTab === section.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-1 h-0.5 w-full bg-sky-500 dark:bg-sky-400"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Dark mode bouton à droite */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute right-0 p-2 rounded-full bg-white/10 dark:bg-gray-700/20 text-xl"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden text-gray-900 dark:text-gray-200 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg"
          >
            <ul className="flex flex-col items-center py-6 space-y-6 text-gray-900 dark:text-gray-200 text-xl">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleLinkClick(section.id)}
                    className={`font-semibold transition-colors duration-300 ${
                      selectedTab === section.id
                        ? "text-sky-600 dark:text-sky-400"
                        : "hover:text-sky-600 dark:hover:text-sky-400"
                    }`}
                  >
                    {section.name}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-3xl mt-4 p-3 rounded-full bg-white/10 dark:bg-gray-700/30 hover:scale-110 transition-all"
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
