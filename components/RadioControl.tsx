import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio, Palette } from 'lucide-react';
import { Station, Theme } from '../types';
import { STATIONS, THEMES } from '../constants';
import { AudioVisualizer } from './AudioVisualizer';

interface RadioControlProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export const RadioControl: React.FC<RadioControlProps> = ({ theme, setTheme }) => {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isTuning, setIsTuning] = useState(false);
  
  // Audio Ref
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentStation = STATIONS[currentStationIndex];

  // Handle Station Switch
  const changeStation = (direction: 'next' | 'prev') => {
    setIsTuning(true);
    
    // Short delay to simulate tuning knob turn before frequency change
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentStationIndex((prev) => (prev + 1) % STATIONS.length);
      } else {
        setCurrentStationIndex((prev) => (prev - 1 + STATIONS.length) % STATIONS.length);
      }
    }, 300);
  };

  // Handle Audio State changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = isMuted ? 0 : volume;

    // Only play if user wants to play AND we are not currently tuning (simulating static)
    if (isPlaying && !isTuning) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback prevented:", error);
          // Don't auto-stop here immediately, as streams might just be buffering
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentStationIndex, volume, isMuted, isTuning]);

  // Effect for Tuning Animation finish
  useEffect(() => {
    if (isTuning) {
      const timer = setTimeout(() => {
        setIsTuning(false);
        // Playback resumption is handled by the main useEffect above when isTuning becomes false
      }, 800); // Total tuning sound/static duration
      return () => clearTimeout(timer);
    }
  }, [isTuning]);

  // Cycle Themes
  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex(t => t.id === theme.id);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  };

  return (
    <div className={`relative w-full max-w-2xl p-8 rounded-3xl shadow-2xl transition-all duration-700 ease-in-out border-4 ${theme.colors.case} ${theme.colors.caseBorder}`}>
       {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentStation.url}
        // Removed crossOrigin="anonymous" to allow playing streams that don't support CORS headers.
        // Note: This disables advanced Web Audio API features like real-time frequency analysis on this element,
        // but is necessary for broad radio stream compatibility.
        onEnded={() => changeStation('next')} 
        onError={(e) => console.log("Stream error or interruption", e)}
      />

      {/* Handle */}
      <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-1/2 h-8 rounded-t-xl opacity-80 transition-colors duration-700 ${theme.colors.caseBorder} bg-opacity-50 border-t-4 border-x-4 border-b-0 ${theme.colors.caseBorder}`}></div>

      {/* Main Radio Face */}
      <div className={`relative flex flex-col gap-6 p-6 rounded-xl border-2 shadow-inner transition-colors duration-700 ${theme.colors.face} border-black/10`}>
        
        {/* Top Section: Speakers and Display */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          
          {/* Left Speaker */}
          <div className={`hidden md:block w-24 rounded-lg shadow-inner transition-colors duration-700 ${theme.colors.speaker} relative overflow-hidden`}>
             <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.4)_1px,transparent_1px)] bg-[size:4px_4px] opacity-30"></div>
          </div>

          {/* Display Screen */}
          <div className={`flex-1 flex flex-col justify-between rounded-lg p-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-colors duration-700 ${theme.colors.display} ${theme.colors.displayText} relative overflow-hidden min-h-[160px]`}>
             
             {/* Glass Reflection */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10"></div>

             {/* Header Info */}
             <div className={`flex justify-between items-center z-0 ${theme.fontDisplay} text-xs opacity-70`}>
                <span className="flex items-center gap-1"><Radio size={14} /> {currentStation.frequency}</span>
                <span className="uppercase tracking-widest">{isPlaying && !isTuning ? 'ON AIR' : 'STANDBY'}</span>
             </div>

             {/* Main Station Info */}
             <div className={`flex flex-col items-center justify-center my-2 z-0 transition-opacity duration-500 ${isTuning ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
                <h1 className={`text-2xl md:text-3xl font-bold text-center leading-tight mb-1 ${theme.fontDisplay} drop-shadow-md`}>
                  {currentStation.name}
                </h1>
                <p className="text-sm opacity-80 font-mono tracking-wide">{currentStation.genre}</p>
             </div>

             {/* Visualizer Area */}
             <div className="mt-auto z-0">
                <AudioVisualizer isPlaying={isPlaying && !isTuning} colorClass={theme.colors.displayText} />
             </div>

             {/* Tuning Static Overlay */}
             <div className={`absolute inset-0 bg-white/10 z-20 pointer-events-none transition-opacity duration-200 ${isTuning ? 'opacity-20' : 'opacity-0'}`} 
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
             </div>
          </div>

           {/* Right Speaker */}
           <div className={`hidden md:block w-24 rounded-lg shadow-inner transition-colors duration-700 ${theme.colors.speaker} relative overflow-hidden`}>
             <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.4)_1px,transparent_1px)] bg-[size:4px_4px] opacity-30"></div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Volume Knob Area */}
          <div className="flex items-center justify-center md:justify-start gap-3 order-2 md:order-1">
             <button onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-full transition-all ${theme.colors.displayText} hover:bg-black/10`}>
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
             </button>
             <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-current opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: 'currentColor' }}
             />
          </div>

          {/* Main Playback Controls */}
          <div className="flex items-center justify-center gap-4 order-1 md:order-2">
            <button 
              onClick={() => changeStation('prev')}
              disabled={isTuning}
              className={`p-3 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ${theme.colors.case} text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <SkipBack size={20} />
            </button>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-5 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] transform hover:scale-105 active:scale-95 transition-all duration-300 ${theme.colors.accent} text-white border-2 border-white/20`}
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>

            <button 
              onClick={() => changeStation('next')}
              disabled={isTuning}
              className={`p-3 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ${theme.colors.case} text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center justify-center md:justify-end order-3">
             <button 
               onClick={cycleTheme}
               className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transform hover:scale-105 transition-all duration-300 border border-black/5 ${theme.colors.case} text-white/90`}
             >
               <Palette size={14} />
               <span>Skin</span>
             </button>
          </div>
        </div>

      </div>
      
      {/* Brand Plate */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[10px] font-bold uppercase opacity-40 tracking-[0.3em] pointer-events-none text-black mix-blend-overlay">
        RetroWave Audio System
      </div>
    </div>
  );
};