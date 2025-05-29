import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  FileText, 
  Calendar, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Search 
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Doctors', path: '/doctors', icon: <Users size={20} /> },
    { name: 'Patients', path: '/patients', icon: <UserRound size={20} /> },
    { name: 'Medical History', path: '/medical-history', icon: <FileText size={20} /> },
    { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.aside 
        className={`fixed left-0 top-0 bottom-0 z-40 w-64 bg-gray-900 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 ${sidebarOpen ? 'lg:w-64' : 'lg:w-20'}`}
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <div className={`flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center w-full'}`}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              {sidebarOpen && (
                <motion.h1 
                  className="ml-3 text-xl font-semibold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  MediCenter
                </motion.h1>
              )}
            </div>
            <button 
              className="text-gray-400 hover:text-white lg:block hidden"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
            </button>
            <button 
              className="text-gray-400 hover:text-white lg:hidden block"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                >
                  {item.icon}
                  {sidebarOpen && <span>{item.name}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <button className={`nav-item ${!sidebarOpen ? 'justify-center px-2' : ''}`}>
              <Settings size={20} />
              {sidebarOpen && <span>Settings</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button 
                className="text-gray-400 hover:text-white lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={22} />
              </button>
              
              <div className="relative ml-4 w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="bg-gray-800 border-gray-700 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Search..." 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-1 text-gray-400 hover:text-white">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-error"></span>
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                <Moon size={20} />
              </button>
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div className="ml-3 hidden md:block">
                  <p className="text-sm font-medium text-white">Dr. Jane Doe</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-gray-900">
          <div className="container mx-auto py-6 px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;