import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoCloseSharp, IoSearch, IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [log, setLog] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const MENUDATA = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/service' },
        { name: 'Featured', href: '/featured' },
        { name: 'Contact Me', href: '/contact' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <nav className="flex fixed w-full justify-between items-center h-16 bg-white shadow-md px-6 md:px-20 font-sans">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-blue-600">
                <Link to='/'>Logo</Link>
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
                <ul className="flex gap-6 text-gray-700 font-medium">
                    {MENUDATA.map((item, index) => (
                        <li key={index}>
                            <Link to={item.href} className="hover:text-blue-500 transition duration-200">{item.name}</Link>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-4 items-center text-gray-600">
                    <form onSubmit={handleSearch} className="relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                            <IoSearch />
                        </button>
                    </form>
                    {log ? (
                        <IoPerson className='cursor-pointer hover:text-gray-800 transition' />
                    ) : (
                        <Link to='/signUp'>
                            <button className='bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition'>SignUp/LogIn</button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 text-gray-600">
                <form onSubmit={handleSearch} className="relative">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                        <IoSearch />
                    </button>
                </form>
                <IoPerson className='cursor-pointer' />
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <IoCloseSharp className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden transition-transform duration-300 ease-in-out ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}>
                <ul className="flex flex-col text-center py-4 space-y-4 text-gray-700 font-medium">
                    {MENUDATA.map((item, index) => (
                        <li key={index}>
                            <Link to={item.href} className="block text-lg hover:text-blue-500 transition">{item.name}</Link>
                        </li>
                    ))}
                    <Link to='/signUp'>
                        <button className='bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition'>SignUp/LogIn</button>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}