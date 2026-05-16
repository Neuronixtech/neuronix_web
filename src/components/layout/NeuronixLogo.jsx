import React from 'react';

export default function NeuronixLogo({ className = "", size = 32 }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Neural network nodes */}
        <circle cx="24" cy="8" r="3" fill="#ff3b3b" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="10" cy="20" r="2.5" fill="#ff3b3b" opacity="0.7" />
        <circle cx="38" cy="20" r="2.5" fill="#ff3b3b" opacity="0.7" />
        <circle cx="16" cy="32" r="3" fill="#ff3b3b" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="3" fill="#ff3b3b" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.5;0.8" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="24" cy="42" r="2.5" fill="#ff3b3b" opacity="0.6" />
        {/* Center brain node */}
        <circle cx="24" cy="24" r="5" fill="#ff3b3b">
          <animate attributeName="r" values="5;5.5;5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="24" cy="24" r="7" fill="none" stroke="#ff3b3b" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Connection lines */}
        <line x1="24" y1="8" x2="24" y2="19" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.4" />
        <line x1="10" y1="20" x2="19" y2="24" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.3" />
        <line x1="38" y1="20" x2="29" y2="24" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.3" />
        <line x1="24" y1="29" x2="16" y2="32" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.4" />
        <line x1="24" y1="29" x2="32" y2="32" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.4" />
        <line x1="16" y1="32" x2="24" y2="42" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.3" />
        <line x1="32" y1="32" x2="24" y2="42" stroke="#ff3b3b" strokeWidth="0.8" opacity="0.3" />
        <line x1="10" y1="20" x2="16" y2="32" stroke="#ff3b3b" strokeWidth="0.5" opacity="0.2" />
        <line x1="38" y1="20" x2="32" y2="32" stroke="#ff3b3b" strokeWidth="0.5" opacity="0.2" />
        <line x1="24" y1="8" x2="10" y2="20" stroke="#ff3b3b" strokeWidth="0.5" opacity="0.2" />
        <line x1="24" y1="8" x2="38" y2="20" stroke="#ff3b3b" strokeWidth="0.5" opacity="0.2" />
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="24" cy="24" r="4" fill="#ff3b3b" filter="url(#glow)" opacity="0.5" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold font-heading tracking-tight text-foreground">
          Neuronix
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
          Technologies
        </span>
      </div>
    </div>
  );
}