import React from 'react';
import type { SVGContent } from '../assets/images';

interface SvgImageProps {
  /** The SVG content as a string or imported SVG file */
  svg: SVGContent;
  /** Alt text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A component for rendering SVG content with proper accessibility and styling.
 * Automatically handles SVG sizing and preserves aspect ratio.
 */
export const SvgImage: React.FC<SvgImageProps> = ({ svg, alt, className = '' }) => {
  // If the input is an SVG string, render it with dangerouslySetInnerHTML
  if (typeof svg === 'string' && svg.startsWith('<svg')) {
    return (
      <div 
        className={`w-full h-full min-h-[150px] ${className}`}
        role="img"
        aria-label={alt}
        dangerouslySetInnerHTML={{ 
          __html: svg.replace(
            '<svg',
            '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="min-height: 150px;"'
          )
        }}
      />
    );
  }

  // If the input is an imported SVG file, render it as an img
  return (
    <img 
      src={svg}
      alt={alt}
      className={`w-full h-full object-contain min-h-[150px] ${className}`}
    />
  );
}; 