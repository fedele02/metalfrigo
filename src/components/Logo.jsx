import React from 'react';

export default function Logo({ className = "h-8 md:h-12 w-auto" }) {
  return (
    <img 
      src={`${import.meta.env.BASE_URL}logo.png`}
      alt="Metalfrigo Logo" 
      className={`object-contain ${className}`}
    />
  );
}
