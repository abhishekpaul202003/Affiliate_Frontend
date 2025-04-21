import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxDashboard } from "react-icons/rx";
import { LuUsersRound } from "react-icons/lu";
import { FiImage } from "react-icons/fi";
import { MdLiveTv } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { SiMaxplanckgesellschaft } from "react-icons/si";
import { FiLogOut } from "react-icons/fi"; 
import { useAuth } from '../context/AuthConetxt'; // Fixed typo in import path
import { useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard';
import User from './User';
import Wallpapers from './Wallpapers';
import LiveVideos from './LiveVideos';
import Downloads from './Downloads';
import Revenue from './Revenue';

const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [activeMobileComponent, setActiveMobileComponent] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const AdminhandleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const menuItems = [
    { icon: <RxDashboard />, label: 'Dashboard', component: 'Dashboard' },
    { icon: <LuUsersRound />, label: 'Users', component: 'User' },
    { icon: <FiImage />, label: 'Wallpapers', component: 'Wallpapers' },
    { icon: <MdLiveTv />, label: 'Live Videos', component: 'LiveVideos' },
    { icon: <IoBagCheckOutline />, label: 'Downloads', component: 'Downloads' },
    { icon: <SiMaxplanckgesellschaft />, label: 'Revenue', component: 'Revenue' },
  ];

  const renderComponent = (component) => {
    switch (component) {
      case 'Dashboard': return <Dashboard />;
      case 'User': return <User />;
      case 'Wallpapers': return <Wallpapers />;
      case 'LiveVideos': return <LiveVideos />;
      case 'Downloads': return <Downloads />;
      case 'Revenue': return <Revenue />;
      default: return <Dashboard />;
    }
  };

  const sidebarVariants = {
    open: { width: '18%', opacity: 1 },
    closed: { width: '0%', opacity: 0 }
  };

  const contentVariants = {
    open: { marginLeft: '18%' },
    closed: { marginLeft: '0%' }
  };

  const navItemVariants = {
    hover: { scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' },
    tap: { scale: 0.98 }
  };

  const mobileNavItemVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop View */}
      <div className='hidden md:block'>
        <div className='flex pt-18'>
          {/* Sidebar */}
          <motion.div
            className='bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen px-4 py-2 shadow-xl flex flex-col'
            initial="open"
            animate={isSidebarOpen ? "open" : "closed"}
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h1 
                className='text-3xl font-bold py-2 text-white'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isSidebarOpen ? 'MediaHub Admin' : ''}
              </motion.h1>
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white p-2 rounded-full hover:bg-blue-700"
                style={{ pointerEvents: 'auto' }}
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>
            
            <ul className='mt-4 flex-grow'>
              {menuItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  className='mb-2'
                  whileHover="hover"
                  whileTap="tap"
                  variants={navItemVariants}
                >
                  <button
                    className={`w-full flex items-center gap-3 text-[15px] capitalize justify-start py-3 px-4 rounded-lg transition-all
                    ${activeComponent === item.component ? 
                      'bg-blue-600 text-white shadow-md' : 
                      'text-blue-100 hover:text-white'}`}
                    onClick={() => setActiveComponent(item.component)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isSidebarOpen && <span>{item.label}</span>}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Logout Button */}
            <motion.div 
              className="mb-4"
              whileHover="hover"
              whileTap="tap"
              variants={navItemVariants}
            >
              <button
                className={`w-full flex items-center gap-3 text-[15px] capitalize justify-start py-3 px-4 rounded-lg transition-all
                text-blue-100 hover:text-white hover:bg-blue-700`}
                onClick={AdminhandleLogout}  // Fixed function name here
              >
                <span className="text-xl"><FiLogOut /></span>
                {isSidebarOpen && <span>Log Out</span>}
              </button>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className='flex-1 p-8'
            initial="open"
            animate={isSidebarOpen ? "open" : "closed"}
            variants={contentVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeComponent}
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={pageTransition.transition}
              >
                {renderComponent(activeComponent)}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className='md:hidden'>
        {/* Mobile Content */}
        <div className='p-4 bg-gray-50 min-h-screen pb-24'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeMobileComponent}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              {renderComponent(activeMobileComponent)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <motion.div 
          className="fixed bottom-0 left-0 right-0 w-full flex justify-between bg-white pt-3 pb-3 border-t border-gray-200 shadow-lg z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {menuItems.map(({ icon, label, component }, key) => (
            <motion.button
              key={key}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all
              ${activeMobileComponent === component ? 
                'text-blue-600' : 
                'text-gray-500 hover:text-blue-500'}`}
              onClick={() => setActiveMobileComponent(component)}
              whileHover="hover"
              whileTap="tap"
              variants={mobileNavItemVariants}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;