import React from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { motion } from 'framer-motion';
import { Camera, Crosshair, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const FireDetection = ({ isGlobalDanger }) => {
  const camera = useSystemStore((state) => state.camera);
  const timeStr = new Date().toISOString().split('T')[1].split('.')[0];
  
  const isFireDetected = camera.fireProbability > 60;
  
  return (
    <div className="glass-panel p-4 h-full flex flex-col relative group">
      {/* Header Overlay */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
          <Camera size={14} className="text-neon-blue" />
          Vision AI Feed
        </h2>
        <div className="flex gap-3 text-[10px] font-mono">
          <span className="text-white bg-dark-700 px-2 py-0.5 rounded border border-dark-600">ID: CAM-04</span>
          <span className="text-white bg-dark-700 px-2 py-0.5 rounded border border-dark-600">LIVE // {timeStr}</span>
        </div>
      </div>

      {/* Camera Feed Simulator Area */}
      <div className={clsx(
        "flex-1 bg-dark-900 rounded-lg border relative overflow-hidden transition-colors duration-500 min-h-[250px]",
        isFireDetected ? "border-neon-red/50" : "border-dark-700"
      )}>
        {/* Placeholder Grid / "Camera Noise" */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent pointer-events-none"></div>
        
        {/* Scanning Line Animation */}
        <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-neon-blue/30 shadow-[0_0_8px_rgba(51,204,255,0.5)] z-10"
        />

        {/* Center Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <Crosshair size={64} className="text-white" strokeWidth={1} />
        </div>

        {/* Simulated Fire Bounding Box */}
        {isFireDetected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-neon-red bg-neon-red/10 rounded-sm z-20 flex items-start justify-start p-1"
          >
            <div className="bg-neon-red text-white text-[10px] font-mono font-bold px-1 py-0.5 uppercase flex items-center gap-1 shadow-glow-red">
               <AlertTriangle size={10} />
               FIRE DETECTED {camera.fireProbability}%
            </div>
            
            {/* Corner Bracket Decorators */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white translate-x-1 translate-y-1"></div>
          </motion.div>
        )}

         {/* General Detection Status Box */}
         <div className="absolute bottom-4 left-4 bg-dark-900/80 backdrop-blur border border-dark-600 p-2 text-xs font-mono rounded z-30">
            <div className="flex justify-between gap-4 mb-1">
                <span className="text-gray-400">Movement:</span>
                <span className={camera.motionDetected ? "text-neon-yellow font-bold" : "text-gray-500"}>
                    {camera.motionDetected ? "DETECTED" : "NONE"}
                </span>
            </div>
            <div className="flex justify-between gap-4">
                <span className="text-gray-400">Confidence:</span>
                <span className={isFireDetected ? "text-neon-red font-bold" : "text-neon-safe"}>
                    {camera.fireProbability}%
                </span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FireDetection;
