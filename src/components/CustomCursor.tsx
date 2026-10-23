import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CursorState } from '../types';

interface CustomCursorProps {
  cursorState: CursorState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) {
    return null;
  }

  const isProduct = cursorState.type === 'product';
  const isButton = cursorState.type === 'button';

  return (
    <div className="pointer-events-none fixed inset-0 z-100 overflow-hidden">
      {/* Outer follow circle */}
      <motion.div
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full pointer-events-none transition-colors duration-200 ${
          isProduct
            ? 'w-20 h-20 bg-[#111111] text-[#f8f7f4] shadow-xl'
            : isButton
            ? 'w-8 h-8 bg-[#111111]/10 border border-[#111111]'
            : 'w-6 h-6 border border-[#111111]/40 bg-transparent'
        }`}
        animate={{
          x: position.x - (isProduct ? 40 : isButton ? 16 : 12),
          y: position.y - (isProduct ? 40 : isButton ? 16 : 12),
          scale: isProduct ? 1 : isButton ? 1.1 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.2,
        }}
      >
        {isProduct && (
          <span className="text-[10px] font-space font-bold tracking-[0.2em] uppercase text-[#f8f7f4] select-none">
            {cursorState.text || 'VIEW'}
          </span>
        )}
      </motion.div>

      {/* Center sharp dot */}
      {!isProduct && (
        <motion.div
          className="fixed left-0 top-0 w-1.5 h-1.5 rounded-full bg-[#111111] pointer-events-none"
          animate={{
            x: position.x - 3,
            y: position.y - 3,
          }}
          transition={{
            type: 'spring',
            damping: 45,
            stiffness: 800,
            mass: 0.1,
          }}
        />
      )}
    </div>
  );
};
