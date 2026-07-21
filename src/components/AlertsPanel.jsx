import React from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Terminal } from 'lucide-react';
import clsx from 'clsx';

const AlertsPanel = () => {
  const alerts = useSystemStore((state) => state.alerts);

  return (
    <div className="flex flex-col h-full bg-dark-800/50">
      <div className="p-3 border-b border-dark-600 bg-dark-900/50 flex justify-between items-center z-10 sticky top-0 backdrop-blur-sm">
        <h2 className="text-gray-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
          <Terminal size={14} className="text-neon-blue" />
          Event Diagnostics Logs
        </h2>
        <div className="px-2 py-0.5 rounded bg-dark-700 text-[10px] font-mono border border-dark-600">
           {alerts.length} Records
        </div>
      </div>

      {/* Auto-scrolling List Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-gray-600 font-mono text-xs italic"
            >
              System operating within normal parameters.
            </motion.div>
          ) : (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={clsx(
                  "p-2 rounded border text-xs font-mono flex items-start gap-2 shadow-sm",
                  alert.type === 'critical' 
                    ? "bg-neon-red/10 border-neon-red text-neon-red" 
                    : "bg-neon-yellow/10 border-neon-yellow text-neon-yellow"
                )}
              >
                <div className="mt-0.5">
                  <AlertCircle size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                     <span className="font-bold tracking-wider">
                         {alert.type === 'critical' ? '[CRITICAL]' : '[WARNING]'}
                     </span>
                     <span className={clsx("opacity-70 text-[10px]", 
                        alert.type==='critical' ? "text-neon-red" : "text-neon-yellow"
                     )}>{alert.timestamp}</span>
                  </div>
                  <div className="text-gray-300">
                    {alert.message}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AlertsPanel;
