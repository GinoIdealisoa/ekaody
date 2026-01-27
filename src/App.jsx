import { Routes, Route, Link } from "react-router-dom"
import Hero from "./components/Hero.jsx"
import Header from "./components/Header.jsx"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header fixé en haut */}
      <Header />

      {/* Hero avec marge en haut */}
      <div className="pt-24">
        <Hero />
      </div>

    </div>
  )
}




