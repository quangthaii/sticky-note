import React from 'react';
import { StickyNotesProvider } from '@/contexts';
import { StickyNotesBoard } from '@/components/organisms';
import './App.css';

const App: React.FC = () => {
  return (
    <StickyNotesProvider>
      <StickyNotesBoard />
    </StickyNotesProvider>
  );
};

export default App;
