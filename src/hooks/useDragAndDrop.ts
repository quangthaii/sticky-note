import { useState, useCallback, useEffect } from 'react';
import type { Position, Dimensions } from '@/types';

interface UseDragAndDropReturn {
  isDragging: boolean;
  dragType: 'move' | 'resize' | null;
  handleMouseDown: (e: React.MouseEvent, type: 'move' | 'resize') => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
}

export const useDragAndDrop = (
  onDrag?: (position: Position) => void,
  onResize?: (dimensions: Dimensions) => void,
  onDragEnd?: () => void
): UseDragAndDropReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<'move' | 'resize' | null>(null);
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [startDimensions, setStartDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const [dragStartData, setDragStartData] = useState<{
    startPosition: Position;
    notePosition: Position;
  }>({ startPosition: { x: 0, y: 0 }, notePosition: { x: 0, y: 0 } });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: 'move' | 'resize') => {
      e.preventDefault();
      e.stopPropagation();

      const noteElement = e.currentTarget.closest(
        '[data-note-id]'
      ) as HTMLElement;
      if (!noteElement) return;

      setIsDragging(true);
      setDragType(type);
      setStartPosition({ x: e.clientX, y: e.clientY });

      if (type === 'move') {
        const currentLeft = parseFloat(noteElement.style.left) || 0;
        const currentTop = parseFloat(noteElement.style.top) || 0;

        setDragStartData({
          startPosition: { x: e.clientX, y: e.clientY },
          notePosition: { x: currentLeft, y: currentTop },
        });
      } else {
        const rect = noteElement.getBoundingClientRect();
        setStartDimensions({ width: rect.width, height: rect.height });
      }
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragType) return;

      if (dragType === 'move' && onDrag) {
        const deltaX = e.clientX - dragStartData.startPosition.x;
        const deltaY = e.clientY - dragStartData.startPosition.y;

        const newPosition = {
          x: dragStartData.notePosition.x + deltaX,
          y: dragStartData.notePosition.y + deltaY,
        };

        onDrag(newPosition);
      } else if (dragType === 'resize' && onResize) {
        const deltaX = e.clientX - startPosition.x;
        const deltaY = e.clientY - startPosition.y;

        const newDimensions = {
          width: Math.max(150, startDimensions.width + deltaX),
          height: Math.max(150, startDimensions.height + deltaY),
        };
        onResize(newDimensions);
      }
    },
    [
      isDragging,
      dragType,
      dragStartData,
      startPosition,
      startDimensions,
      onDrag,
      onResize,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragType(null);
      onDragEnd?.();
    }
  }, [isDragging, onDragEnd]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    dragType,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
