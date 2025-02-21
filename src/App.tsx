import React, { useState, useEffect } from 'react';
import { Cpu, Globe2, Users, Rocket, Menu, X } from 'lucide-react';
import ServicesPage from './components/Services';
import Achievements from './components/Achievements';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showServices, setShowServices] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('interactive-hover')) {
        const rect = target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty('--x', `${x}%`);
        target.style.setProperty('--y', `${y}%`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'vision', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setShowServices(false);
    setShowAchievements(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NavButton = ({ id, text }: { id: string; text: string }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`px-6 py-2 rounded-lg transition-all duration-300 relative group overflow-hidden interactive-hover ${
        activeSection === id
          ? 'primary-text font-bold scale-105 animate-glow'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] opacity-0 group-hover:opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left"></div>
    </button>
  );

  if (showServices) {
    return <ServicesPage onNavigate={(path) => {
      setShowServices(false);
      setShowAchievements(false);
      if (path === '/') {
        scrollToSection('home');
      } else if (path.startsWith('/#')) {
        scrollToSection(path.slice(2));
      }
    }} />;
  }

  if (showAchievements) {
    return <Achievements />;
  }

  return (
    <div className="min-h-screen text-white">
      <nav className="fixed w-full z-50 nav-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
              <Cpu className="w-10 h-10 primary-text group-hover:rotate-180 transition-all duration-500 animate-float" />
              <span className="text-2xl font-bold primary-text neon-text">
                SkyTrinethra
              </span>
            </div>

            <div className="hidden md:flex space-x-2">
              <NavButton id="home" text="Home" />
              <NavButton id="about" text="About Us" />
              <button 
                onClick={() => setShowAchievements(true)}
                className="px-6 py-2 rounded-lg relative group overflow-hidden interactive-hover"
              >
                <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">Achievements</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] opacity-0 group-hover:opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => setShowServices(true)}
                className="px-6 py-2 rounded-lg relative group overflow-hidden interactive-hover"
              >
                <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] opacity-0 group-hover:opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left"></div>
              </button>
              <NavButton id="vision" text="Vision" />
              <a 
                href="#contact" 
                className="px-6 py-2 rounded-lg primary-bg hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact Us
              </a>
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
              <NavButton id="home" text="Home" />
              <NavButton id="about" text="About Us" />
              <button 
                onClick={() => {
                  setShowAchievements(true);
                  setIsMenuOpen(false);
                }}
                className="px-6 py-2 rounded-lg relative group overflow-hidden text-left interactive-hover"
              >
                <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">Achievements</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] opacity-0 group-hover:opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => {
                  setShowServices(true);
                  setIsMenuOpen(false);
                }}
                className="px-6 py-2 rounded-lg relative group overflow-hidden text-left interactive-hover"
              >
                <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] opacity-0 group-hover:opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left"></div>
              </button>
              <NavButton id="vision" text="Vision" />
              <a 
                href="#contact"
                className="px-6 py-2 rounded-lg primary-bg text-center hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex flex-col justify-center px-6">
        <div className="max-w-4xl mx-auto text-center mt-32">
          <div className="glass-container p-12 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 animate-glow interactive-hover">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 primary-text neon-text leading-tight animate-float">
              Revolutionizing Aerial & Digital Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed shimmer">
              Transforming industries through cutting-edge drone technology and innovative software solutions.
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-lg primary-bg hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-lg font-semibold hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 primary-text neon-text text-center animate-float">
            About Us
          </h2>
          <div className="glass-container p-8 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 interactive-hover">
            <h3 className="text-3xl font-bold mb-4 primary-text neon-text">John Smith</h3>
            <p className="text-xl font-semibold mb-4 text-gray-300 shimmer">CEO & Founder</p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              With over 15 years of experience in drone technology and software development,
              John has led SkyTrinethra from a startup to an industry leader. His vision
              and expertise in both aerial technology and software solutions have
              revolutionized how businesses approach automation and data collection.
            </p>
            <div className="space-y-4 mb-8">
              {[
                "15+ Years Industry Experience",
                "Multiple Technology Patents",
                "Forbes 30 Under 30 Alumni",
                "Drone Technology Pioneer"
              ].map((achievement, i) => (
                <div key={i} className="flex items-center space-x-3 group interactive-hover">
                  <div className="w-2 h-2 rounded-full primary-bg group-hover:scale-150 transition-all duration-300 animate-pulse" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">{achievement}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <button className="p-3 rounded-full primary-bg hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-float">
                <Globe2 size={24} className="text-white" />
              </button>
              <button className="p-3 rounded-full primary-bg hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-float">
                <Users size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center glass-container p-12 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 interactive-hover">
          <Rocket className="w-16 h-16 mx-auto mb-8 primary-text animate-float" />
          <h2 className="text-4xl font-bold mb-8 primary-text neon-text">
            Our Vision
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed shimmer">
            At SkyTrinethra, we envision a future where cutting-edge drone technology 
            and innovative software solutions converge to transform industries. Our mission 
            is to continue pushing the boundaries of what's possible.
          </p>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-container p-12 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 interactive-hover">
            <h2 className="text-4xl font-bold mb-12 primary-text neon-text text-center">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold mb-6 shimmer">Get in Touch</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg glass-container border border-gray-700 focus:border-[#60A5FA] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#60A5FA]/20"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg glass-container border border-gray-700 focus:border-[#60A5FA] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#60A5FA]/20"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg glass-container border border-gray-700 focus:border-[#60A5FA] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#60A5FA]/20 h-32"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button className="w-full px-8 py-4 rounded-lg primary-bg hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border">
                    Send Message
                  </button>
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold mb-6 shimmer">Contact Information</h3>
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-gray-300 mb-2">Email</p>
                    <p className="primary-text group-hover:scale-105 transition-all duration-300 neon-text">contact@skytrinetra.com</p>
                  </div>
                  <div className="group">
                    <p className="text-gray-300 mb-2">Phone</p>
                    <p className="primary-text group-hover:scale-105 transition-all duration-300 neon-text">+1 (555) 123-4567</p>
                  </div>
                  <div className="group">
                    <p className="text-gray-300 mb-2">Address</p>
                    <p className="primary-text group-hover:scale-105 transition-all duration-300 neon-text">123 Innovation Hub, Tech City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 glass-container">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6 group hover:scale-105 transition-all duration-300">
              <Cpu className="w-8 h-8 primary-text group-hover:rotate-180 transition-all duration-500 animate-float" />
              <span className="text-xl font-bold primary-text neon-text">
                SkyTrinethra
              </span>
            </div>
            <p className="text-gray-300 shimmer">
              Revolutionizing the future with advanced drone and software solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 neon-text">Quick Links</h3>
            <div className="space-y-4">
              {['Home', 'About', 'Contact'].map((link) => (
                <button key={link} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 interactive-hover">
                  {link}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 neon-text">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <p className="hover:text-white transition-colors duration-300 interactive-hover">contact@skytrinetra.com</p>
              <p className="hover:text-white transition-colors duration-300 interactive-hover">+1 (555) 123-4567</p>
              <p className="hover:text-white transition-colors duration-300 interactive-hover">123 Innovation Hub, Tech City</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 neon-text">Newsletter</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 glass-container rounded-lg border border-gray-700 focus:border-[#60A5FA] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#60A5FA]/20"
              />
              <button className="w-full px-4 py-3 rounded-lg primary-bg hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;