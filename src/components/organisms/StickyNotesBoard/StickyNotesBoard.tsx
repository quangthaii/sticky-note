import React, { useCallback, useState } from 'react';
import {
  StickyNoteComponent,
  TrashZone,
  Toolbar,
} from '@/components/molecules';
import { useStickyNotesContext } from '@/contexts';
import { useDragAndDrop } from '@/hooks';
import { mockAPI } from '@/utils';
import {
  getRandomPosition,
  rectanglesIntersect,
} from '@/utils/sticky-note.utils';
import { STICKY_NOTE_CONFIG, type StickyNoteColor } from '@/configs';
import type { Position, Dimensions } from '@/types';
import {
  stickyNotesBoardStyles,
  loadingOverlayStyles,
  loadingSpinnerStyles,
  statusMessageStyles,
} from './StickyNotesBoard.styles';

type StatusMessage = {
  type: 'success' | 'error' | 'info';
  message: string;
};

const StickyNotesBoard: React.FC = () => {
  const {
    notes,
    activeNoteId,
    containerRef,
    createNote,
    updateNote,
    deleteNote,
    setActiveNote,
    moveNote,
    resizeNote,
    bringToFront,
    setTrashZoneActive,
    trashZoneActive,
    saveNotes,
  } = useStickyNotesContext();

  const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
    null
  );

  const showStatusMessage = useCallback(
    (type: StatusMessage['type'], message: string) => {
      setStatusMessage({ type, message });
      setTimeout(() => setStatusMessage(null), 3000);
    },
    []
  );

  const handleDeleteNote = useCallback(
    async (noteId: string) => {
      setIsLoading(true);
      try {
        const response = await mockAPI.deleteNote(noteId);
        if (response.success) {
          deleteNote(noteId);
          showStatusMessage('success', 'Note deleted successfully');
        } else {
          showStatusMessage('error', response.error || 'Failed to delete note');
        }
      } catch {
        showStatusMessage('error', 'Failed to delete note');
      } finally {
        setIsLoading(false);
      }
    },
    [deleteNote, showStatusMessage]
  );

  const { handleMouseDown } = useDragAndDrop(
    useCallback(
      (position: Position) => {
        if (draggedNoteId) {
          moveNote(draggedNoteId, position);

          // Check if note is over trash zone
          const trashZoneRect = {
            position: {
              x:
                window.innerWidth -
                STICKY_NOTE_CONFIG.TRASH_ZONE_POSITION.right -
                STICKY_NOTE_CONFIG.TRASH_ZONE_SIZE,
              y:
                window.innerHeight -
                STICKY_NOTE_CONFIG.TRASH_ZONE_POSITION.bottom -
                STICKY_NOTE_CONFIG.TRASH_ZONE_SIZE,
            },
            dimensions: {
              width: STICKY_NOTE_CONFIG.TRASH_ZONE_SIZE,
              height: STICKY_NOTE_CONFIG.TRASH_ZONE_SIZE,
            },
          };

          const noteRect = {
            position,
            dimensions: notes.find((n) => n.id === draggedNoteId)
              ?.dimensions || { width: 0, height: 0 },
          };

          const isOverTrash = rectanglesIntersect(noteRect, trashZoneRect);
          setTrashZoneActive(isOverTrash);
        }
      },
      [draggedNoteId, moveNote, notes, setTrashZoneActive]
    ),

    useCallback(
      (dimensions: Dimensions) => {
        if (draggedNoteId) {
          resizeNote(draggedNoteId, dimensions);
        }
      },
      [draggedNoteId, resizeNote]
    ),

    useCallback(() => {
      if (draggedNoteId && trashZoneActive) {
        handleDeleteNote(draggedNoteId);
      }

      setDraggedNoteId(null);
      setTrashZoneActive(false);
    }, [draggedNoteId, trashZoneActive, handleDeleteNote, setTrashZoneActive])
  );

  const handleNoteStartDrag = useCallback(
    (noteId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDraggedNoteId(noteId);
      bringToFront(noteId);
      handleMouseDown(e, 'move');
    },
    [bringToFront, handleMouseDown]
  );

  const handleNoteBringToFront = useCallback(
    (noteId: string) => () => {
      bringToFront(noteId);
      setActiveNote(noteId);
    },
    [bringToFront, setActiveNote]
  );

  const handleNoteStartResize = useCallback(
    (noteId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDraggedNoteId(noteId);
      handleMouseDown(e, 'resize');
    },
    [handleMouseDown]
  );

  const handleCreateNote = useCallback(
    async (color: StickyNoteColor = 'YELLOW') => {
      setIsLoading(true);
      showStatusMessage('info', 'Creating note...');

      try {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const dimensions = {
          width: STICKY_NOTE_CONFIG.DEFAULT_WIDTH,
          height: STICKY_NOTE_CONFIG.DEFAULT_HEIGHT,
        };

        const position = getRandomPosition(
          dimensions,
          containerRect.width,
          containerRect.height
        );

        const response = await mockAPI.createNote({
          id: '',
          text: '',
          position,
          color,
          dimensions,
          zIndex: Math.max(...notes.map((note) => note.zIndex), 0) + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        if (response.success && response.data) {
          createNote(response.data.position, response.data.color);
          showStatusMessage('success', 'Note created successfully!');
        } else {
          showStatusMessage('error', 'Failed to create note');
        }
      } catch {
        showStatusMessage('error', 'Failed to create note');
      } finally {
        setIsLoading(false);
      }
    },
    [createNote, notes, showStatusMessage, containerRef]
  );

  const handleSaveNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await mockAPI.saveNotes(notes);
      if (response.success) {
        await saveNotes();
        showStatusMessage('success', 'Notes saved successfully');
      } else {
        showStatusMessage('error', response.error || 'Failed to save notes');
      }
    } catch {
      showStatusMessage('error', 'Failed to save notes');
    } finally {
      setIsLoading(false);
    }
  }, [notes, saveNotes, showStatusMessage]);

  const handleLoadNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await mockAPI.loadNotes();
      if (response.success && response.data) {
        showStatusMessage('info', 'Notes loaded from server');
      } else {
        showStatusMessage('error', response.error || 'Failed to load notes');
      }
    } catch {
      showStatusMessage('error', 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  }, [showStatusMessage]);

  // Handle double-click to create note
  const handleBoardDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === containerRef.current) {
        handleCreateNote('YELLOW');
      }
    },
    [containerRef, handleCreateNote]
  );

  const handleTrashDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleTrashDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (draggedNoteId) {
        handleDeleteNote(draggedNoteId);
      }
    },
    [draggedNoteId, handleDeleteNote]
  );

  const handleTrashDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setTrashZoneActive(false);
    },
    [setTrashZoneActive]
  );

  return (
    <div className={stickyNotesBoardStyles()}>
      <Toolbar
        onCreateNote={handleCreateNote}
        onSaveNotes={handleSaveNotes}
        onLoadNotes={handleLoadNotes}
      />

      <div
        ref={containerRef}
        className="relative flex-1 bg-gradient-to-br from-blue-50 to-indigo-100"
        onDoubleClick={handleBoardDoubleClick}
      >
        {/* Render sticky notes */}
        {notes.map((note) => (
          <StickyNoteComponent
            note={note}
            key={note.id}
            isActive={note.id === activeNoteId}
            onUpdate={(updates) => updateNote(note.id, updates)}
            onDelete={() => handleDeleteNote(note.id)}
            onStartDrag={handleNoteStartDrag(note.id)}
            onBringToFront={handleNoteBringToFront(note.id)}
            onStartResize={handleNoteStartResize(note.id)}
          />
        ))}

        <TrashZone
          isActive={trashZoneActive}
          onDragOver={handleTrashDragOver}
          onDrop={handleTrashDrop}
          onDragLeave={handleTrashDragLeave}
        />

        {isLoading && (
          <div className={loadingOverlayStyles()}>
            <div className={loadingSpinnerStyles()} />
          </div>
        )}

        {statusMessage && (
          <div className={statusMessageStyles({ type: statusMessage.type })}>
            {statusMessage.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(StickyNotesBoard);
