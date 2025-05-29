import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockDoctors, mockPatients, mockAppointments, mockMedicalRecords } from '../data/mockData';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  patientsCount: number;
  appointmentsToday: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
  phone: string;
  lastVisit: Date | null;
  nextAppointment: Date | null;
}

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled';
  type: string;
}

interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface AppContextType {
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  stats: {
    totalDoctors: number;
    totalPatients: number;
    totalAppointments: number;
    appointmentsToday: number;
  };
  getDoctorById: (id: string) => Doctor | undefined;
  getPatientById: (id: string) => Patient | undefined;
  getPatientAppointments: (patientId: string) => Appointment[];
  getPatientMedicalRecords: (patientId: string) => MedicalRecord[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [patients] = useState<Patient[]>(mockPatients);
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [medicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords);

  // Calculate stats
  const stats = {
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    totalAppointments: appointments.length,
    appointmentsToday: appointments.filter(
      (apt) => apt.date.toDateString() === new Date().toDateString()
    ).length,
  };

  // Helper functions
  const getDoctorById = (id: string) => doctors.find((doctor) => doctor.id === id);
  
  const getPatientById = (id: string) => patients.find((patient) => patient.id === id);
  
  const getPatientAppointments = (patientId: string) => 
    appointments.filter((apt) => apt.patientId === patientId);
  
  const getPatientMedicalRecords = (patientId: string) => 
    medicalRecords.filter((record) => record.patientId === patientId);

  return (
    <AppContext.Provider 
      value={{ 
        doctors, 
        patients, 
        appointments, 
        medicalRecords, 
        stats,
        getDoctorById,
        getPatientById,
        getPatientAppointments,
        getPatientMedicalRecords
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};