import { useState, useEffect, useCallback } from 'react';

const ANIMALS = ['🦜', '🐒', '🐢', '🐆', '🦦', '🦜', '🦋', '🐸', '🦩', '🦅'];

export default function AnimalCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [animal, setAnimal] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  }, []);

  const handleLeave = useCallback(() => setVisible(false), []);
  const handleEnter = useCallback(() => setVisible(true), []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [handleMove, handleLeave, handleEnter]);

  useEffect(() => {
    const iv = setInterval(() => {
      setAnimal((prev) => (prev + 1) % ANIMALS.length);
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="animal-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate(${pos.x + 12}px, ${pos.y + 12}px)`,
        pointerEvents: 'none',
        zIndex: 99999,
        fontSize: '1.5rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {ANIMALS[animal]}
    </div>
  );
}
