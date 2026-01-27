import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Apropos from "./components/Apropos.jsx";
import Service from "./components/Service.jsx";
import Langage from "./components/Langage.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-500`}>
      {/* Header sticky */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main content avec padding-top pour Header */}
      <main className="pt-24 bg-white dark:bg-[#0b0b0b] transition-colors duration-500">
        <Hero />
        <Apropos />
        <Service />
        <Langage />
        <Contact />
      </main>
    </div>
  );
}
