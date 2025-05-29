import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import MedicalRecordCard from '../components/medical/MedicalRecordCard';
import { Search, Plus, Filter, SlidersHorizontal } from 'lucide-react';

const MedicalHistory: React.FC = () => {
  const { medicalRecords, patients, doctors } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecords = medicalRecords
    .filter(record => {
      const patient = patients.find(p => p.id === record.patientId);
      const doctor = doctors.find(d => d.id === record.doctorId);
      
      if (!patient || !doctor) return false;
      
      return (
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
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
          Medical History
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
              placeholder="Search records..." 
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
            Add Record
          </button>
        </motion.div>
      </div>
      
      {/* Medical Records list */}
      <motion.div variants={item}>
        {filteredRecords.length > 0 ? (
          <div className="space-y-4">
            {filteredRecords.map(record => {
              const patient = patients.find(p => p.id === record.patientId);
              const doctor = doctors.find(d => d.id === record.doctorId);
              
              if (!patient || !doctor) return null;
              
              return (
                <MedicalRecordCard
                  key={record.id}
                  id={record.id}
                  patientName={patient.name}
                  doctorName={doctor.name}
                  date={record.date}
                  diagnosis={record.diagnosis}
                  treatment={record.treatment}
                  notes={record.notes}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No medical records found. Try adjusting your search.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MedicalHistory;