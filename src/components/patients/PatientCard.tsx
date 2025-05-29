import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

interface PatientCardProps {
  id: string;
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
  phone: string;
  lastVisit: Date | null;
  nextAppointment: Date | null;
}

const PatientCard: React.FC<PatientCardProps> = ({
  id,
  name,
  age,
  gender,
  imageUrl,
  phone,
  lastVisit,
  nextAppointment
}) => {
  return (
    <motion.div 
      className="glass-card overflow-hidden"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.pexels.com/photos/5273717/pexels-photo-5273717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm text-gray-400">{age} years • {gender}</p>
          </div>
          <button className="p-1 text-gray-400 hover:text-white">
            <MoreVertical size={18} />
          </button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-400">
            <Phone size={16} className="mr-2" />
            <span className="text-sm">{phone}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <Clock size={16} className="mr-2" />
            <span className="text-sm">
              {lastVisit 
                ? `Last visit: ${format(lastVisit, 'MMM dd, yyyy')}` 
                : 'No previous visits'}
            </span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">
              {nextAppointment 
                ? `Next appointment: ${format(nextAppointment, 'MMM dd, yyyy')}` 
                : 'No upcoming appointments'}
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="btn-primary flex-1 py-1.5 text-sm">View Records</button>
          <button className="btn-secondary flex-1 py-1.5 text-sm">Schedule</button>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientCard;