import React from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { RadioReceiver } from 'lucide-react';

const MeshNetwork = () => {
  const meshNodes = useSystemStore((state) => state.meshNodes);

  const getStatusColor = (status) => {
    switch (status) {
      case 'fire': return 'bg-neon-red shadow-glow-red border-neon-red text-white';
      case 'suspicious': return 'bg-neon-yellow shadow-glow-yellow border-neon-yellow text-dark-900';
      case 'normal': 
      default: return 'bg-dark-700/50 border-neon-green/30 text-neon-green shadow-[0_0_5px_rgba(0,255,136,0.1)]';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'fire': return 'bg-white animate-ping';
      case 'suspicious': return 'bg-dark-900';
      case 'normal': 
      default: return 'bg-neon-green';
    }
  }

  // Count active stats
  const fireNodes = meshNodes.filter(n => n.status === 'fire').length;
  const suspiciousNodes = meshNodes.filter(n => n.status === 'suspicious').length;

  return (
    <div className="glass-panel p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
        <h2 className="text-gray-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
          <RadioReceiver size={14} className="text-neon-blue" />
          Mesh Connectivity
        </h2>
        
        <div className="flex gap-2 text-[10px] font-mono">
          <div className="flex items-center gap-1 text-neon-red">
            <span className="w-2 h-2 rounded-full bg-neon-red"></span>
            {fireNodes} FIRE
          </div>
          <div className="flex items-center gap-1 text-neon-yellow">
            <span className="w-2 h-2 rounded-full bg-neon-yellow"></span>
            {suspiciousNodes} SUSP
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-2 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        <div className="grid grid-cols-4 gap-3 w-full max-w-[200px] z-10 relative">
          <AnimatePresence>
            {meshNodes.map((node) => (
              <motion.div
                key={node.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={clsx(
                  "aspect-square rounded flex items-center justify-center border transition-all duration-300 relative group",
                  getStatusColor(node.status)
                )}
              >
                <span className="font-mono text-[10px] font-bold z-10 opacity-60">N{node.id}</span>
                <div className={clsx(
                  "absolute top-1 right-1 w-1.5 h-1.5 rounded-full",
                  getStatusDot(node.status)
                )}></div>
                
                {/* Node Tooltip on Hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-900 border border-dark-600 px-2 py-1 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  Node {node.id}: {node.status.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MeshNetwork;
