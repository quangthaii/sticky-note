import React, { createContext, useContext, type ReactNode } from 'react';
import type { StickyNotesState, StickyNotesActions } from '@/types';
import { useStickyNotes } from '@/hooks/useStickyNotes';
 
export type StickyNotesContextType = StickyNotesState & StickyNotesActions & {
  containerRef: React.RefObject<HTMLDivElement | null>;
};
 
const StickyNotesContext = createContext<StickyNotesContextType | undefined>(undefined);
 
interface StickyNotesProviderProps {
  children: ReactNode;
}
 
export const StickyNotesProvider: React.FC<StickyNotesProviderProps> = ({ children }) => {
  const stickyNotesHook = useStickyNotes();
 
  const value: StickyNotesContextType = {
    ...stickyNotesHook,
  };
 
  return (
    <StickyNotesContext.Provider value={value}>
      {children}
    </StickyNotesContext.Provider>
  );
};
 
// eslint-disable-next-line react-refresh/only-export-components
export const useStickyNotesContext = () => {
  const context = useContext(StickyNotesContext);
  if (context === undefined) {
    throw new Error('useStickyNotesContext must be used within a StickyNotesProvider');
  }
  return context;
};