import { motion } from "framer-motion";
import { Trophy, Star, Award, Heart, Medal, Menu, Cpu, X } from "lucide-react";
import { useState } from "react";

const achievements = [
  { image: "/placeholder1.jpg", title: "Best Tech Startup", desc: "Recognized as an emerging leader in drone technology." },
  { image: "/placeholder2.jpg", title: "Innovation Excellence", desc: "Awarded for outstanding contributions to AI-driven agriculture." },
  { image: "/placeholder3.jpg", title: "Top 10 Startups", desc: "Ranked among the top 10 most promising startups of 2024." },
  { image: "/placeholder4.jpg", title: "Client Appreciation", desc: "Received heartfelt appraisals from our beloved clients for exceptional service." },
  { image: "/placeholder5.jpg", title: "Academic Recognition", desc: "Honored with multiple awards for innovation and research excellence during our academic journey." }
];

interface AchievementsProps {
  onNavigate?: (path: string) => void;
}

export default function Achievements({ onNavigate }: AchievementsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      setIsMenuOpen(false);
      onNavigate(path);
    }
  };

  const NavButton = ({ path, text }: { path: string; text: string }) => (
    <button
      onClick={() => handleNavigation(path)}
      className="px-6 py-2 rounded-lg relative group overflow-hidden interactive-hover"
    >
      <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] opacity-0 group-hover:opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left"></div>
    </button>
  );

  return (
    <section 
      className="relative min-h-screen p-16 flex flex-col justify-center bg-black"
      style={{ backgroundImage: "url('https://www.aeromotus.com/wp-content/uploads/2021/03/4-Rain-testing-IPX1-of-the-M300-RTK.gif')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
    >
      <nav className="fixed top-0 left-0 w-full z-50 nav-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <Cpu className="w-10 h-10 primary-text group-hover:rotate-180 transition-all duration-500 animate-float" />
              <span className="text-2xl font-bold primary-text neon-text">
                ＳＫＹＴＨＲＩＮΞＴＨＲΛ
              </span>
            </div>

            <div className="hidden md:flex space-x-2">
              <NavButton path="/" text="Home" />
              <NavButton path="/#about" text="About Us" />
              <NavButton path="/services" text="Services" />
              <NavButton path="/#vision" text="Vision" />
              <button 
                onClick={() => handleNavigation('/#contact')}
                className="px-6 py-2 rounded-lg primary-bg hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border"
              >
                Contact Us
              </button>
            </div>

            <button
              className="md:hidden primary-text transform transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
          }`}>
            <div className="flex flex-col space-y-4">
              <NavButton path="/" text="Home" />
              <NavButton path="/#about" text="About Us" />
              <NavButton path="/services" text="Services" />
              <NavButton path="/#vision" text="Vision" />
              <button 
                onClick={() => handleNavigation('/#contact')}
                className="px-6 py-2 rounded-lg primary-bg text-center hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="mt-32 mb-16 flex justify-center">
        <motion.div 
          className="glass-container px-8 py-4 rounded-xl hover-glow transform hover:scale-[1.02] transition-all duration-500" 
          whileHover={{ scale: 1.1, boxShadow: "0px 15px 40px rgba(96, 165, 250, 0.2)" }}>
          <h2 className="text-3xl font-bold primary-text neon-text text-center">Our Achievements</h2>
        </motion.div>
      </div>

      <div className="flex flex-col space-y-20 w-full max-w-7xl mx-auto">
        {achievements.map((ach, index) => (
          <motion.div
            key={index}
            className="glass-container p-16 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 w-full items-center justify-center text-center space-y-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h3 className="text-3xl font-semibold primary-text neon-text mb-6">{ach.title}</h3>
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="w-32 h-32 glass-container rounded-lg flex items-center justify-center animate-float">
                {index === 0 && <Trophy className="w-16 h-16 primary-text" />}
                {index === 1 && <Star className="w-16 h-16 primary-text" />}
                {index === 2 && <Award className="w-16 h-16 primary-text" />}
                {index === 3 && <Heart className="w-16 h-16 primary-text" />}
                {index === 4 && <Medal className="w-16 h-16 primary-text" />}
              </div>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl shimmer">{ach.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}