import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface AppointmentCardProps {
  patient: string;
  doctor: string;
  date: Date;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled';
  type: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  patient,
  doctor,
  date,
  time,
  duration,
  status,
  type
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'canceled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <motion.div 
      className="glass-card p-4 border-l-4 border-primary mb-3"
      whileHover={{ x: 5 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white">{patient}</h3>
          <p className="text-sm text-gray-400">with Dr. {doctor}</p>
        </div>
        <div className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar size={14} className="mr-1" />
          <span>{format(date, 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{time} ({duration} min)</span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <User size={14} className="mr-1" />
          <span>{type}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentCard;