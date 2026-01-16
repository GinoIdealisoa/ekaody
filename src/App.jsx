import { Routes, Route, Link } from "react-router-dom"

function Home() {
  return <h1>Accueil</h1>
}

function About() {
  return <h1>À propos</h1>
}

function Contact() {
  return <h1>Contact</h1>
}

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Accueil</Link> | 
        <Link to="/about">À propos</Link> | 
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}
