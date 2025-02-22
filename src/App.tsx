import React, { useState, useEffect } from 'react';
import { Cpu, Globe2, Users, Rocket, Menu, X } from 'lucide-react';
import ServicesPage from './components/Services';
import Achievements from './components/Achievements';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showServices, setShowServices] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContact = () => {
    window.open("https://forms.gle/YOUR_GOOGLE_FORM_LINK", "_blank");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNavigate = (path: string) => {
    if (path === '/services') {
      setShowServices(true);
      setShowAchievements(false);
    } else if (path === '/achievements') {
      setShowAchievements(true);
      setShowServices(false);
    } else {
      setShowServices(false);
      setShowAchievements(false);
      if (path.startsWith('/#')) {
        scrollToSection(path.substring(2));
      }
    }
  };

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

  // If showing Services or Achievements, render those components
  if (showServices) {
    return <ServicesPage onNavigate={handleNavigate} />;
  }

  if (showAchievements) {
    return <Achievements onNavigate={handleNavigate} />;
  }

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('https://www.youtube.com', '_blank');
  };

  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/50 border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
              <Cpu className="w-10 h-10 primary-text group-hover:rotate-180 transition-all duration-500 animate-float" />
              <span className="text-2xl font-bold primary-text">
                ＳＫＹＴＨＲＩＮΞＴＨＲΛ
              </span>
            </div>

            <div className="hidden md:flex space-x-2">
              <NavButton id="home" text="Home" />
              <NavButton id="about" text="About Us" />
              <NavButton id="vision" text="Vision" />
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
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6">
        <div className="max-w-4xl mx-auto text-center mt-32">
          <div className="glass-container p-12 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 animate-glow interactive-hover">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 primary-text leading-tight animate-float">
              Revolutionizing Aerial & Digital Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed shimmer">
              Transforming industries through cutting-edge drone technology and innovative software solutions.
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-lg primary-bg hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-lg font-semibold hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover z-20"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 primary-text text-center animate-float">
            About Us
          </h2>
          <div className="glass-container p-8 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 interactive-hover">
            <h3 className="text-3xl font-bold mb-4 primary-text">John Smith</h3>
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

      {/* Vision Section */}
      <section id="vision" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center glass-container p-12 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 interactive-hover">
          <Rocket className="w-16 h-16 mx-auto mb-8 primary-text animate-float" />
          <h2 className="text-4xl font-bold mb-8 primary-text">
            Our Vision
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed shimmer">
            At SkyTrinethra, we envision a future where cutting-edge drone technology 
            and innovative software solutions converge to transform industries. Our mission 
            is to continue pushing the boundaries of what's possible.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-container p-8 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 interactive-hover flex items-center justify-center" style={{ height: 'auto' }}>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-8 text-[#FF6347]">
                Contact Us
              </h2>
              <div className="space-y-6 mb-8">
                {/* Company Details */}
                <div className="text-center space-y-4">
                  <p className="text-xl font-semibold text-white">Company Name: SkyTrinethra</p>
                  <p className="text-xl font-semibold text-white">Email: info@skythrinethra.com</p>
                  <p className="text-xl font-semibold text-white">Phone: (123) 456-7890</p>
                  <p className="text-xl font-semibold text-white">Address: 123 Innovation St., Tech City</p>
                </div>
                
                {/* Gap between company details and button */}
                <div className="mt-8">
                  {/* Send Message Button */}
                  <button
                    type="button"
                    onClick={handleContact}
                    className="px-8 py-4 rounded-lg primary-bg hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-lg font-semibold hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover z-20"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 px-6 nav-blur border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass-container p-8 rounded-2xl hover-glow transform hover:scale-[1.02] transition-all duration-500 interactive-hover">
            <p className="text-gray-300">&copy; 2025 SkyTrinethra, All Rights Reserved.</p>
            <p className="text-gray-300 mt-2">Follow Us:</p>
            
            <div className="flex justify-center space-x-6 mt-4">
            <button
                  type="button"
                  onClick={() => window.open('https://www.youtube.com', '_blank')}
                  className="w-12 h-12 hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover flex items-center justify-center z-20">
                  <img 
                  src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" 
                  alt="Linkedin" 
                  className="w-8 h-8"
                 />
                 </button>              
                 <button
                  type="button"
                  onClick={() => window.open('https://www.youtube.com', '_blank')}
                  className="w-12 h-12 hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover flex items-center justify-center z-20">
                  <img 
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png" 
                  alt="Twitter" 
                  className="w-8 h-8"
                 />
                 </button>             
                  <button
                  type="button"
                  onClick={() => window.open('https://www.youtube.com', '_blank')}
                  className="w-12 h-12 hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover flex items-center justify-center z-20">
                  <img 
                  src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" 
                  alt="Instagram" 
                  className="w-8 h-8"
                 />
                 </button>
                 <button
                  type="button"
                  onClick={() => window.open('https://www.youtube.com', '_blank')}
                  className="w-12 h-12 hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover flex items-center justify-center z-20">
                  <img 
                  src="https://cdn-icons-png.flaticon.com/128/733/733547.png" 
                  alt="Facebook" 
                  className="w-8 h-8"
                 />
                 </button>  
                 <button
                  type="button"
                  onClick={() => window.open('https://www.youtube.com', '_blank')}
                  className="w-12 h-12 hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#60A5FA]/20 animate-pulse-border interactive-hover flex items-center justify-center z-20">
                  <img 
                  src="https://cdn-icons-png.flaticon.com/128/174/174883.png" 
                  alt="Youtube" 
                  className="w-8 h-8"
                 />
                 </button>               
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;