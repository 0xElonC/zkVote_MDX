import React from 'react';
import './Campfire.css';

export const Campfire = () => {
  const size = 128; // Larger size for the centerpiece

  // Helper to render a pixel rect
  const P = ({ x, y, color, w = 1, h = 1, className, style }: { x: number; y: number; color: string; w?: number; h?: number; className?: string; style?: React.CSSProperties }) => (
    <rect x={x} y={y} width={w} height={h} fill={color} className={className} style={style} />
  );

  return (
    <div className="campfire-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ imageRendering: 'pixelated', overflow: 'visible' }}
      >
        {/* Logs (Dark Wood) - 32x32 Grid */}
        <P x={4} y={26} w={24} h={4} color="#4E342E" />
        <P x={6} y={24} w={20} h={2} color="#5D4037" />
        <P x={2} y={28} w={4} h={2} color="#3E2723" />
        <P x={26} y={28} w={4} h={2} color="#3E2723" />
        
        {/* Inner Fire (White Hot) */}
        <P x={12} y={18} w={8} h={8} color="#FFF" className="fire-core" />
        
        {/* Middle Fire (Yellow) */}
        <P x={10} y={16} w={12} h={8} color="#FFEB3B" className="fire-mid" style={{ mixBlendMode: 'screen' }} />
        <P x={12} y={12} w={8} h={4} color="#FFEB3B" className="fire-mid-2" />

        {/* Outer Fire (Orange/Red) */}
        <P x={8} y={20} w={16} h={6} color="#FF9800" className="fire-outer" opacity="0.9" />
        <P x={14} y={8} w={4} h={4} color="#FF5722" className="fire-tip" />
        <P x={10} y={14} w={2} h={4} color="#FF5722" className="fire-tip-2" />
        <P x={20} y={14} w={2} h={4} color="#FF5722" className="fire-tip-3" />

        {/* Sparks */}
        <P x={8} y={12} w={1} h={1} color="#FFD700" className="spark s1" />
        <P x={22} y={10} w={1} h={1} color="#FFD700" className="spark s2" />
        <P x={16} y={4} w={1} h={1} color="#FFD700" className="spark s3" />
        <P x={12} y={6} w={1} h={1} color="#FFD700" className="spark s4" />
      </svg>
      <style>{`
        .fire-core { animation: pulse 0.8s infinite alternate; }
        .fire-mid { animation: flicker 0.6s infinite alternate; }
        .fire-mid-2 { animation: flicker 0.5s infinite alternate-reverse; }
        .fire-tip { animation: flicker 0.4s infinite alternate; }
        .fire-tip-2 { animation: flicker 0.5s infinite alternate-reverse; animation-delay: 0.1s; }
        .fire-tip-3 { animation: flicker 0.6s infinite alternate; animation-delay: 0.2s; }
        
        .spark { opacity: 0; }
        .s1 { animation: floatUp 1.2s infinite linear; animation-delay: 0.2s; }
        .s2 { animation: floatUp 1.5s infinite linear; animation-delay: 0.5s; }
        .s3 { animation: floatUp 1.0s infinite linear; animation-delay: 0.8s; }
        .s4 { animation: floatUp 1.8s infinite linear; animation-delay: 0.1s; }

        @keyframes pulse {
          0% { opacity: 0.8; transform: scale(0.95); transform-origin: center; }
          100% { opacity: 1; transform: scale(1.05); transform-origin: center; }
        }
        @keyframes flicker {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-2px); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
