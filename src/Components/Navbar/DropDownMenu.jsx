import { FaCar } from 'react-icons/fa';
import { SiBmw, SiFerrari, SiAudi, SiMercedes, SiPorsche, SiTesla, SiLamborghini, SiVolkswagen, SiFord, SiMclaren, SiBugatti, SiAstonmartin } from 'react-icons/si';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function CarsBrands() {
  const carsData = [
    { BrandIcon: <SiBmw className="text-blue-600" />, name: 'BMW' },
    { BrandIcon: <SiFerrari className="text-red-600" />, name: 'Ferrari' },
    { BrandIcon: <SiMclaren className="text-orange-600" />, name: 'McLaren' },
    { BrandIcon: <SiLamborghini className="text-yellow-500" />, name: 'Lamborghini' },
    { BrandIcon: <SiPorsche className="text-red-700" />, name: 'Porsche' },
    { BrandIcon: <SiBugatti className="text-blue-900" />, name: 'Bugatti' },
    { BrandIcon: <SiAstonmartin className="text-green-800" />, name: 'Aston Martin' },
    { BrandIcon: <SiAudi className="text-red-500" />, name: 'Audi' },
    { BrandIcon: <SiMercedes className="text-gray-800" />, name: 'Mercedes-Benz' },
    { BrandIcon: <SiTesla className="text-red-500" />, name: 'Tesla' },
    { BrandIcon: <SiVolkswagen className="text-blue-800" />, name: 'Volkswagen' },
    { BrandIcon: <SiFord className="text-blue-600" />, name: 'Ford' },
    { BrandIcon: <FaCar className="text-gray-600" />, name: 'Other Brands' },
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <FaCar className="text-red-500" />
        <span>Supercar & Luxury Brands</span>
      </h2>
      <div className="flex flex-col gap-4">
        {carsData.map((car, index) => (
          <Menu key={index} as="div" className="relative">
            <Menu.Button className="w-full flex items-center gap-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer no-underline group">
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {car.BrandIcon}
              </span>
              <span className="text-sm font-medium text-white flex-grow">{car.name}</span>
              <span className="text-xs text-gray-400">View details →</span>
            </Menu.Button>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-200'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        View Details
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-200'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Compare Models
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-200'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Find Dealers
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ))}
      </div>
    </div>
  );
}