import { Station, Theme } from './types';

export const STATIONS: Station[] = [
  {
    id: '1',
    name: 'SomaFM Groove Salad',
    genre: 'Ambient / Chill',
    url: 'https://ice2.somafm.com/groovesalad-256-mp3',
    frequency: '100.1 FM'
  },
  {
    id: '2',
    name: 'Nightride FM',
    genre: 'Synthwave / Cyberpunk',
    url: 'https://stream.nightride.fm/nightride.mp3',
    frequency: '88.8 FM'
  },
  {
    id: '3',
    name: 'Radio Paradise',
    genre: 'Rock / Eclectic',
    url: 'https://stream.radioparadise.com/rock-128',
    frequency: '96.6 FM'
  },
  {
    id: '4',
    name: 'BBC World Service',
    genre: 'Global News',
    url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service',
    frequency: 'AM 720'
  },
  {
    id: '5',
    name: 'Smooth Jazz Florida',
    genre: 'Jazz / Lounge',
    url: 'https://us4.internet-radio.com/proxy/wsjf?mp=/stream',
    frequency: '98.1 FM'
  }
];

export const THEMES: Theme[] = [
  {
    id: 'cyberpunk',
    name: 'Night City',
    colors: {
      bg: 'bg-slate-900',
      case: 'bg-gray-900',
      caseBorder: 'border-cyan-500/50',
      face: 'bg-slate-800',
      accent: 'bg-pink-500 hover:bg-pink-400',
      display: 'bg-black',
      displayText: 'text-cyan-400',
      speaker: 'bg-gray-800'
    },
    fontDisplay: 'font-[Orbitron]',
    texture: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(0,0,0,0) 70%)'
  },
  {
    id: 'retro',
    name: '1970s Wood',
    colors: {
      bg: 'bg-amber-100',
      case: 'bg-[#5D4037]', // Dark wood
      caseBorder: 'border-[#3E2723]',
      face: 'bg-[#D7CCC8]', // Beige
      accent: 'bg-orange-600 hover:bg-orange-500',
      display: 'bg-[#263238]', // Dark Slate
      displayText: 'text-amber-500',
      speaker: 'bg-[#3E2723]'
    },
    fontDisplay: 'font-[Inter]',
    texture: ''
  },
  {
    id: 'minimal',
    name: 'Braun White',
    colors: {
      bg: 'bg-gray-200',
      case: 'bg-white',
      caseBorder: 'border-gray-300',
      face: 'bg-gray-50',
      accent: 'bg-gray-900 hover:bg-gray-700',
      display: 'bg-gray-100',
      displayText: 'text-gray-900',
      speaker: 'bg-gray-200'
    },
    fontDisplay: 'font-[Inter]',
    texture: ''
  },
  {
    id: 'ocean',
    name: 'Pacific Blue',
    colors: {
      bg: 'bg-blue-50',
      case: 'bg-blue-600',
      caseBorder: 'border-blue-800',
      face: 'bg-blue-500',
      accent: 'bg-yellow-400 hover:bg-yellow-300',
      display: 'bg-blue-900',
      displayText: 'text-blue-100',
      speaker: 'bg-blue-700'
    },
    fontDisplay: 'font-[Share Tech Mono]',
    texture: ''
  }
];
