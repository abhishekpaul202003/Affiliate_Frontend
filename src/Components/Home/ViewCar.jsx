import React, { useState } from 'react';
import { motion } from 'framer-motion';

import img1 from '../../assets/img/l1.jpg';
import img2 from '../../assets/img/l2.jpg';
import img3 from '../../assets/img/l3.jpg';
import img4 from '../../assets/img/l4.jpg';
import img5 from '../../assets/img/l5.jpg';
import img6 from '../../assets/img/l6.jpg';


export default function ViewCar() {
  const car = {
    name: 'Lamborghini Revuelto',
    description:
      'Meet the Lamborghini Revuelto – the world’s first HPEV (High-Performance Electrified Vehicle) with a V12 engine. This beast fuses Lamborghini’s iconic power with electric innovation, delivering mind-blowing acceleration and agility. Designed for the future, styled for the track, and born for adrenaline.',
    specs: [
      'Engine: 6.5L V12 Hybrid (Naturally Aspirated + 3 e-motors)',
      'Power: 1,001 hp',
      'Acceleration: 0-60 mph in 2.5 seconds',
      'Top Speed: 218 mph',
      'Transmission: 8-speed dual-clutch',
      'Drivetrain: All-Wheel Drive',
    ],
    images: [img1, img2, img3, img4, img5, img6], // <-- 6 images now
  };

  const [selectedImage, setSelectedImage] = useState(car.images[0]);

  return (
    <section className="bg-black text-white min-h-screen py-12 px-6 md:px-16 select-none">
      {/* Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-12 text-4xl md:text-6xl font-extrabold text-center uppercase tracking-widest text-red-600 racing-font mb-12 drop-shadow-lg"
      >
        Lamborghini Revuelto
      </motion.h1>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Main Image & Thumbnails */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt="Main"
            className="w-full h-[400px] object-cover rounded-3xl border-4 border-red-700 shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {car.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-24 h-16 object-cover rounded-lg border-2 cursor-pointer transition duration-300 ${
                  selectedImage === img ? 'border-red-500' : 'border-gray-700'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Car Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex-1 space-y-6 bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-red-800 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-red-500 uppercase tracking-wide mb-4">
            Performance Specs
          </h2>
          <ul className="text-white font-mono space-y-2 text-lg">
            {car.specs.map((spec, idx) => (
              <li key={idx} className="flex items-center gap-2 before:content-['⚡'] before:text-red-500">
                {spec}
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-gray-700">
            <h3 className="text-xl font-bold text-gray-300 mb-2 uppercase">About the Revuelto</h3>
            <p className="text-gray-400 leading-relaxed">{car.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
