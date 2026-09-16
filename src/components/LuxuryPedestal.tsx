import React from 'react';

interface LuxuryPedestalProps {
  isHovered?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LuxuryPedestal: React.FC<LuxuryPedestalProps> = ({
  isHovered = false,
  className = '',
  size = 'md'
}) => {
  // Ultra-thin elliptical showroom base
  const dimensions = {
    sm: {
      width: 'w-28 sm:w-36',
      height: 'h-4 sm:h-5',
      shadowWidth: 'w-24 sm:w-32'
    },
    md: {
      width: 'w-36 sm:w-48',
      height: 'h-5 sm:h-6',
      shadowWidth: 'w-32 sm:w-42'
    },
    lg: {
      width: 'w-48 sm:w-60',
      height: 'h-6 sm:h-7',
      shadowWidth: 'w-40 sm:w-52'
    }
  }[size];

  return (
    <div
      className={`relative flex flex-col items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Soft realistic floor contact shadow */}
      <div
        className={`absolute -bottom-1 ${dimensions.shadowWidth} h-3 rounded-full bg-black/80 blur-[4px] transition-all duration-700 ease-out`}
        style={{
          transform: `scale(${isHovered ? 1.04 : 1})`,
          opacity: isHovered ? 0.75 : 0.6
        }}
      />

      {/* 2. Single ultra-thin elliptical pedestal */}
      <div
        className={`relative ${dimensions.width} ${dimensions.height} transition-transform duration-700 ease-out`}
        style={{
          perspective: '500px'
        }}
      >
        <div
          className="relative w-full h-full rounded-full transition-transform duration-700 ease-out"
          style={{
            transform: `rotateX(68deg) translateY(${isHovered ? '-1px' : '0px'})`,
            background: 'linear-gradient(145deg, #10291C 0%, #08160E 60%, #040A07 100%)',
            border: '0.75px solid rgba(212, 175, 55, 0.4)',
            boxShadow: 'inset 0 1px 1.5px rgba(229, 197, 131, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.9)'
          }}
        >
          {/* Very faint soft contact shadow cast by the product */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full bg-black/50 blur-[2px] transition-opacity duration-700"
            style={{
              opacity: isHovered ? 0.4 : 0.65
            }}
          />
        </div>
      </div>
    </div>
  );
};
