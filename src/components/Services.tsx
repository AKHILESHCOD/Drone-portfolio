import { useState } from "react";
import { Cpu } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="relative min-h-screen bg-black bg-opacity-20 bg-fixed bg-center bg-cover text-tomato" style={{ backgroundImage: 'url(https://s.yimg.com/ny/api/res/1.2/RzLsVHl0R5_mHfGFOstm3A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MA--/https://media.zenfs.com/en/digital_camera_world_590/40479b1ffeadd3490d158ee2e9f4d656)' }}>
      {/* Navbar */}
      <header>
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-5 bg-black bg-opacity-30 text-tomato shadow-lg backdrop-blur-md z-20">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => onNavigate('/')}>
            <Cpu className="h-10 w-10" />
            <h1 className="text-2xl font-bold">SkyTrinethra</h1>
          </div>
          <div className="flex space-x-6 mt-3">
            <button onClick={() => onNavigate('/')} className="px-5 py-2 bg-transparent border border-tomato text-tomato rounded-lg shadow-md hover:bg-tomato hover:text-white transition duration-300">Home</button>
            <a href="#drone" className="px-5 py-2 bg-transparent border border-tomato text-tomato rounded-lg shadow-md hover:bg-tomato hover:text-white transition duration-300">Drone Services</a>
            <a href="#software" className="px-5 py-2 bg-transparent border border-tomato text-tomato rounded-lg shadow-md hover:bg-tomato hover:text-white transition duration-300">Software Services</a>
            <a href="#training" className="px-5 py-2 bg-transparent border border-tomato text-tomato rounded-lg shadow-md hover:bg-tomato hover:text-white transition duration-300">Training</a>
          </div>
        </nav>
      </header>

      {/* Content Sections */}
      <main className="pt-24 p-8 flex flex-col items-center space-y-16">
        {[
          { id: "drone", title: "Drone Services", fields: [
            { title: "Agriculture Drones", desc: "Enhance agricultural productivity with precision farming drones designed to monitor crops, analyze soil, and automate irrigation.", video: "agriculture.mp4" },
            { title: "Defense Drones", desc: "Secure your environment with advanced surveillance drones equipped with AI-powered tracking and reconnaissance capabilities.", video: "defense.mp4" },
            { title: "Commercial Drones", desc: "Optimize industrial operations with drones for delivery, inspections, and aerial mapping, ensuring efficiency and accuracy.", video: "commercial.mp4" },
            { title: "Smart Irrigation System", desc: "Revolutionize water management with automated irrigation drones that help conserve resources while maximizing crop yield.", video: "irrigation.mp4" }
          ] },
          { id: "software", title: "Software Services", fields: [
            { title: "Web Design", desc: "Crafting high-performance, responsive, and visually appealing web applications tailored to your business needs.", video: "webdesign.mp4" },
            { title: "App Development", desc: "Building fast, secure, and scalable mobile applications with intuitive user experiences for iOS and Android.", video: "appdevelopment.mp4" }
          ] },
          { id: "training", title: "Training", fields: [
            { title: "AI & Drone Technology", desc: "Join our comprehensive training programs covering drone technology, AI integration, and software development to gain hands-on expertise.", video: "training.mp4" }
          ] }
        ].map((section, index) => (
          <section key={index} id={section.id} className="w-full max-w-4xl p-8 mb-16 bg-black bg-opacity-20 rounded-lg shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-300 text-center">
            <h2 className="text-3xl font-bold text-tomato mb-6 transition-transform transform hover:scale-110 hover:text-tomato/90 duration-300">{section.title}</h2>
            {section.fields.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-8 bg-black bg-opacity-10 p-6 rounded-lg shadow-lg hover:bg-opacity-20 transition transform hover:scale-105 hover:shadow-xl duration-300 mb-10">
                <h3 className="text-xl text-tomato font-semibold">{item.title}</h3>
                <video controls className="w-3/4 bg-black bg-opacity-20 rounded-lg shadow-md">
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-white leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}