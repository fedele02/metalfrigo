import React from 'react';

export default function Logo({ className = "text-2xl md:text-4xl" }) {
  return (
    <div className={`flex flex-col font-heading font-black tracking-normal leading-none ${className}`}>
      <div className="flex select-none">
        {/* Metal - Metallic Silver Gradient */}
        <span 
          className="uppercase drop-shadow-md"
          style={{
            background: 'linear-gradient(to bottom, #FFFFFF 0%, #CBD5E1 35%, #475569 50%, #94A3B8 55%, #F8FAFC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Metal
        </span>
        {/* Frigo - Dark Blue/Purple Gradient */}
        <span 
          className="uppercase drop-shadow-md"
          style={{
            background: 'linear-gradient(to bottom right, #6366F1 0%, #3730A3 40%, #1E1B4B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Frigo
        </span>
      </div>
      
      {/* Italian Flag Line */}
      <div className="flex w-full h-[0.15em] mt-[0.04em] shadow-sm rounded-sm overflow-hidden">
        <div className="w-1/3 h-full bg-[#008C45]"></div>
        <div className="w-1/3 h-full bg-[#F4F5F0]"></div>
        <div className="w-1/3 h-full bg-[#CD212A]"></div>
      </div>
    </div>
  );
}
