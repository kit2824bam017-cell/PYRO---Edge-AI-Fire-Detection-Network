import React from 'react';
import { useSystemStore } from '../store/useSystemStore';
import SensorCard from './SensorCard';
import MeshNetwork from './MeshNetwork';
import FireDetection from './FireDetection';
import AlertsPanel from './AlertsPanel';
import Analytics from './Analytics';
import ControlPanel from './ControlPanel';

const Dashboard = () => {
  const sensors = useSystemStore((state) => state.sensors);
  const settings = useSystemStore((state) => state.settings);
  const camera = useSystemStore((state) => state.camera);

  // Global Danger Status Calculation
  const isGlobalDanger = sensors.smoke > settings.smokeThreshold || camera.fireProbability > 80;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Grid: Sensors and Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[45%]">
        {/* Left Col: Sensors */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <SensorCard 
            title="Smoke Level" 
            value={sensors.smoke} 
            unit="ppm" 
            threshold={settings.smokeThreshold} 
            icon="Wind"
          />
          <SensorCard 
            title="CO Gas" 
            value={sensors.co} 
            unit="ppm" 
            threshold={settings.coThreshold}
            icon="CloudRain"
          />
          <SensorCard 
            title="Air Quality (AQI)" 
            value={sensors.aqi} 
            unit="index" 
            threshold={settings.aqiThreshold}
            icon="Activity"
          />
        </div>

        {/* Center: Vision AI */}
        <div className="lg:col-span-2">
          <FireDetection isGlobalDanger={isGlobalDanger} />
        </div>

        {/* Right: Mesh Network */}
        <div className="lg:col-span-1">
          <MeshNetwork />
        </div>
      </div>

      {/* Bottom Grid: Analytics and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 min-h-[300px]">
        {/* Left: Analytics History */}
        <div className="lg:col-span-2 glass-panel p-4 flex flex-col">
          <h2 className="text-gray-400 font-mono text-xs mb-4 uppercase tracking-wider">Telemetric History</h2>
          <Analytics />
        </div>

        {/* Center: Alerts Log */}
        <div className="lg:col-span-1 glass-panel flex flex-col overflow-hidden">
          <AlertsPanel />
        </div>

        {/* Right: Control Panel */}
        <div className="lg:col-span-1 glass-panel p-4 overflow-y-auto">
          <ControlPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
