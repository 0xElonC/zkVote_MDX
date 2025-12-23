import React from 'react';

export const PixelAvatar = ({ role, isDead }: { role: 'villager' | 'werewolf' | 'seer' | 'unknown'; isDead?: boolean }) => {
  const getColor = () => {
    if (isDead) return '#555';
    switch (role) {
      case 'werewolf': return '#e74c3c';
      case 'seer': return '#9b59b6';
      case 'villager': return '#f1c40f';
      default: return '#95a5a6';
    }
  };

  return (
    <svg width="64" height="64" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      {/* Background */}
      <rect x="2" y="2" width="12" height="12" fill={getColor()} />
      
      {/* Face */}
      <rect x="4" y="4" width="8" height="8" fill="#ffccaa" />
      
      {/* Eyes */}
      <rect x="5" y="6" width="2" height="2" fill="black" />
      <rect x="9" y="6" width="2" height="2" fill="black" />
      
      {/* Mouth */}
      {role === 'werewolf' && !isDead ? (
        <>
          <rect x="5" y="9" width="6" height="1" fill="black" />
          <rect x="5" y="10" width="1" height="1" fill="white" />
          <rect x="10" y="10" width="1" height="1" fill="white" />
        </>
      ) : (
        <rect x="6" y="10" width="4" height="1" fill="black" />
      )}

      {/* Dead Overlay */}
      {isDead && (
        <>
          <line x1="3" y1="3" x2="13" y2="13" stroke="red" strokeWidth="1" />
          <line x1="13" y1="3" x2="3" y2="13" stroke="red" strokeWidth="1" />
        </>
      )}
    </svg>
  );
};
