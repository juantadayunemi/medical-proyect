import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import MedicalHistory from './pages/MedicalHistory';
import Appointments from './pages/Appointments';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="medical-history" element={<MedicalHistory />} />
            <Route path="appointments" element={<Appointments />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;