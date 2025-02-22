import { motion } from "framer-motion";
import { Trophy, Star, Award, Heart, Medal, Menu, Cpu } from "lucide-react";
import { useState } from "react";

interface AchievementsProps {
  onNavigate: (path: string) => void;
}

const achievements = [
  { image: "/placeholder1.jpg", title: "Best Tech Startup", desc: "Recognized as an emerging leader in drone technology." },
  { image: "/placeholder2.jpg", title: "Innovation Excellence", desc: "Awarded for outstanding contributions to AI-driven agriculture." },
  { image: "/placeholder3.jpg", title: "Top 10 Startups", desc: "Ranked among the top 10 most promising startups of 2024." },
  { image: "/placeholder4.jpg", title: "Client Appreciation", desc: "Received heartfelt appraisals from our beloved clients for exceptional service." },
  { image: "/placeholder5.jpg", title: "Academic Recognition", desc: "Honored with multiple awards for innovation and research excellence during our academic journey." }
];

export default function Achievements({ onNavigate }: AchievementsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleContact = () => {
    window.open("https://forms.gle/YOUR_GOOGLE_FORM_LINK", "_blank");
  };

  return (
    <section 
      className="relative min-h-screen p-16 flex flex-col justify-center"
      style={{ backgroundImage: "url('https://www.aeromotus.com/wp-content/uploads/2021/03/4-Rain-testing-IPX1-of-the-M300-RTK.gif')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center bg-black/70 backdrop-blur-xl p-6 shadow-xl border-b border-gray-800 hover:shadow-2xl transition-all">
        <div className="flex items-center space-x-4">
          <Cpu className="h-12 w-12 text-tomato" />
          <h1 className="text-2xl font-bold text-tomato">ＳＫＹＴＨＲＩＮΞＴＨＲΛ</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/#about" },
            { name: "Vision", path: "/#vision" },
            { name: "Contact Us", path: "/#contact" },
            { name: "Services", path: "/services" },
            { name: "Send Message", action: handleContact }
          ].map((item) => (
            <motion.div 
              key={item.name} 
              className="px-4 py-1 bg-gray-800/70 text-tomato rounded-md shadow-lg border border-gray-700 transition-all hover:bg-gray-700/50 hover:shadow-xl cursor-pointer"
              whileHover={{ scale: 1.1, boxShadow: "0px 10px 30px rgba(255, 99, 71, 0.5)" }}
              onClick={() => item.action ? item.action() : onNavigate(item.path)}
            >
              <span className="text-tomato text-sm">{item.name}</span>
            </motion.div>
          ))}
        </div>
        <motion.button 
          className="md:hidden text-tomato" 
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.2, rotate: 90 }}
        >
          <Menu size={28} />
        </motion.button>
      </nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/80 backdrop-blur-xl p-6 flex flex-col space-y-4 shadow-2xl md:hidden">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/#about" },
            { name: "Vision", path: "/#vision" },
            { name: "Contact Us", path: "/#contact" },
            { name: "Services", path: "/services" },
            { name: "Send Message", action: handleContact }
          ].map((item) => (
            <motion.div 
              key={item.name}
              className="text-tomato hover:text-tomato/80 transition cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => item.action ? item.action() : onNavigate(item.path)}
            >
              {item.name}
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="mt-20 mb-16 flex justify-center">
        <motion.div 
          className="bg-black/50 px-8 py-4 rounded-xl shadow-2xl border border-gray-700 transition-all" 
          whileHover={{ scale: 1.1, boxShadow: "0px 15px 40px rgba(255, 99, 71, 0.5)" }}>
          <h2 className="text-2xl font-bold text-tomato text-center uppercase tracking-wide">🏆 Our Achievements</h2>
        </motion.div>
      </div>
      <div className="flex flex-col space-y-20 w-full max-w-7xl mx-auto">
        {achievements.map((ach, index) => (
          <motion.div
            key={index}
            className="flex flex-col bg-black/60 text-tomato/90 p-16 rounded-3xl shadow-3xl border border-gray-800 transition-transform w-full items-center justify-center text-center space-y-10"
            whileHover={{ scale: 1.1, boxShadow: "0px 15px 40px rgba(255, 99, 71, 0.6)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h3 className="text-3xl font-semibold text-tomato mb-6">{ach.title}</h3>
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="w-32 h-32 bg-tomato/20 rounded-lg shadow-xl border border-gray-700 flex items-center justify-center">
                {index === 0 && <Trophy className="w-16 h-16 text-tomato" />}
                {index === 1 && <Star className="w-16 h-16 text-tomato" />}
                {index === 2 && <Award className="w-16 h-16 text-tomato" />}
                {index === 3 && <Heart className="w-16 h-16 text-tomato" />}
                {index === 4 && <Medal className="w-16 h-16 text-tomato" />}
              </div>
              <p className="text-lg text-tomato/90 leading-relaxed max-w-2xl">{ach.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}