import React from 'react';
import { Theme } from '../types';

interface BackgroundProps {
    theme: Theme;
    children: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({ theme, children }) => {
  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-1000 ease-in-out ${theme.colors.bg} relative overflow-hidden`}>
      
      {/* Optional Texture/Gradient Overlay based on theme */}
      {theme.texture && (
        <div 
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
            style={{ background: theme.texture }}
        ></div>
      )}
      
      {/* Ambient decoration circles (animated) */}
      <div className={`absolute top-10 left-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${theme.colors.accent}`}></div>
      <div className={`absolute top-10 right-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${theme.colors.face}`}></div>
      <div className={`absolute -bottom-8 left-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 ${theme.colors.case}`}></div>

      {/* Content */}
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
};