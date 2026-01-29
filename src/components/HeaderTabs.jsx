import { motion } from "framer-motion";

export default function HeaderTabs({ selectedTab, setSelectedTab }) {
  const tabs = [
    { label: "Accueil", id: "home" },
    { label: "À propos", id: "propos" },
    { label: "Service", id: "service" },
    { label: "Langage", id: "langage" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur z-50">
      <nav className="max-w-4xl mx-auto">
        <ul className="flex">
          {tabs.map((tab) => (
            <motion.li
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className="relative flex-1 text-center py-4 cursor-pointer font-medium"
              initial={false}
              animate={{
                backgroundColor:
                  selectedTab === tab.id ? "#eee" : "#ffffff00",
              }}
            >
              {tab.label}

              {selectedTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[3px] w-full bg-sky-500"
                />
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
