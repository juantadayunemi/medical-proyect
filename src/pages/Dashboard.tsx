import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/ui/StatCard';
import AppointmentCard from '../components/ui/AppointmentCard';
import { 
  UserRound, 
  Users, 
  Calendar, 
  Activity,
  PieChart,
  BarChart,
  LineChart,
  TrendingUp,
  FileText,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartPieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard: React.FC = () => {
  const { stats, appointments, doctors, patients } = useAppContext();
  
  // Get upcoming appointments
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date() && apt.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  // Mock data for charts
  const appointmentData = [
    { name: 'Mon', appointments: 12 },
    { name: 'Tue', appointments: 19 },
    { name: 'Wed', appointments: 15 },
    { name: 'Thu', appointments: 22 },
    { name: 'Fri', appointments: 25 },
    { name: 'Sat', appointments: 14 },
    { name: 'Sun', appointments: 10 },
  ];
  
  const pieData = [
    { name: 'Check-ups', value: 35 },
    { name: 'Consultations', value: 25 },
    { name: 'Treatments', value: 20 },
    { name: 'Follow-ups', value: 15 },
    { name: 'Emergencies', value: 5 },
  ];
  
  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
  
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
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-2xl font-bold text-white"
          variants={item}
        >
          Dashboard
        </motion.h1>
        <motion.div variants={item}>
          <button className="btn-primary">
            Generate Report
          </button>
        </motion.div>
      </div>
      
      {/* Stats row */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={item}
      >
        <StatCard 
          title="Total Patients" 
          value={stats.totalPatients} 
          icon={<UserRound size={24} />} 
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
        <StatCard 
          title="Total Doctors" 
          value={stats.totalDoctors} 
          icon={<Users size={24} />} 
          trend={{ value: 5, isPositive: true }}
          color="secondary"
        />
        <StatCard 
          title="Total Appointments" 
          value={stats.totalAppointments} 
          icon={<Calendar size={24} />} 
          trend={{ value: 8, isPositive: true }}
          color="accent"
        />
        <StatCard 
          title="Today's Appointments" 
          value={stats.appointmentsToday} 
          icon={<Activity size={24} />} 
          color="success"
        />
      </motion.div>
      
      {/* Charts row */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={item}
      >
        {/* Appointments trend chart */}
        <div className="lg:col-span-2 dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Appointment Analytics</h2>
            <div className="flex items-center text-blue-400 text-sm">
              <TrendingUp size={16} className="mr-1" />
              <span>+8% this week</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={appointmentData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                <YAxis tick={{ fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    borderColor: '#374151',
                    color: '#f9fafb'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorAppointments)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Appointment types distribution */}
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold text-white mb-4">Appointment Types</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    borderColor: '#374151',
                    color: '#f9fafb'
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                  wrapperStyle={{ color: '#d1d5db' }}
                />
              </RechartPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
      
      {/* Recent data rows */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={item}
      >
        {/* Upcoming appointments */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Upcoming Appointments</h2>
            <button className="text-blue-400 text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => {
              const patient = patients.find(p => p.id === apt.patientId);
              const doctor = doctors.find(d => d.id === apt.doctorId);
              
              if (!patient || !doctor) return null;
              
              return (
                <AppointmentCard
                  key={apt.id}
                  patient={patient.name}
                  doctor={doctor.name}
                  date={apt.date}
                  time={apt.time}
                  duration={apt.duration}
                  status={apt.status}
                  type={apt.type}
                />
              );
            })}
            {upcomingAppointments.length === 0 && (
              <p className="text-gray-400 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </div>
        
        {/* Recent activity */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <button className="text-blue-400 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                <Calendar size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white">New appointment scheduled</p>
                <p className="text-sm text-gray-400">Dr. Sarah Johnson with Maria Garcia</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <UserRound size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-white">New patient registered</p>
                <p className="text-sm text-gray-400">Robert Williams</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <FileText size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white">Medical record updated</p>
                <p className="text-sm text-gray-400">For James Wilson by Dr. John Smith</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                <AlertCircle size={20} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-white">Appointment rescheduled</p>
                <p className="text-sm text-gray-400">Jennifer Lopez with Dr. Emily Chen</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;