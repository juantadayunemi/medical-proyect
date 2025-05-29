import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color 
}) => {
  const getGradient = () => {
    switch (color) {
      case 'primary':
        return 'from-primary/20 to-primary/5';
      case 'secondary':
        return 'from-secondary/20 to-secondary/5';
      case 'accent':
        return 'from-accent/20 to-accent/5';
      case 'success':
        return 'from-success/20 to-success/5';
      case 'warning':
        return 'from-warning/20 to-warning/5';
      default:
        return 'from-primary/20 to-primary/5';
    }
  };

  const getIconBackground = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary/20 text-primary';
      case 'secondary':
        return 'bg-secondary/20 text-secondary';
      case 'accent':
        return 'bg-accent/20 text-accent';
      case 'success':
        return 'bg-success/20 text-success';
      case 'warning':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <motion.div 
      className={`dashboard-card bg-gradient-to-br ${getGradient()}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-white">{value}</p>
            {trend && (
              <span className={`ml-2 text-xs font-medium ${trend.isPositive ? 'text-success' : 'text-error'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-lg ${getIconBackground()}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;