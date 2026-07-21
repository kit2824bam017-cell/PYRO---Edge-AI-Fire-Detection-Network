import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { startSimulation, stopSimulation } from './services/mockData';

function App() {
  useEffect(() => {
    // Start simulating the edge sensors on mount
    startSimulation();
    return () => {
      stopSimulation();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-dark-900 text-gray-100 flex flex-col selection:bg-neon-blue selection:text-dark-900">
      {/* Header */}
      <header className="h-16 border-b border-dark-700 bg-dark-800/90 backdrop-blur flex items-center justify-between px-6 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-neon-red shadow-glow-red flex items-center justify-center font-bold text-dark-900">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white">PYRO SYSTEM</h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Smart Edge Detection Mesh</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green shadow-glow-green animate-pulse"></span>
            <span className="text-neon-green">SYSTEM ACTIVE</span>
          </div>
          <div className="px-3 py-1 bg-dark-700 border border-dark-600 rounded text-gray-400">
            NODE RUNTIME: <span className="text-white">{(new Date()).toISOString().split('T')[0]}</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
