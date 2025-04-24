import React from 'react'
import { Link } from 'react-router-dom';
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpeg";
import img6 from "../../assets/images/img6.jpg";

export default function ViewCarsByBrand() {

    const cars = [
        {
          name: 'Lamborghini',
          id:101,
          image: img3,
          brandName:'Lamborghini',
          description: 'Lamborghini is a luxury Italian brand known for its high-performance, exotic supercars with bold design and powerful engines.'          ,
        },
        {
          name: 'Ferrari',
          id:102,
          image: img2,
          brandName:'Ferrari',
          description: 'Ferrari is an iconic Italian automaker renowned for its sleek design, racing heritage, and high-performance sports cars.',
        },
        {
          name: 'Rolls-Royce',
          image: img1,
          description: 'Rolls-Royce is a British luxury automobile brand celebrated for its elegant design, supreme comfort, and handcrafted excellence.',
        },
        {
          name: 'Lamborghini Aventador',
          image: img4,
          description: 'A V12-powered beast known for its aggressive design and thrilling performance.',
        },
        {
          name: 'Ferrari SF90 Stradale',
          image: img5,
          description: 'Hybrid technology meets iconic Ferrari performance and style.',
        },
        {
          name: 'Rolls-Royce Ghost',
          image: img6,
          description: 'Luxury and refinement redefined in every detail and ride comfort.',
        },
      ];

  return (
    <section className="py-16 bg-gray-100">
       
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 racing-font tracking-wide mt-12">
            Explore Luxury Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cars.map(({ name, image, description,id }, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
              >
                 <Link to={`/viewcar/${id}`}>
                <img src={image} alt={name} className="w-full h-64 object-cover" />
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
      </section>
  )
}
