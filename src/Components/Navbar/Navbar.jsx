import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Search from './Search';
import DropDownMenu from './DropDownMenu';
import { useAuth } from '../context/AuthConetxt'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn } = useAuth()

    const MENUDATA = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/service' },
        { name: 'Featured', href: '/featured' },
        { name: 'Contact Me', href: '/contact' },
    ];

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="flex fixed w-full justify-between items-center h-16 bg-white shadow-md px-6 md:px-20 font-sans z-50">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-blue-600">
                <Link to='/'>Logo</Link>
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                <ul className="flex gap-6 text-gray-700 font-medium">
                    {MENUDATA.map((item, index) => (
                        <li key={index}>
                            <Link to={item.href} className="hover:text-blue-500 transition duration-200 cursor-pointer select-none">{item.name}</Link>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-4 items-center text-gray-600">
                    <Search />
                    {isLoggedIn ? (
                        <DropDownMenu />
                    ) : (
                        <Link to='/signUp'>
                            <button className='bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition'>SignUp/LogIn</button>
                        </Link>
                    )}
                </div>
            </div>


            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 text-gray-600">
                <div className='flex items-center mr-10 z-50'>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <IoCloseSharp className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                    <div className='select-none'>
                        {isLoggedIn && <DropDownMenu />}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-40">
                    <ul className="flex flex-col text-center py-4 space-y-4 text-gray-700 font-medium">
                        {MENUDATA.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    onClick={handleLinkClick}
                                    className="block text-lg hover:text-blue-500 transition"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <Link to='/signUp' onClick={handleLinkClick}>
                            <button className='bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition'>SignUp/LogIn</button>
                        </Link>
                    </ul>
                </div>
            )}
        </nav>
    );
}
