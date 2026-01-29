import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Apropos from "./components/Apropos";
import Service from "./components/Service";
import Langage from "./components/Langage";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  const pages = {
    home: <Hero />,
    propos: <Apropos />,
    service: <Service />,
    langage: <Langage />,
    contact: <Contact />,
  };

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-500`}>
      <Header
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {pages[selectedTab]}
            <Footer />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
