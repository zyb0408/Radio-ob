import React, { useState } from 'react';
import { RadioControl } from './components/RadioControl';
import { Background } from './components/Background';
import { THEMES } from './constants';
import { Theme } from './types';

function App() {
  // Default to first theme (Cyberpunk)
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);

  return (
    <Background theme={currentTheme}>
        <RadioControl 
            theme={currentTheme} 
            setTheme={setCurrentTheme} 
        />
    </Background>
  );
}

export default App;