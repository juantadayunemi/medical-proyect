import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon
} from 'lucide-react';
import { format, startOfWeek, addDays, isToday, isSameDay } from 'date-fns';

const AppointmentItem = ({ appointment, patient, doctor }) => {
  const getStatusColor = () => {
    switch (appointment.status) {
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
      className="glass-card p-3 mb-2 border-l-4 border-primary cursor-move"
      whileHover={{ x: 5 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white">{patient.name}</h3>
          <p className="text-xs text-gray-400">with Dr. {doctor.name}</p>
        </div>
        <div className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor()}`}>
          {appointment.time}
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-400">
        {appointment.type} • {appointment.duration} min
      </div>
    </motion.div>
  );
};

const TimeSlot = ({ time, appointments, date, patients, doctors }) => {
  const filteredAppointments = appointments.filter(apt => 
    apt.time === time && isSameDay(new Date(apt.date), date)
  );

  return (
    <div className="min-h-[100px] border-b border-gray-800 p-2">
      {filteredAppointments.map(appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        const doctor = doctors.find(d => d.id === appointment.doctorId);
        
        if (!patient || !doctor) return null;
        
        return (
          <AppointmentItem 
            key={appointment.id}
            appointment={appointment}
            patient={patient}
            doctor={doctor}
          />
        );
      })}
    </div>
  );
};

const Appointments: React.FC = () => {
  const { appointments, patients, doctors } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Create weekly calendar view
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  
  // Define time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];
  
  const handlePrevWeek = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };
  
  const handleNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7));
  };
  
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
    <DndProvider backend={HTML5Backend}>
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
            Appointments
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
                placeholder="Search appointments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="btn-primary flex items-center justify-center">
              <Plus size={16} className="mr-2" />
              New Appointment
            </button>
          </motion.div>
        </div>
        
        {/* Calendar navigation */}
        <motion.div 
          className="flex items-center justify-between"
          variants={item}
        >
          <button 
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800"
            onClick={handlePrevWeek}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center">
            <CalendarIcon size={20} className="text-primary mr-2" />
            <span className="text-white font-medium">
              {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
            </span>
          </div>
          
          <button 
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800"
            onClick={handleNextWeek}
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
        
        {/* Calendar grid */}
        <motion.div 
          className="glass-card overflow-hidden"
          variants={item}
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-800">
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className={`p-3 text-center ${isToday(day) ? 'bg-primary/20' : ''}`}
              >
                <p className="text-xs text-gray-400">{format(day, 'EEE')}</p>
                <p className={`text-lg ${isToday(day) ? 'text-primary font-bold' : 'text-white'}`}>
                  {format(day, 'd')}
                </p>
              </div>
            ))}
          </div>
          
          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={timeIndex} className="grid grid-cols-7 border-b border-gray-800">
              {/* Time label */}
              <div className="col-span-7 bg-gray-900/50 py-1 px-3 sticky top-0 z-10">
                <p className="text-xs text-gray-400">{time}</p>
              </div>
              
              {/* Appointment slots for each day */}
              {weekDays.map((day, dayIndex) => (
                <TimeSlot 
                  key={dayIndex}
                  time={time}
                  date={day}
                  appointments={appointments}
                  patients={patients}
                  doctors={doctors}
                />
              ))}
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center text-sm text-gray-400 mt-4"
          variants={item}
        >
          <p>Drag and drop appointments to reschedule them (functionality coming soon)</p>
        </motion.div>
      </motion.div>
    </DndProvider>
  );
};

export default Appointments;