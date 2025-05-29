import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import PatientCard from '../components/patients/PatientCard';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';

const Patients: React.FC = () => {
  const { patients } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.h1 
          className="text-2xl font-bold text-white"
          variants={item}
        >
          Patients
        </motion.h1>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-3"
          variants={item}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="bg-gray-800 border-gray-700 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="btn-secondary flex items-center justify-center">
            <SlidersHorizontal size={16} className="mr-2" />
            Filter
          </button>
          
          <button className="btn-primary flex items-center justify-center">
            <Plus size={16} className="mr-2" />
            Add Patient
          </button>
        </motion.div>
      </div>
      
      {/* Patients grid */}
      {filteredPatients.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={item}
        >
          {filteredPatients.map(patient => (
            <PatientCard
              key={patient.id}
              id={patient.id}
              name={patient.name}
              age={patient.age}
              gender={patient.gender}
              imageUrl={patient.imageUrl}
              phone={patient.phone}
              lastVisit={patient.lastVisit}
              nextAppointment={patient.nextAppointment}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-12"
          variants={item}
        >
          <p className="text-gray-400">No patients found. Try adjusting your search.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Patients;