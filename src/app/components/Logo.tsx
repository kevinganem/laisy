import React from 'react';
import Image from 'next/image';
import { getPublicAssetPath } from '../utils/getPublicAssetPath';

interface LogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * Logo component for KEEPIA.
 * Uses the original logo.png file
 * 
 * @param size - Logo size in pixels (default: 100)
 * @param className - Additional CSS classes
 * @param animated - Whether to show animations (default: true)
 */
const Logo: React.FC<LogoProps> = ({ 
  size = 100, 
  className = '',
  animated = true 
}) => {
  return (
    <Image
      src={getPublicAssetPath('/logo.png')}
      alt="KEEPIA Logo"
      width={size}
      height={size}
      className={`${animated ? 'animate-pulse' : ''} ${className}`}
      style={{
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
      }}
    />
  );
};

export default Logo; 