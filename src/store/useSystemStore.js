import { create } from 'zustand';

export const useSystemStore = create((set) => ({
  sensors: {
    smoke: 12,
    co: 5,
    aqi: 45,
  },
  meshNodes: Array.from({ length: 16 }, (_, i) => ({
    id: i,
    status: 'normal', // normal, suspicious, fire
  })),
  camera: {
    fireProbability: 0,
    motionDetected: false,
  },
  alerts: [],
  settings: {
    smokeThreshold: 50,
    coThreshold: 20,
    aqiThreshold: 100,
  },
  sensorHistory: [], // For Recharts analytics
  setSensors: (sensors) => set({ sensors }),
  updateMeshNode: (id, status) =>
    set((state) => ({
      meshNodes: state.meshNodes.map((node) =>
        node.id === id ? { ...node, status } : node
      ),
    })),
  setCamera: (camera) => set({ camera }),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [{ ...alert, id: Date.now(), timestamp: new Date().toLocaleTimeString() }, ...state.alerts].slice(0, 50),
    })),
  clearAlerts: () => set({ alerts: [] }),
  updateSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
  addHistoryPoint: (point) => 
    set((state) => ({
        sensorHistory: [...state.sensorHistory, point].slice(-30), // Keep last 30 points
    })),
}));
