import React from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  colorClass: string; // Expecting text color class mostly, or background color class logic
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, colorClass }) => {
  // Create 12 bars
  const bars = Array.from({ length: 16 });

  return (
    <div className="flex items-end justify-center space-x-1 h-12 w-full overflow-hidden px-2">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-t-sm opacity-80 transition-all duration-300 ${colorClass} ${
            isPlaying ? 'animate-visualizer' : 'h-[5%]'
          }`}
          style={{
            // Randomize animation delay for organic look
            animationDelay: isPlaying ? `${Math.random() * 0.5}s` : '0s',
            // Randomize height limits slightly
            animationDuration: isPlaying ? `${0.3 + Math.random() * 0.4}s` : '0s',
            backgroundColor: 'currentColor'
          }}
        />
      ))}
    </div>
  );
};