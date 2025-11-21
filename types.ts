export interface Station {
  id: string;
  name: string;
  genre: string;
  url: string; // Stream URL
  frequency: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string; // Main background of the app
    case: string; // The radio case color
    caseBorder: string; // Border of the radio
    face: string; // The radio interface background
    accent: string; // Highlights, buttons
    display: string; // The screen background
    displayText: string; // Text color on screen
    speaker: string; // Speaker mesh color
  };
  fontDisplay: string; // Font for the digital display
  texture?: string; // Optional background texture class
}