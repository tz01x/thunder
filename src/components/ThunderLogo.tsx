import React from 'react';
import Image from 'next/image';
const thunderBrandLogo = '/images/logo.png';

interface ThunderLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const ThunderLogo: React.FC<ThunderLogoProps> = ({
  className = 'h-12 md:h-16 w-auto',
}) => {
  return (
    <Image
      src={thunderBrandLogo}
      alt="Thunder"
      width={1171}
      height={1171}
      sizes="64px"
      className={`inline-block select-none object-contain ${className}`}
      draggable={false}
    />
  );
};

// public/logo.png