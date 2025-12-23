import React from 'react';

type Role = 'villager' | 'werewolf' | 'seer' | 'witch' | 'unknown';

export const DetailedPixelAvatar = ({ role, isDead, size = 64, avatarId = 0 }: { role: Role; isDead?: boolean; size?: number; avatarId?: number }) => {
  // Use 64x64 grid for higher detail (64-bit pixel art)
  const pixelSize = size / 64; 

  // Helper to render a pixel rect
  const P = ({ x, y, color, w = 1, h = 1 }: { x: number; y: number; color: string; w?: number; h?: number }) => (
    <rect x={x} y={y} width={w} height={h} fill={color} />
  );

  // Color Palettes
  const colors = {
    skin: '#ffccaa',
    skinShadow: '#eebb99',
    hairVillager: '#8B4513',
    hairSeer: '#FFFFFF',
    hairWolf: '#555555',
    hairWitch: '#2c3e50',
    clothVillager: '#3498db',
    clothSeer: '#9b59b6',
    clothWolf: '#333333',
    clothWitch: '#8e44ad',
    eye: '#000000',
    eyeWolf: '#ff0000',
    dead: '#7f8c8d',
    gold: '#FFD700',
    silver: '#C0C0C0',
    potionRed: '#e74c3c',
    potionGreen: '#2ecc71',
  };

  const renderVillager = () => (
    <>
      {/* Hat */}
      <P x={8} y={4} w={16} h={6} color={colors.hairVillager} />
      <P x={6} y={8} w={20} h={2} color={colors.hairVillager} />
      
      {/* Face */}
      <P x={10} y={10} w={12} h={10} color={colors.skin} />
      <P x={10} y={10} w={2} h={4} color={colors.skinShadow} /> {/* Side shadow */}

      {/* Eyes */}
      <P x={12} y={14} w={2} h={2} color={colors.eye} />
      <P x={18} y={14} w={2} h={2} color={colors.eye} />
      
      {/* Mouth */}
      <P x={14} y={18} w={4} h={1} color="#a0522d" />

      {/* Body */}
      <P x={8} y={20} w={16} h={12} color={colors.clothVillager} />
      <P x={14} y={20} w={4} h={12} color="#2980b9" /> {/* Scarf/Detail */}
      
      {/* Arms */}
      <P x={6} y={21} w={2} h={8} color={colors.skin} />
      <P x={24} y={21} w={2} h={8} color={colors.skin} />
    </>
  );

  const renderSeer = () => (
    <>
      {/* Hood Back */}
      <P x={6} y={4} w={20} h={20} color="#6c3483" />
      
      {/* Face */}
      <P x={10} y={8} w={12} h={10} color={colors.skin} />
      
      {/* Eyes (Mystic) */}
      <P x={12} y={12} w={2} h={2} color="#8e44ad" />
      <P x={18} y={12} w={2} h={2} color="#8e44ad" />
      
      {/* Beard */}
      <P x={10} y={16} w={12} h={6} color="#ecf0f1" />
      
      {/* Hood Front/Rim */}
      <P x={8} y={6} w={16} h={2} color="#8e44ad" />
      <P x={8} y={6} w={2} h={14} color="#8e44ad" />
      <P x={22} y={6} w={2} h={14} color="#8e44ad" />

      {/* Body */}
      <P x={8} y={22} w={16} h={10} color={colors.clothSeer} />
      
      {/* Crystal Ball */}
      <P x={20} y={24} w={8} h={8} color="#3498db" />
      <P x={22} y={25} w={2} h={2} color="#fff" /> {/* Shine */}
    </>
  );

  const renderWerewolf = () => (
    <>
      {/* Ears */}
      <P x={6} y={2} w={4} h={6} color={colors.hairWolf} />
      <P x={22} y={2} w={4} h={6} color={colors.hairWolf} />
      
      {/* Head */}
      <P x={8} y={6} w={16} h={14} color={colors.hairWolf} />
      <P x={6} y={10} w={20} h={8} color={colors.hairWolf} />
      
      {/* Eyes (Glowing Red) */}
      <P x={10} y={12} w={3} h={3} color={colors.eyeWolf} />
      <P x={19} y={12} w={3} h={3} color={colors.eyeWolf} />
      
      {/* Snout */}
      <P x={12} y={16} w={8} h={6} color="#333" />
      <P x={13} y={20} w={1} h={2} color="#fff" /> {/* Fang */}
      <P x={18} y={20} w={1} h={2} color="#fff" /> {/* Fang */}

      {/* Body (Hunched) */}
      <P x={6} y={20} w={20} h={12} color={colors.clothWolf} />
      
      {/* Claws */}
      <P x={2} y={22} w={4} h={4} color="#7f8c8d" />
      <P x={26} y={22} w={4} h={4} color="#7f8c8d" />
    </>
  );

  const renderWitch = () => (
    <>
      {/* Hat (Pointy) */}
      <P x={10} y={2} w={12} h={2} color={colors.hairWitch} />
      <P x={12} y={0} w={8} h={2} color={colors.hairWitch} />
      <P x={6} y={4} w={20} h={2} color={colors.hairWitch} />
      
      {/* Hair */}
      <P x={8} y={6} w={16} h={14} color="#34495e" />
      
      {/* Face */}
      <P x={10} y={8} w={12} h={10} color={colors.skin} />
      
      {/* Eyes */}
      <P x={12} y={12} w={2} h={2} color={colors.eye} />
      <P x={18} y={12} w={2} h={2} color={colors.eye} />
      
      {/* Robe */}
      <P x={8} y={20} w={16} h={12} color={colors.clothWitch} />
      <P x={14} y={20} w={4} h={12} color="#9b59b6" />
      
      {/* Potions */}
      <P x={4} y={22} w={4} h={6} color={colors.potionRed} /> {/* Poison */}
      <P x={5} y={21} w={2} h={1} color="#fff" /> {/* Cork */}
      
      <P x={24} y={22} w={4} h={6} color={colors.potionGreen} /> {/* Heal */}
      <P x={25} y={21} w={2} h={1} color="#fff" /> {/* Cork */}
    </>
  );

  // 8种不同风格的64位像素角色（隐藏真实身份）
  const renderUnknownVariant = (variant: number) => {
    const styles = [
      // Style 0: 骑士
      () => (
        <>
          <P x={10} y={4} w={12} h={4} color="#c0c0c0" /> {/* Helmet */}
          <P x={8} y={8} w={16} h={2} color="#a8a8a8" />
          <P x={12} y={10} w={8} h={8} color="#f5deb3" /> {/* Face */}
          <P x={14} y={13} w={2} h={2} color="#000" />
          <P x={18} y={13} w={2} h={2} color="#000" />
          <P x={8} y={18} w={16} h={14} color="#708090" /> {/* Armor */}
          <P x={14} y={20} w={4} h={8} color="#ffd700" /> {/* Shield */}
        </>
      ),
      // Style 1: 法师
      () => (
        <>
          <P x={12} y={2} w={8} h={2} color="#4169e1" /> {/* Hat tip */}
          <P x={10} y={4} w={12} h={4} color="#4169e1" />
          <P x={8} y={8} w={16} h={2} color="#4169e1" /> {/* Hat brim */}
          <P x={11} y={10} w={10} h={8} color="#ffe4c4" /> {/* Face */}
          <P x={13} y={13} w={2} h={2} color="#8b4513" />
          <P x={17} y={13} w={2} h={2} color="#8b4513" />
          <P x={8} y={18} w={16} h={14} color="#191970" /> {/* Robe */}
          <P x={24} y={22} w={4} h={8} color="#8b4513" /> {/* Staff */}
        </>
      ),
      // Style 2: 刺客
      () => (
        <>
          <P x={8} y={6} w={16} h={16} color="#2f4f4f" /> {/* Hood */}
          <P x={12} y={12} w={8} h={6} color="#000" /> {/* Face shadow */}
          <P x={14} y={14} w={2} h={1} color="#ff0000" /> {/* Eye glow */}
          <P x={18} y={14} w={2} h={1} color="#ff0000" />
          <P x={6} y={20} w={20} h={12} color="#1a1a1a" /> {/* Cloak */}
          <P x={4} y={24} w={2} h={6} color="#c0c0c0" /> {/* Dagger */}
        </>
      ),
      // Style 3: 农民
      () => (
        <>
          <P x={10} y={6} w={12} h={4} color="#deb887" /> {/* Straw hat */}
          <P x={8} y={8} w={16} h={2} color="#d2691e" />
          <P x={11} y={10} w={10} h={8} color="#ffdab9" /> {/* Face */}
          <P x={13} y={13} w={2} h={2} color="#000" />
          <P x={17} y={13} w={2} h={2} color="#000" />
          <P x={14} y={16} w={4} h={1} color="#8b4513" /> {/* Smile */}
          <P x={8} y={18} w={16} h={14} color="#8b7355" /> {/* Vest */}
          <P x={20} y={22} w={6} h={8} color="#654321" /> {/* Pitchfork */}
        </>
      ),
      // Style 4: 商人
      () => (
        <>
          <P x={10} y={4} w={12} h={6} color="#8b0000" /> {/* Hat */}
          <P x={11} y={10} w={10} h={8} color="#ffefd5" /> {/* Face */}
          <P x={13} y={13} w={2} h={2} color="#000" />
          <P x={17} y={13} w={2} h={2} color="#000" />
          <P x={8} y={18} w={16} h={14} color="#800020" /> {/* Rich coat */}
          <P x={14} y={20} w={4} h={6} color="#ffd700" /> {/* Gold buttons */}
          <P x={4} y={24} w={4} h={6} color="#8b4513" /> {/* Bag of gold */}
        </>
      ),
      // Style 5: 猎人
      () => (
        <>
          <P x={10} y={6} w={12} h={4} color="#556b2f" /> {/* Hood */}
          <P x={11} y={10} w={10} h={8} color="#d2b48c" /> {/* Face */}
          <P x={13} y={13} w={2} h={2} color="#000" />
          <P x={17} y={13} w={2} h={2} color="#000" />
          <P x={8} y={18} w={16} h={14} color="#6b8e23" /> {/* Tunic */}
          <P x={2} y={20} w={6} h={2} color="#8b4513" /> {/* Bow */}
          <P x={4} y={18} w={2} h={4} color="#8b4513" />
        </>
      ),
      // Style 6: 铁匠
      () => (
        <>
          <P x={10} y={8} w={12} h={10} color="#cd853f" /> {/* Face */}
          <P x={8} y={10} w={16} h={4} color="#8b4513" /> {/* Bandana */}
          <P x={13} y={13} w={2} h={2} color="#000" />
          <P x={17} y={13} w={2} h={2} color="#000" />
          <P x={8} y={18} w={16} h={14} color="#654321" /> {/* Apron */}
          <P x={24} y={22} w={4} h={8} color="#696969" /> {/* Hammer */}
          <P x={14} y={24} w={4} h={4} color="#ff4500" /> {/* Forge glow */}
        </>
      ),
      // Style 7: 吟游诗人
      () => (
        <>
          <P x={10} y={4} w={12} h={4} color="#9370db" /> {/* Hat with feather */}
          <P x={18} y={2} w={4} h={6} color="#00ff00" /> {/* Feather */}
          <P x={11} y={10} w={10} h={8} color="#ffe4b5" /> {/* Face */}
          <P x={13} y={13} w={2} h={2} color="#000" />
          <P x={17} y={13} w={2} h={2} color="#000" />
          <P x={8} y={18} w={16} h={14} color="#ff69b4" /> {/* Colorful outfit */}
          <P x={4} y={24} w={4} h={6} color="#daa520" /> {/* Lute */}
        </>
      ),
    ];
    return styles[variant % 8]();
  };

  const renderUnknown = () => renderUnknownVariant(avatarId);

  const getContent = () => {
    if (isDead) {
      return (
        <>
          {/* Tombstone Shape */}
          <path d="M8 30 L8 10 Q16 2 24 10 L24 30 Z" fill="#bdc3c7" />
          <rect x="4" y="30" width="24" height="2" fill="#7f8c8d" />
          {/* RIP Text (Pixelated) */}
          <P x={12} y={14} w={2} h={6} color="#7f8c8d" /> {/* R */}
          <P x={14} y={14} w={2} h={2} color="#7f8c8d" />
          <P x={14} y={18} w={2} h={2} color="#7f8c8d" />
          
          <P x={18} y={14} w={2} h={6} color="#7f8c8d" /> {/* I */}
        </>
      );
    }
    switch (role) {
      case 'villager': return renderVillager();
      case 'seer': return renderSeer();
      case 'werewolf': return renderWerewolf();
      case 'witch': return renderWitch();
      default: return renderUnknown();
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ imageRendering: 'pixelated', filter: isDead ? 'grayscale(100%)' : 'none' }}
    >
      {getContent()}
    </svg>
  );
};
