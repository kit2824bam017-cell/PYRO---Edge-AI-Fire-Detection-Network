import { useSystemStore } from '../store/useSystemStore';

let intervalId = null;
const SIMULATION_INTERVAL = 2000; // 2 seconds update

export const startSimulation = () => {
  if (intervalId) clearInterval(intervalId);
  
  intervalId = setInterval(() => {
    const { settings, addAlert, addHistoryPoint } = useSystemStore.getState();
    
    // Simulate base conditions
    const baseSmoke = Math.floor(Math.random() * 20) + 5;
    const baseCo = Math.floor(Math.random() * 10) + 2;
    const baseAqi = Math.floor(Math.random() * 30) + 30;

    // Simulate occasional spikes (fire conditions)
    const isSpike = Math.random() > 0.90; // 10% chance of an event
    const isMajorFire = isSpike && Math.random() > 0.5;
    
    let currentSmoke = baseSmoke;
    let currentCo = baseCo;
    let currentAqi = baseAqi;

    if (isSpike) {
      currentSmoke += Math.floor(Math.random() * 40) + 20;
      currentCo += Math.floor(Math.random() * 20) + 10;
      currentAqi += Math.floor(Math.random() * 50) + 30;
      
      if (isMajorFire) {
          currentSmoke += 60;
          currentCo += 40;
          currentAqi += 100;
      }
      
      if (currentSmoke > settings.smokeThreshold) {
        addAlert({ type: 'critical', message: `CRITICAL ALERT: Smoke levels (${currentSmoke}ppm) exceeded threshold!` });
      } else if (currentSmoke > settings.smokeThreshold * 0.7) {
        addAlert({ type: 'warning', message: 'Warning: Unusually high smoke levels detected.' });
      }

      if (currentCo > settings.coThreshold) {
        addAlert({ type: 'critical', message: `CRITICAL ALERT: High CO Gas (${currentCo}ppm) detected!` });
      }
    }
    
    // Update Sensors
    useSystemStore.setState({
      sensors: {
        smoke: currentSmoke,
        co: currentCo,
        aqi: currentAqi,
      }
    });

    const now = new Date();
    addHistoryPoint({
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second:'2-digit' }),
        smoke: currentSmoke,
        co: currentCo,
        aqi: currentAqi
    });

    // Mesh Nodes simulation
    useSystemStore.setState((state) => {
      const newNodes = state.meshNodes.map((node) => {
        if (isMajorFire) {
            // Clustered fire detection on mesh
            if (node.id % 4 === 1 || Math.random() > 0.7) return { ...node, status: 'fire' };
            if (Math.random() > 0.5) return { ...node, status: 'suspicious' };
        } else if (isSpike) {
            if (Math.random() > 0.8) return { ...node, status: 'suspicious' };
        }
        
        // Ambient noise occasionally triggers suspicious
        if (Math.random() > 0.95) return { ...node, status: 'suspicious' };
        
        return { ...node, status: 'normal' };
      });
      return { meshNodes: newNodes };
    });

    // Camera/Vision simulation
    useSystemStore.setState({
      camera: {
        fireProbability: isMajorFire ? Math.floor(Math.random() * 20) + 80 : 
                          isSpike ? Math.floor(Math.random() * 40) + 20 :
                          Math.floor(Math.random() * 10),
        motionDetected: Math.random() > 0.6,
      }
    });

  }, SIMULATION_INTERVAL);
};

export const stopSimulation = () => {
  if (intervalId) clearInterval(intervalId);
};
