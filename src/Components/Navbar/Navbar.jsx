import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoCloseSharp, IoSearch, IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [log, setLog] = useState(false)

    const MENUDATA = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/service' },
        { name: 'Featured', href: '/featured' },
        { name: 'Contact Me', href: '/contact' },
    ];

    return (
        <nav className="flex justify-between items-center h-16 bg-white md:px-32 px-10 text-black relative shadow-sm font-mono" role="navigation">
            <h1>Logo</h1>

            <div className="hidden md:flex items-center gap-8">
                <ul className="flex gap-5">
                    {MENUDATA.map((item, index) => (
                        <li key={index}>
                            <Link to={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-3 items-center text-xl">
                    <IoSearch className='text-gray-400' />

                    {log ?
                        <div >
                            <IoPerson className='text-gray-400' />
                        </div>
                        :
                        <Link to='/signUp' >
                            <button className='bg-blue-400 px-2 py-1 rounded-md'>SignUp/LogIn</button>
                        </Link>
                    }

                </div>

            </div>

            <div className="md:hidden flex items-center gap-5 text-gray-400">
                <div className="flex gap-3 text-xl">
                    <IoSearch />
                    <IoPerson />
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)}>5
                    {menuOpen ? <IoCloseSharp className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            <div className={`absolute top-16 left-0 w-full bg-gray-800 md:hidden transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col text-center space-y-4 p-4">
                    {MENUDATA.map((item, index) => (
                        <li key={index}>
                            <Link to={item.href} className="block rounded-md text-xl font-semibold px-3 py-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <Link to='/signUp' >
                        <button className='bg-blue-400 px-2 py-1 rounded-md'>SignUp/LogIn</button>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}
