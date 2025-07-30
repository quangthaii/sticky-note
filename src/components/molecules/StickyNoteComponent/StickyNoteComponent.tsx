import { Icon, TextArea } from '@/components/atoms';
import type { StickyNote } from '@/types';
import React, { useCallback, useRef } from 'react';
import {
  deleteButtonStyles,
  resizeHandleStyles,
  stickyNoteStyles,
} from './StickyNoteComponent.styles';

interface StickyNoteComponentProps {
  note: StickyNote;
  isActive: boolean;
  onUpdate: (updates: Partial<StickyNote>) => void;
  onDelete: () => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onBringToFront: () => void;
  onStartResize: (e: React.MouseEvent) => void;
}

const StickyNoteComponent: React.FC<StickyNoteComponentProps> = ({
  note,
  isActive,
  onUpdate,
  onDelete,
  onStartDrag,
  onBringToFront,
  onStartResize,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isEditing = useRef<boolean>(false);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdate({ text: e.target.value });
    },
    [onUpdate]
  );

  const handleTextAreaFocus = useCallback(() => {
    isEditing.current = true;

    onBringToFront();
  }, [onBringToFront]);

  const handleTextAreaBlur = useCallback(() => {
    isEditing.current = false;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isEditing.current && e.target === textAreaRef.current) {
        textAreaRef.current.focus();
        return;
      }

      onBringToFront();
      onStartDrag(e);
    },
    [onStartDrag, onBringToFront]
  );

  const handleTextAreaMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isEditing.current) {
        isEditing.current = true;
        e.preventDefault();
        handleMouseDown(e);
      }
    },
    [handleMouseDown]
  );

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onStartResize(e);
    },
    [onStartResize]
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete();
    },
    [onDelete]
  );

  return (
    <div
      className={stickyNoteStyles({
        color: note.color,
        isActive,
      })}
      style={{
        left: note.position.x,
        top: note.position.y,
        width: note.dimensions.width,
        height: note.dimensions.height,
        zIndex: note.zIndex,
      }}
      onMouseDown={handleMouseDown}
      data-note-id={note.id}
    >
      <button
        className={deleteButtonStyles()}
        onClick={handleDeleteClick}
        title="Delete note"
      >
        <Icon name="close" size="sm" />
      </button>

      <TextArea
        ref={textAreaRef}
        variant="sticky"
        value={note.text}
        onChange={handleTextChange}
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        onMouseDown={handleTextAreaMouseDown}
        placeholder="Type your note here..."
        className="w-full h-full resize-none"
      />

      <div
        className={resizeHandleStyles()}
        onMouseDown={handleResizeMouseDown}
        title="Resize note"
      >
        <Icon name="resize" size="sm" className="text-gray-600" />
      </div>
    </div>
  );
};

export default React.memo(StickyNoteComponent);
