import type { StickyNote, Position, Dimensions } from '@/types';

export const generateId = (): string => {
  return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

export const isWithinBounds = (
  position: Position,
  dimensions: Dimensions,
  screenWidth: number,
  screenHeight: number
): boolean => {
  return (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x + dimensions.width <= screenWidth &&
    position.y + dimensions.height <= screenHeight
  );
};

export const constrainToScreen = (
  position: Position,
  dimensions: Dimensions,
  screenWidth: number,
  screenHeight: number
): Position => {
  return {
    x: clamp(position.x, 0, screenWidth - dimensions.width),
    y: clamp(position.y, 0, screenHeight - dimensions.height),
  };
};

export const rectanglesIntersect = (
  rect1: { position: Position; dimensions: Dimensions },
  rect2: { position: Position; dimensions: Dimensions }
): boolean => {
  return (
    rect1.position.x < rect2.position.x + rect2.dimensions.width &&
    rect1.position.x + rect1.dimensions.width > rect2.position.x &&
    rect1.position.y < rect2.position.y + rect2.dimensions.height &&
    rect1.position.y + rect1.dimensions.height > rect2.position.y
  );
};

export const calculateDistance = (
  point1: Position,
  point2: Position
): number => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T => {
  let timeout: number;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  }) as T;
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

export const getRandomPosition = (
  dimensions: Dimensions,
  screenWidth: number,
  screenHeight: number,
  padding = 50
): Position => {
  return {
    x: Math.random() * (screenWidth - dimensions.width - padding * 2) + padding,
    y:
      Math.random() * (screenHeight - dimensions.height - padding * 2) +
      padding,
  };
};

export const validateStickyNote = (
  note: Partial<StickyNote>
): note is StickyNote => {
  return !!(
    note.id &&
    typeof note.text === 'string' &&
    note.position &&
    typeof note.position.x === 'number' &&
    typeof note.position.y === 'number' &&
    note.dimensions &&
    typeof note.dimensions.width === 'number' &&
    typeof note.dimensions.height === 'number' &&
    note.color &&
    typeof note.zIndex === 'number' &&
    note.createdAt &&
    note.updatedAt
  );
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
