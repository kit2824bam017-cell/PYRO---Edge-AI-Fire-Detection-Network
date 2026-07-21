import React from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { Settings2, Trash2, Power } from 'lucide-react';
import { startSimulation, stopSimulation } from '../services/mockData';

const ControlPanel = () => {
  const settings = useSystemStore((state) => state.settings);
  const updateSettings = useSystemStore((state) => state.updateSettings);
  const clearAlerts = useSystemStore((state) => state.clearAlerts);

  // local toggle state for simulation
  const [isSimulating, setIsSimulating] = React.useState(true);

  const toggleSimulation = () => {
    if (isSimulating) {
      stopSimulation();
    } else {
      startSimulation();
    }
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-gray-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2 mb-2">
        <Settings2 size={14} className="text-neon-blue" />
        System Configurations
      </h2>

      {/* Threshold Sliders */}
      <div className="space-y-4 flex-1">
        
        {/* Smoke Threshold */}
        <div>
          <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
            <span>SMOKE THRESHOLD (ppm)</span>
            <span className="text-white bg-dark-700 px-1 rounded">{settings.smokeThreshold}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="200" 
            value={settings.smokeThreshold}
            onChange={(e) => updateSettings({ smokeThreshold: parseInt(e.target.value) })}
            className="w-full accent-neon-red h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* CO Gas Threshold */}
        <div>
          <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
            <span>CO GAS THRESHOLD (ppm)</span>
            <span className="text-white bg-dark-700 px-1 rounded">{settings.coThreshold}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="100" 
            value={settings.coThreshold}
            onChange={(e) => updateSettings({ coThreshold: parseInt(e.target.value) })}
            className="w-full accent-neon-yellow h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-auto">
        <button 
          onClick={clearAlerts}
          className="flex items-center justify-center gap-2 w-full py-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded text-xs font-mono transition-colors text-gray-300"
        >
          <Trash2 size={14} />
          CLEAR EVENT LOGS
        </button>
        
        <button 
          onClick={toggleSimulation}
          className={`flex items-center justify-center gap-2 w-full py-2 border rounded text-xs font-mono transition-colors ${
             isSimulating 
             ? 'bg-neon-red/10 border-neon-red text-neon-red hover:bg-neon-red/20 shadow-glow-red' 
             : 'bg-neon-green/10 border-neon-green text-neon-green hover:bg-neon-green/20'
          }`}
        >
          <Power size={14} />
          {isSimulating ? 'HALT SENSOR FEED' : 'ACTIVATE SENSORS'}
        </button>
      </div>

    </div>
  );
};

export default ControlPanel;
