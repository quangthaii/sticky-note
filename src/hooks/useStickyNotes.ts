import { useState, useCallback, useEffect, useRef } from 'react';
import type { StickyNote, Position, Dimensions, DragState } from '@/types';
import { STICKY_NOTE_CONFIG } from '@/configs';
import {
  generateId,
  getCurrentTimestamp,
  constrainToScreen,
  debounce,
} from '@/utils/sticky-note.utils';

export const useStickyNotes = () => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragType: null,
    startPosition: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
  });
  const [trashZoneActive, setTrashZoneActive] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState<number>(
    STICKY_NOTE_CONFIG.Z_INDEX.BASE
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedSave = useCallback(() => {
    const saveToStorage = debounce(() => {
      localStorage.setItem(
        STICKY_NOTE_CONFIG.STORAGE_KEY,
        JSON.stringify(notes)
      );
    }, STICKY_NOTE_CONFIG.AUTO_SAVE_INTERVAL);
    saveToStorage();
  }, [notes]);

  const loadNotes = useCallback(async () => {
    try {
      const savedNotes = localStorage.getItem(STICKY_NOTE_CONFIG.STORAGE_KEY);
      if (savedNotes) {
        const parsedNotes: StickyNote[] = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        const maxZ = Math.max(
          ...parsedNotes.map((note) => note.zIndex),
          STICKY_NOTE_CONFIG.Z_INDEX.BASE
        );
        setMaxZIndex(maxZ);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  }, []);

  const saveNotes = useCallback(async () => {
    try {
      localStorage.setItem(
        STICKY_NOTE_CONFIG.STORAGE_KEY,
        JSON.stringify(notes)
      );
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  }, [notes]);

  const createNote = useCallback(
    (position: Position, color: StickyNote['color'] = 'YELLOW') => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      const screenWidth = containerRect?.width || window.innerWidth;
      const screenHeight = containerRect?.height || window.innerHeight;

      const dimensions: Dimensions = {
        width: STICKY_NOTE_CONFIG.DEFAULT_WIDTH,
        height: STICKY_NOTE_CONFIG.DEFAULT_HEIGHT,
      };

      const constrainedPosition = constrainToScreen(
        position,
        dimensions,
        screenWidth,
        screenHeight
      );

      const newNote: StickyNote = {
        id: generateId(),
        text: '',
        position: constrainedPosition,
        dimensions,
        color,
        zIndex: maxZIndex + 1,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };

      setNotes((prev) => [...prev, newNote]);
      setMaxZIndex((prev) => prev + 1);
      setActiveNoteId(newNote.id);
    },
    [maxZIndex]
  );

  const updateNote = useCallback((id: string, updates: Partial<StickyNote>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: getCurrentTimestamp() }
          : note
      )
    );
  }, []);

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      if (activeNoteId === id) {
        setActiveNoteId(null);
      }
    },
    [activeNoteId]
  );

  const moveNote = useCallback((id: string, position: Position) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const screenWidth = containerRect?.width || window.innerWidth;
    const screenHeight = containerRect?.height || window.innerHeight;

    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          const constrainedPosition = constrainToScreen(
            position,
            note.dimensions,
            screenWidth,
            screenHeight
          );
          return {
            ...note,
            position: constrainedPosition,
            updatedAt: getCurrentTimestamp(),
          };
        }
        return note;
      })
    );
  }, []);

  const resizeNote = useCallback((id: string, dimensions: Dimensions) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              dimensions: {
                width: Math.max(
                  STICKY_NOTE_CONFIG.MIN_WIDTH,
                  Math.min(STICKY_NOTE_CONFIG.MAX_WIDTH, dimensions.width)
                ),
                height: Math.max(
                  STICKY_NOTE_CONFIG.MIN_HEIGHT,
                  Math.min(STICKY_NOTE_CONFIG.MAX_HEIGHT, dimensions.height)
                ),
              },
              updatedAt: getCurrentTimestamp(),
            }
          : note
      )
    );
  }, []);

  const bringToFront = useCallback(
    (id: string) => {
      const newZIndex = maxZIndex + 1;
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? { ...note, zIndex: newZIndex, updatedAt: getCurrentTimestamp() }
            : note
        )
      );
      setMaxZIndex(newZIndex);
    },
    [maxZIndex]
  );

  const startDrag = useCallback(
    (
      id: string,
      type: DragState['dragType'],
      startPosition: Position,
      offset: Position
    ) => {
      setDragState({
        isDragging: true,
        dragType: type,
        startPosition,
        offset,
      });
      setActiveNoteId(id);
      bringToFront(id);
    },
    [bringToFront]
  );

  const endDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      dragType: null,
      startPosition: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
    });
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      debouncedSave();
    }
  }, [notes, debouncedSave]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes,
    activeNoteId,
    dragState,
    trashZoneActive,
    maxZIndex,
    containerRef,

    createNote,
    updateNote,
    deleteNote,
    setActiveNote: setActiveNoteId,
    moveNote,
    resizeNote,
    bringToFront,
    startDrag,
    endDrag,
    setTrashZoneActive,
    loadNotes,
    saveNotes,
  };
};
