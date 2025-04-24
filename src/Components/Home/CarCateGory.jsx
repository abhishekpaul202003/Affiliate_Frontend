import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpeg";
import img6 from "../../assets/images/img6.jpg";

export default function ViewCarsByBrand() {
  const cars = [
    {
      id: 101,
      name: 'Lamborghini Huracán',
      image: img3,
      description: 'Sleek V10 with raw performance for the track and street.',
      specs: '631 hp | 0-60: 2.9s | Top Speed: 202 mph',
    },
    {
      id: 102,
      name: 'Ferrari 488 GTB',
      image: img2,
      description: 'Turbocharged power meets Italian design precision.',
      specs: '661 hp | 0-60: 3.0s | Top Speed: 205 mph',
    },
    {
      id: 103,
      name: 'Rolls-Royce Phantom',
      image: img1,
      description: 'Luxury in motion with a calm yet commanding presence.',
      specs: '563 hp | 0-60: 5.1s | Top Speed: 155 mph',
    },
    {
      id: 104,
      name: 'Lamborghini Aventador',
      image: img4,
      description: 'V12 fury and futuristic edges built for speed.',
      specs: '730 hp | 0-60: 2.8s | Top Speed: 217 mph',
    },
    {
      id: 105,
      name: 'Ferrari SF90 Stradale',
      image: img5,
      description: 'Hybrid tech with brutal horsepower for the modern racer.',
      specs: '986 hp | 0-60: 2.5s | Top Speed: 211 mph',
    },
    {
      id: 106,
      name: 'Rolls-Royce Ghost',
      image: img6,
      description: 'Smooth, powerful, and elegant under pressure.',
      specs: '563 hp | 0-60: 4.6s | Top Speed: 155 mph',
    },
  ];

  return (
    <section className="py-16 bg-black text-white bg-gradient-to-b from-black via-gray-900 to-black select-none">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-16 tracking-widest uppercase text-red-600 racing-font drop-shadow-lg">
          Elite Racing Machines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cars.map(({ id, name, image, description, specs }, index) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-xl border border-red-700 hover:border-white transition-all duration-300 group overflow-hidden select-none"
            >
              <Link to={`/viewcar/${id}`}>
                {/* Background Overlay Effect */}
                <div className="absolute inset-0 bg-red-500 opacity-10 group-hover:opacity-20 transition duration-300 blur-md z-0" />

                {/* Image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full h-60 object-cover rounded-t-3xl z-10 relative"
                />

                {/* Text Content */}
                <div className="p-6 z-10 relative space-y-2">
                  <h3 className="text-2xl font-bold text-red-500 uppercase tracking-wider">{name}</h3>
                  <p className="text-gray-300 text-sm italic">{description}</p>
                  <p className="text-white text-base font-mono">{specs}</p>
                </div>

                {/* Glow Border */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-red-500 transition duration-500 ease-in-out"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
