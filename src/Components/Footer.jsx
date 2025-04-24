import React from 'react';

export default function Footer() {
  const socialMedia = ['facebook', 'twitter', 'instagram', 'youtube'];

  const footerLinks = [
    { title: 'Gear', items: ['Helmets', 'Racing Suits', 'Gloves', 'Tires'], },
    { title: 'Track Tools', items: ['Lap Timer', 'Telemetry', 'Car Setup', 'Strategy Guide'], },
    { title: 'Garage', items: ['🏁 123 Speedway Blvd, Nitro City', '📧 support@racinghub.com', '📞 +1 (800) 555-TRACK',], isTextOnly: true, },
  ];

  return (
    <footer className="bg-black text-white font-mono">
      <div className="border-b border-gray-700 py-6 px-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-4 lg:mb-0 text-center lg:text-left">
          <span className="uppercase tracking-widest text-yellow-400 font-semibold">Join The Race</span>
        </div>
        <div className="flex justify-center gap-6">
          {socialMedia.map((platform) => (
            <a key={platform} href="#" className="hover:text-yellow-400 transition-colors duration-200">
              <i className={`fab fa-${platform} text-xl`}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <h6 className="uppercase text-yellow-400 font-bold mb-4 flex items-center">
            <i className="fas fa-flag-checkered mr-2"></i> Pit Stop
          </h6>
          <p>Fuel your passion with the latest in high-speed racing content and car performance upgrades.</p>
        </div>

        {footerLinks.map(({ title, items, isTextOnly }) => (
          <div key={title}>
            <h6 className="uppercase text-yellow-400 font-bold mb-4">{title}</h6>
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className={!isTextOnly ? 'mb-2 hover:text-yellow-400 cursor-pointer' : 'mb-2'}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center py-4 bg-gray-900 text-xs tracking-wide text-gray-400">
        © 2025 Racing Hub. Burn rubber, not your time.
      </div>
    </footer>
  );
}
