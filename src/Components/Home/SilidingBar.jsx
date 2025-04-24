import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpeg";
import slide4 from "../../assets/images/slide4.jpg";

export default function SilidingBar() {
  const imagesSliding = [
    { img: slide1 },
    { img: slide2 },
    { img: slide3 },
    { img: slide4 },
  ];

  return (
    <div className="pt-20 w-screen h-[60vh] bg-black text-white bg-gradient-to-b from-black via-gray-900 to-black select-none">
      <div className="max-w-7xl mx-auto rounded-3xl border-4 border-red-600 shadow-2xl overflow-hidden relative">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={3000}
          showStatus={false}
          showArrows={false}
        >
          {imagesSliding.map((item, index) => (
            <div key={index} className="w-full h-[60vh] relative">
              <img
                className="w-full h-full object-cover"
                src={item.img}
                alt={`Slide ${index + 1}`}
              />
              {/* Matching Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/60 z-10" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
