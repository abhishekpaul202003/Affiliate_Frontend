import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import img1 from "../../assets/img/l1.jpg";
import img2 from "../../assets/images/lam2.avif";
import img3 from "../../assets/images/lam3.avif";
import img4 from "../../assets/images/lam4.jpg";
import img5 from "../../assets/images/lam5.jpg";
import img6 from "../../assets/images/lam6.jpg";

const cardHoverMotion = {
  whileHover: { scale: 1.05, rotate: 5 },
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
};

const headingMotion = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 1, ease: 'easeOut' },
  whileHover: { scale: 1.05, textShadow: '0px 0px 20px #f43f5e' },
};

export default function ViewCarsByBrand() {
  const cars = useMemo(() => [
    {
      id: 101,
      name: 'Lamborghini Revuelto',
      image: img1,
      description: 'The next-gen hybrid V12 redefining Lamborghini power and precision.',
      specs: '1,001 hp | 0-60: 2.5s | Top Speed: 218 mph',
    },
    {
      id: 102,
      name: 'Lamborghini Sián FKP 37',
      image: img2,
      description: 'Limited edition hybrid hypercar with futuristic design and performance.',
      specs: '819 hp | 0-60: 2.8s | Top Speed: 217 mph',
    },
    {
      id: 103,
      name: 'Lamborghini Centenario',
      image: img3,
      description: 'A tribute to Ferruccio Lamborghini, engineered with aerodynamic mastery.',
      specs: '770 hp | 0-60: 2.8s | Top Speed: 217 mph',
    },
    {
      id: 104,
      name: 'Lamborghini Aventador SVJ',
      image: img4,
      description: 'Track-bred aggression meets iconic V12 thunder in this supercar legend.',
      specs: '770 hp | 0-60: 2.6s | Top Speed: 217 mph',
    },
    {
      id: 105,
      name: 'Lamborghini Huracán STO',
      image: img5,
      description: 'Race-spec engineering in a street-legal format. Pure corner domination.',
      specs: '640 hp | 0-60: 3.0s | Top Speed: 193 mph',
    },
    {
      id: 106,
      name: 'Lamborghini Essenza SCV12',
      image: img6,
      description: 'Track-only V12 beast tuned for extreme aerodynamics and downforce.',
      specs: '830 hp | Track-Only | Top Speed: 211+ mph',
    },
  ], []);

  return (
    <section className="py-16 bg-black text-white bg-gradient-to-b from-black via-gray-900 to-black select-none">
      <div className="max-w-7xl mx-auto px-4">
        {/* Animated Heading */}
        <motion.h2
          {...headingMotion}
          className="mt-10 text-5xl font-extrabold text-center mb-16 tracking-widest uppercase text-red-600 racing-font drop-shadow-2xl"
        >
          <span className="inline-block animate-pulse">Lamborghini Racing Legends</span>
        </motion.h2>

        {/* Car Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cars.map(({ id, name, image, description, specs }, index) => (
            <motion.div
              key={id}
              {...cardHoverMotion}
              transition={{ delay: index * 0.3, duration: 0.7, ease: 'easeOut' }}
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-xl border border-red-700 hover:border-white transition-all duration-300 group overflow-hidden select-none min-h-[500px] flex flex-col"
            >
              <Link to={`/viewcar/${id}`}>
                {/* Background Glow */}
                <div className="absolute inset-0 bg-red-500 opacity-10 group-hover:opacity-20 transition duration-300 blur-md z-0" />

                {/* Fitted Image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full h-60 sm:h-72 md:h-64 lg:h-60 xl:h-60 object-cover object-center rounded-t-3xl z-10 relative"
                />

                {/* Text Content */}
                <div className="p-6 z-10 relative space-y-2 flex-grow">
                  <motion.h3
                    className="text-2xl sm:text-3xl font-bold text-red-500 uppercase tracking-wider racing-font"
                    whileHover={{ scale: 1.1, color: "#f87171" }}
                  >
                    {name}
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 text-sm md:text-base italic"
                    whileHover={{ opacity: 0.8 }}
                  >
                    {description}
                  </motion.p>
                  <motion.p
                    className="text-white text-base font-mono"
                    whileHover={{ scale: 1.05 }}
                  >
                    {specs}
                  </motion.p>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-red-500 transition duration-500 ease-in-out" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
