"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Palette, Layers, Zap, Globe, Camera, Sparkles } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    description: "Complete brand identity solutions that capture your essence and resonate with your target audience.",
    icon: <Palette className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    features: ["Logo Design", "Brand Guidelines", "Color Palettes", "Typography"]
  },
  {
    id: 2,
    title: "Web Design & UI/UX",
    description: "Modern, responsive web designs that deliver exceptional user experiences across all devices.",
    icon: <Globe className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    features: ["Website Design", "Mobile Apps", "User Interface", "Prototyping"]
  },
  {
    id: 3,
    title: "Print & Digital Media",
    description: "Eye-catching designs for both traditional print and cutting-edge digital media platforms.",
    icon: <Layers className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-500",
    gradient: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
    features: ["Brochures", "Business Cards", "Social Media", "Advertisements"]
  },
  {
    id: 4,
    title: "Motion Graphics",
    description: "Dynamic animations and motion graphics that bring your brand to life with engaging visual storytelling.",
    icon: <Zap className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    gradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
    features: ["Animations", "Video Graphics", "GIFs", "Interactive Media"]
  },
  {
    id: 5,
    title: "Photography & Retouching",
    description: "Professional photography services and expert photo retouching to perfect every visual element.",
    icon: <Camera className="w-8 h-8" />,
    color: "from-indigo-500 to-purple-500",
    gradient: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
    features: ["Product Photography", "Portrait Retouching", "Color Correction", "Image Enhancement"]
  },
  {
    id: 6,
    title: "Creative Consulting",
    description: "Strategic creative direction and consulting to elevate your brand and maximize visual impact.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-rose-500 to-pink-500",
    gradient: "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
    features: ["Strategy Development", "Creative Direction", "Brand Audit", "Market Analysis"]
  }
];

const ServicesComponent: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach(card => observerRef.current?.observe(card));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6">
            Our Creative Services
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Transform your vision into stunning visual experiences with our comprehensive design services. 
            From brand identity to digital innovation, we craft designs that captivate and convert.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-card-id={service.id}
              className={`group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border border-slate-200/50 dark:border-slate-700/50 transform hover:-translate-y-2 ${
                visibleCards.includes(service.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Background Overlay */}
              <div 
                className={`absolute inset-0 rounded-3xl ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-6 text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className={`flex items-center space-x-3 transform transition-all duration-500 ${
                        hoveredCard === service.id 
                          ? 'translate-x-2 opacity-100' 
                          : 'translate-x-0 opacity-70'
                      }`}
                      style={{
                        transitionDelay: `${featureIndex * 50}ms`
                      }}
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className={`mt-8 transform transition-all duration-500 ${
                  hoveredCard === service.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <button className={`w-full py-3 px-6 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:brightness-110`}>
                    Learn More
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Creative Journey?
            </h3>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with innovative design solutions that make an impact.
            </p>
            <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-purple-50">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;