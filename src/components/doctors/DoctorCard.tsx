import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, MoreVertical } from 'lucide-react';

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  patientsCount: number;
  appointmentsToday: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  specialty,
  imageUrl,
  rating,
  patientsCount,
  appointmentsToday
}) => {
  return (
    <motion.div 
      className="glass-card overflow-hidden"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-24 bg-gradient-to-r from-primary to-accent">
        <div className="absolute -bottom-10 left-4 w-20 h-20 rounded-full border-4 border-background overflow-hidden bg-gray-200">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            }}
          />
        </div>
        <button className="absolute top-2 right-2 p-1 text-white/80 hover:text-white">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <div className="pt-12 p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm text-gray-400">{specialty}</p>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="flex items-center justify-center text-yellow-400">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-white">{rating}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Rating</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-blue-400">
              <Users size={16} />
              <span className="ml-1 text-sm font-medium text-white">{patientsCount}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Patients</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-green-400">
              <Calendar size={16} />
              <span className="ml-1 text-sm font-medium text-white">{appointmentsToday}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Today</p>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="btn-primary flex-1 py-1.5 text-sm">Profile</button>
          <button className="btn-secondary flex-1 py-1.5 text-sm">Schedule</button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;