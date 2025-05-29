import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

interface MedicalRecordCardProps {
  id: string;
  patientName: string;
  doctorName: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  notes: string;
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({
  id,
  patientName,
  doctorName,
  date,
  diagnosis,
  treatment,
  notes
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="glass-card mb-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-accent/20 text-accent mr-3">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-medium text-white">{patientName}</h3>
              <p className="text-sm text-gray-400">
                <span className="mr-2">{format(date, 'MMM dd, yyyy')}</span>
                <span className="text-gray-500">•</span>
                <span className="ml-2">Dr. {doctorName}</span>
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="mt-4 pt-4 border-t border-gray-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Diagnosis</h4>
                  <p className="text-white">{diagnosis}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Treatment</h4>
                  <p className="text-white">{treatment}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-1">Notes</h4>
                <p className="text-white">{notes}</p>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button className="btn-primary py-1.5 text-sm">Edit Record</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all">
                  Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MedicalRecordCard;