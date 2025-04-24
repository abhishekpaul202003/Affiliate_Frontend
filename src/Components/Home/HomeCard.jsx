import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpeg";
import img6 from "../../assets/images/img6.jpg";

export default function Card() {
  const cars = [
    {
      name: 'Lamborghini',
      image: img3,
      brandName: 'Lamborghini',
      description: 'Lamborghini is a luxury Italian brand known for its high-performance, exotic supercars with bold design and powerful engines.',
    },
    {
      name: 'Ferrari',
      image: img2,
      brandName: 'Ferrari',
      description: 'Ferrari is an iconic Italian automaker renowned for its sleek design, racing heritage, and high-performance sports cars.',
    },
    {
      name: 'Rolls-Royce',
      image: img1,
      brandName: 'Rolls-Royce',
      description: 'Rolls-Royce is a British luxury automobile brand celebrated for its elegant design, supreme comfort, and handcrafted excellence.',
    },
    {
      name: 'Lamborghini Aventador',
      image: img4,
      brandName: 'Lamborghini',
      description: 'A V12-powered beast known for its aggressive design and thrilling performance.',
    },
    {
      name: 'Ferrari SF90 Stradale',
      image: img5,
      brandName: 'Ferrari',
      description: 'Hybrid technology meets iconic Ferrari performance and style.',
    },
    {
      name: 'Rolls-Royce Ghost',
      image: img6,
      brandName: 'Rolls-Royce',
      description: 'Luxury and refinement redefined in every detail and ride comfort.',
    },
  ];

  return (
    <section className="py-16 bg-black text-white bg-gradient-to-b from-black via-gray-900 to-black select-none">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="mt-12 text-5xl font-extrabold text-center mb-16 tracking-widest uppercase text-red-600 racing-font drop-shadow-lg">
          Explore Luxury Cars
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {cars.map(({ name, image, description, brandName }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 3 }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="w-[320px] md:w-[360px] bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-xl border-4 border-red-700 hover:border-white transition-all duration-300 group overflow-hidden relative select-none transform hover:shadow-red-500/40"
            >
              <Link to={`/carcategory/${brandName}`}>
                {/* Background glow */}
                <div className="absolute inset-0 bg-red-500 opacity-10 group-hover:opacity-30 transition duration-300 blur-md z-0" />

                {/* Car Image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full h-56 md:h-72 object-cover rounded-t-3xl z-10 relative"
                />

                {/* Content */}
                <div className="p-6 z-10 relative space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-red-500 uppercase tracking-wider racing-font">
                    {name}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base italic">{description}</p>
                </div>

                {/* Border glow hover */}
                <div className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-red-500 transition duration-500 ease-in-out"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
