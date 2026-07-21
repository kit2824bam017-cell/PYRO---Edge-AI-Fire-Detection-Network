import React from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const history = useSystemStore((state) => state.sensorHistory);

  // If we don't have enough history, return a placeholder or empty chart visually pleasing
  const data = history.length > 0 ? history : [
    { time: '00:00', smoke: 0, co: 0, aqi: 0 },
    { time: '00:01', smoke: 10, co: 5, aqi: 20 },
  ];

  return (
    <div className="flex-1 min-h-[200px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSmoke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff3333" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff3333" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff88" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
             dataKey="time" 
             stroke="#666" 
             fontSize={10} 
             tickMargin={10}
             fontFamily="monospace"
          />
          <YAxis 
             stroke="#666" 
             fontSize={10} 
             fontFamily="monospace" 
             axisLine={false} 
             tickLine={false}
          />
          <Tooltip 
             contentStyle={{ backgroundColor: '#141414', borderColor: '#2a2a2a', borderRadius: '8px', color: '#fff', fontFamily: 'monospace', fontSize: '12px' }}
             itemStyle={{ color: '#fff' }}
          />
          
          <Area 
             type="monotone" 
             dataKey="smoke" 
             stroke="#ff3333" 
             strokeWidth={2}
             fillOpacity={1} 
             fill="url(#colorSmoke)" 
             animationDuration={300}
             isAnimationActive={false} // Disable recharts animation to avoid jitter on interval updates
          />
          <Area 
             type="monotone" 
             dataKey="aqi" 
             stroke="#00ff88" 
             strokeWidth={1}
             fillOpacity={1} 
             fill="url(#colorAqi)" 
             animationDuration={300}
             isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
