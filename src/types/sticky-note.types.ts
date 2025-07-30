export interface Position {
  x: number;
  y: number;
}
 
export interface Dimensions {
  width: number;
  height: number;
}
 
export interface StickyNote {
  id: string;
  text: string;
  position: Position;
  dimensions: Dimensions;
  color: 'YELLOW' | 'PINK' | 'BLUE' | 'GREEN' | 'ORANGE' | 'PURPLE';
  zIndex: number;
  createdAt: string;
  updatedAt: string;
}
 
export interface DragState {
  isDragging: boolean;
  dragType: 'move' | 'resize' | null;
  startPosition: Position;
  startDimensions?: Dimensions;
  offset: Position;
}
 
export interface ResizeHandle {
  direction: 'se' | 'sw' | 'ne' | 'nw' | 'n' | 's' | 'e' | 'w';
  cursor: string;
}
 
export interface StickyNotesState {
  notes: StickyNote[];
  activeNoteId: string | null;
  dragState: DragState;
  trashZoneActive: boolean;
  maxZIndex: number;
}
 
export interface StickyNotesActions {
  createNote: (position: Position, color?: StickyNote['color']) => void;
  updateNote: (id: string, updates: Partial<StickyNote>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  moveNote: (id: string, position: Position) => void;
  resizeNote: (id: string, dimensions: Dimensions) => void;
  bringToFront: (id: string) => void;
  startDrag: (id: string, type: DragState['dragType'], startPosition: Position, offset: Position) => void;
  endDrag: () => void;
  setTrashZoneActive: (active: boolean) => void;
  loadNotes: () => Promise<void>;
  saveNotes: () => Promise<void>;
}
 
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
 
export interface StorageAdapter {
  load: () => Promise<StickyNote[]>;
  save: (notes: StickyNote[]) => Promise<void>;
}
 
export interface DragEvent extends React.MouseEvent {
  target: HTMLElement;
}
 
export interface MousePosition {
  clientX: number;
  clientY: number;
}