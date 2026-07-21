import React from 'react';
import { motion } from 'framer-motion';
import { Wind, CloudRain, Activity } from 'lucide-react';
import clsx from 'clsx';

const ICONS = {
  Wind: Wind,
  CloudRain: CloudRain,
  Activity: Activity,
};

const SensorCard = ({ title, value, unit, threshold, icon }) => {
  const isDanger = value >= threshold;
  const isWarning = value >= threshold * 0.7 && !isDanger;
  const isSafe = !isDanger && !isWarning;

  const IconComponent = ICONS[icon] || Activity;

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={clsx(
        "glass-panel p-4 flex items-center justify-between border-l-4 transition-colors duration-500",
        isDanger ? "border-l-neon-red" : isWarning ? "border-l-neon-yellow" : "border-l-neon-green"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={clsx(
          "p-2 rounded-lg bg-dark-700/50",
          isDanger ? "text-neon-danger" : isWarning ? "text-neon-warning" : "text-neon-safe"
        )}>
          <IconComponent size={24} />
        </div>
        <div>
          <h3 className="text-gray-400 text-xs font-mono uppercase tracking-wider">{title}</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <motion.span 
              key={value}
              initial={{ opacity: 0.5, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold font-mono text-white tracking-tight"
            >
              {value}
            </motion.span>
            <span className="text-gray-500 text-xs font-mono">{unit}</span>
          </div>
        </div>
      </div>
      
      {/* Indicator */}
      <div className="flex flex-col items-end gap-2">
        <div className="text-[10px] font-mono text-gray-500">THR: {threshold}</div>
        <div className={clsx(
          "w-3 h-3 rounded-full shadow-lg",
          isDanger ? "bg-neon-danger animate-pulse" : isWarning ? "bg-neon-warning" : "bg-neon-safe"
        )} />
      </div>
    </motion.div>
  );
};

export default SensorCard;
